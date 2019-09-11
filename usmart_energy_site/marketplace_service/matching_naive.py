"""The matching algorithm"""
import marketplace_service.postgres_wrapper as db
from transactions.models import Transaction
from marketplace_service.custom_definitions import CustomPriorityQueue as custom_pq
from marketplace_service.custom_definitions import ProducerStruct
from marketplace_service.custom_definitions import ConsumerStruct


# This function gets the active producers, who are actively producing energy.
# Returns a priority queue ordered by the amount of energy they have available (most is priority)
def get_producers_as_queue():
    active_producers = db.get_active_producers().order_by('-energy')
    producers_who_have_energy = custom_pq()

    for prods in active_producers:
        temp_producer = ProducerStruct(prods.asset_id, prods.energy)
        if temp_producer.energy > 0:
            producers_who_have_energy.put(temp_producer)

    return producers_who_have_energy


# This function gets the active consumers, who are actively consuming energy.
# Returns a priority queue ordered by their demand of energy (highest is priority)
def get_consumers_as_queue():
    # https://docs.djangoproject.com/en/2.2/topics/db/queries/#retrieving-objects
    active_consumers = db.get_active_consumers().order_by('-energy')
    consumers_who_need_energy = custom_pq()

    for cons in active_consumers:
        # capacity - energy is their demand (alpha version)
        temp_consumer = ConsumerStruct(cons.asset_id, (cons.capacity - cons.energy), cons.energy)
        # dependent on energy never being > than capacity

        if temp_consumer.demand > 0:
            consumers_who_need_energy.put(temp_consumer)

    return consumers_who_need_energy


def buy_from_grid(consumers, market_price):
    grid = db.get_grid()
    while consumers.empty() is False:
        current_consumer = consumers.get()
        bought_energy = current_consumer.demand

        # Since we satisfied their demand, we can add their original demand to their current_energy
        current_consumer.energy = current_consumer.demand + current_consumer.energy

        # Record the transaction
        transaction = Transaction(
            buyer_asset_id=db.get_user(current_consumer.asset_id),
            seller_asset_id=grid,
            energy_sent=bought_energy,
            price_per_kwh=market_price
        )

        transaction.save()
        db.update_consumer_energy(current_consumer.asset_id, current_consumer.energy)


def sell_to_grid(producers, market_price):
    grid = db.get_grid()
    while producers.empty() is False:
        current_producer = producers.get()
        bought_energy = current_producer.energy
        current_producer.energy = 0

        # Record the transaction
        transaction = Transaction(
            buyer_asset_id=grid,
            seller_asset_id=db.get_asset_instance(current_producer.asset_id),
            energy_sent=bought_energy,
            price_per_kwh=market_price
        )

        transaction.save()
        db.update_producer_energy(current_producer.asset_id, current_producer.energy)


# This is the naive implementation of the matching logic.
# Matches consumers up with corresponding producers
# The producers and consumers are priority queues. They are not django objects.
def simple_matchup(market_price, consumers, producers):

    while consumers.empty() is False:
        # If we run out of producers, then the remaining consumers need to buy from grid
        if producers.empty():
            buy_from_grid(consumers, market_price)
            return

        current_producer = producers.get()

        while current_producer.energy > 0:

            # if we run out of consumers, then the producers can sell the rest to the grid
            if consumers.empty():
                producers.put(current_producer)
                sell_to_grid(producers, market_price)
                return

            current_consumer = consumers.get()

            # the consumer can take more than what the producer has, so give them all the producer's energy
            if current_consumer.demand > current_producer.energy:
                current_consumer.demand -= current_producer.energy

                # update the consumer energy
                current_consumer.energy = current_consumer.energy + current_producer.energy

                sent_energy = current_producer.energy
                # The current_producer's energy is now zero
                current_producer.energy = 0

                # The consumer can still receive energy, so put them back on the queue
                consumers.put(current_consumer)

            else:  # The consumer did not need all of the producer's energy, so give only what the consumer needed
                current_producer.energy -= current_consumer.demand
                sent_energy = current_consumer.demand

                # The consumer tuple is {ID, demand, current_energy}
                # Since we satisfied their demand, we can add their original demand to their current_energy
                current_consumer.energy = current_consumer.demand + current_consumer.energy
                current_consumer.demand = 0

            # Record the transaction
            transaction = Transaction(
                buyer_asset_id=db.get_asset_instance(current_consumer.asset_id),
                seller_asset_id=db.get_asset_instance(current_producer.asset_id),
                energy_sent=sent_energy,
                price_per_kwh=market_price
            )

            transaction.save()
            db.update_consumer_energy(current_consumer.asset_id, current_consumer.energy)
            db.update_producer_energy(current_producer.asset_id, current_producer.energy)

    if producers.empty() is False:
        sell_to_grid(producers, market_price)


# The demand delta is the difference between the fore-casted demand and the actual demand
def do_naive_matching(demand_delta=10, market_price=.15):

    print("\tDemand delta: %d", demand_delta)
    print("\tMarket price: %d", market_price)

    consumers = get_consumers_as_queue()
    producers = get_producers_as_queue()

    # print("\tActive consumers: ", consumers)
    # print("\tActive producers: ", producers)

    simple_matchup(market_price, consumers, producers)

    print("Done matching up")


# Parker's notes
# Naive matching algorithm: 
# - Every hour query consumers and their energy needs/ preferences
# - sort into a queue based of simple version of consumerneeds (energy needed only?)
# - have a db of power providers with the index on the energy they can provide
# - If there is a provider that matches the energy of a consumer then make that transaction
# - If not, then just make them receive from the power company 
# - Need to pull from the DB to populate a user object to get their demands to be compared to the forecast
# - At the end of the market period, if the forecast does not match the demand, then the market place is triggered. 
# - In the background, every 10 mins (or whatever time) we are communicating with all the user's assets, updating the db to their current demands/energy they currently have
