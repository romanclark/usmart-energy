"""The matching algorithm"""
import marketplace_service.postgres_wrapper as db
from transactions.models import Transaction
from queue import PriorityQueue
from marketplace_service.custom_definitions import ProducerStruct
from marketplace_service.custom_definitions import ConsumerStruct
import datetime


# This function gets the active producers, who are actively producing energy.
# Returns a priority queue ordered by the amount of energy they have available (most is priority)
def get_producers_as_queue():
    active_producers = db.get_active_producers().order_by('-flexible', '-energy')
    producers_who_have_energy = PriorityQueue()

    for prods in active_producers:
        temp_producer = ProducerStruct(prods.asset_id, prods.energy, prods.flexible)
        if temp_producer.energy > 0:
            producers_who_have_energy.put(temp_producer)

    return producers_who_have_energy


# This function gets the active consumers, who are actively consuming energy.
# Returns a priority queue ordered by their deadline
def get_consumers_as_queue(market_period):
    # https://docs.djangoproject.com/en/2.2/topics/db/queries/#retrieving-objects
    active_consumers = db.get_active_consumers().order_by('-market_deadline')
    consumers_who_need_energy = PriorityQueue()

    # Setting market deadline we would do math to is they are not flexible
    for cons in active_consumers:
        if cons.flexible:
            cons.market_deadline = market_period
        # capacity - energy is their demand (alpha version)
        temp_consumer = ConsumerStruct(cons.asset_id, (cons.capacity - cons.energy), cons.energy, cons.market_deadline)
        # dependent on energy never being > than capacity

        if temp_consumer.demand > 0:
            consumers_who_need_energy.put(temp_consumer)

    return consumers_who_need_energy


# This function expects a consumer that is inflexible and has to buy from the grid.
def buy_from_grid(consumer, market_price):

    bought_energy = consumer.demand

    # Since we satisfied their demand, we can add their original demand to their current_energy
    consumer.energy = consumer.demand + consumer.energy

    # Record the transaction
    transaction = Transaction(
        asset_id=db.get_asset_instance(consumer.asset_id),
        energy_sent=bought_energy,
        price_per_kwh=market_price,
        purchased=True,
        is_with_grid=True,
    )

    transaction.save()
    db.update_consumer_energy(consumer.asset_id, consumer.energy)


# This function expects a inflexible producer to be passed in. It will perform the transaction
def sell_inflexible_to_grid(producer, market_price):

    bought_energy = producer.energy
    producer.energy = 0

    # Record the transaction
    transaction = Transaction(
        asset_id=db.get_asset_instance(producer.asset_id),
        energy_sent=bought_energy,
        price_per_kwh=market_price,
        purchased=False,
        is_with_grid=True,
    )
    transaction.save()
    db.update_producer_energy(producer.asset_id, producer.energy)


def immediate_consumers_remain(consumers, market_period):
    first_consumer = consumers.get()

    # If the first consumer in the queue is not flexible, then its an immediate consumer
    if first_consumer.flexible is False:
        return True
    else:
        # If the market_deadline is less than or equal to the market period,
        # then that means they have to charge this period
        if first_consumer.market_deadline <= market_period:
            return True
        else:  # We know everyone else is a flexible asset with deadlines past market period
            return False


def immediate_producers_remain(producers):
    first_producer = producers.get()

    # If the first producer in the queue is not flexible, then its an immediate producer
    if first_producer.flexible is False:
        return True
    else:
        # We know everyone else is a flexible producer with storage
        return False


# This is the naive implementation of the matching logic.
# Matches consumers up with corresponding producers
# The producers and consumers are priority queues. They are not django objects.
# The consumers will be ordered by deadline, but not every deadline is within the current market period
def simple_matchup(market_price, market_period, consumers, producers):

    while not consumers.empty() and not producers.empty():

        current_producer = producers.get()

        while current_producer.energy > 0:

            # We will be distributing energy from the current_producer to the consumers until this producer
            # runs out of energy. So we need to ensure there are still consumers.
            # if we run out of consumers, then the producers can sell the rest to the grid
            if consumers.empty():
                producers.put(current_producer)
                # Break out of this loop and sell the inflexible producers' energy to the grid
                break

            current_consumer = consumers.get()

            # the consumer can take more than what the producer has, so give them all the producer's energy
            if current_consumer.market_period_demand > current_producer.energy:
                current_consumer.market_period_demand -= current_producer.energy

                # update the consumer energy
                current_consumer.energy = current_consumer.energy + current_producer.energy

                sent_energy = current_producer.energy

                # The current_producer's energy is now zero
                current_producer.energy = 0

                # The consumer can still receive energy, so put them back on the queue
                consumers.put(current_consumer)

            else:  # The consumer did not need all of the producer's energy, so give only what the consumer needed
                current_producer.energy -= current_consumer.market_period_demand
                sent_energy = current_consumer.market_period_demand

                # The consumer tuple is {asset_id, demand, market_demand, deadline}
                # Since we satisfied their demand, we can add their original demand to their current_energy
                current_consumer.energy = current_consumer.market_period_demand + current_consumer.energy
                current_consumer.market_period_demand = 0

            # Record the transaction of the consumer purchasing from the "aggregator"
            transaction = Transaction(
                asset_id=db.get_asset_instance(current_consumer.asset_id),
                energy_sent=sent_energy,
                price_per_kwh=market_price,
                purchased=True,
                is_with_grid=False
            )
            transaction.save()

            # Record the transaction of the producer selling to the "aggregator"
            transaction = Transaction(
                asset_id=db.get_asset_instance(current_producer.asset_id),
                energy_sent=sent_energy,
                price_per_kwh=market_price,
                purchased=False,
                is_with_grid=False
            )

            transaction.save()
            db.update_consumer_energy(current_consumer.asset_id, current_consumer.energy)
            db.update_producer_energy(current_producer.asset_id, current_producer.energy)

    while immediate_consumers_remain(consumers, market_period):
        buy_from_grid(consumers, market_price, market_period)

    while immediate_producers_remain(producers):
        current_producer = producers.get()
        sell_inflexible_to_grid(current_producer, market_price)


# The demand delta is the difference between the fore-casted demand and the actual demand
def do_naive_matching(market_period=datetime.Now, market_price=.15):  # market period is the time
    print("\tMarket price: %d", market_price)

    consumers = get_consumers_as_queue()
    producers = get_producers_as_queue()

    # print("\tActive consumers: ", consumers)
    # print("\tActive producers: ", producers)

    simple_matchup(market_price, market_period, consumers, producers)

    print("Done matching up")

