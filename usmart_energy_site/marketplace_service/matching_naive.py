"""The matching algorithm"""
import marketplace_service.postgres_wrapper as db
from transactions.models import Transaction
from queue import PriorityQueue
from marketplace_service.custom_definitions import ProducerStruct
from marketplace_service.custom_definitions import ConsumerStruct
from datetime import datetime, timedelta
import random



# This function gets the active producers, who are actively producing energy.
# Returns a priority queue ordered by the amount of energy they have available (most is priority)
def get_producers_as_queue():
    active_producers = db.get_active_producers().order_by('-flexible')
    producers_who_have_energy = PriorityQueue()

    for prods in active_producers:
        temp_producer = ProducerStruct(prods.asset_id, prods.energy, prods.flexible)
        if temp_producer.energy > 0:
            print (temp_producer.asset_id)
            producers_who_have_energy.put(temp_producer)

    return producers_who_have_energy


# This function gets the active consumers, who are actively consuming energy.
# Returns a priority queue ordered by their deadline
def get_consumers_as_queue(market_period):
    # https://docs.djangoproject.com/en/2.2/topics/db/queries/#retrieving-objects
    active_consumers = db.get_available_consumers().order_by('-user_deadline')
    consumers_who_need_energy = PriorityQueue()

    # Setting market deadline we would do math to is they are not flexible
    for cons in active_consumers:
        # In an hour long market period (alpha), the power would be their highest possible demand for a period
        total_demand = cons.capacity - cons.energy
        market_period_demand = min(total_demand, cons.power)

        if not cons.flexible:
            market_deadline = market_period
        else:
            # market deadline is dependent on their demand, charge rate (power), and deadline.
            market_deadline = cons.user_deadline - timedelta(hours=(total_demand / cons.power))

        temp_consumer = ConsumerStruct(cons.asset_id, market_period_demand, cons.energy, market_deadline)

        # dependent on energy never being > than capacity
        if temp_consumer.market_period_demand > 0:
            consumers_who_need_energy.put(temp_consumer)

    return consumers_who_need_energy


# This function expects a consumer that is inflexible and has to buy from the grid.
def buy_from_grid(consumer, market_price, market_period):
    bought_energy = consumer.market_period_demand

    # Since we satisfied their demand, we can add their original demand to their current_energy
    consumer.energy = consumer.market_period_demand + consumer.energy

    # Record the transaction
    transaction = Transaction(
        asset_id=db.get_asset_instance(consumer.asset_id),
        energy_sent=bought_energy,
        price_per_kwh=market_price,
        purchased=True,
        is_with_grid=True,
        transaction_time=market_period,
    )

    transaction.save()
    db.update_consumer_energy(consumer.asset_id, consumer.energy)


# This function expects a inflexible producer to be passed in. It will perform the transaction
def sell_inflexible_to_grid(producer, market_price, market_period):
    bought_energy = producer.energy
    producer.energy = 0

    # Record the transaction
    transaction = Transaction(
        asset_id=db.get_asset_instance(producer.asset_id),
        energy_sent=bought_energy,
        price_per_kwh=market_price,
        purchased=False,
        is_with_grid=True,
        transaction_time=market_period,
    )
    transaction.save()
    db.update_producer_energy(producer.asset_id, producer.energy)


def immediate_consumers_remain(consumers, market_period):
    if consumers.empty():
        return False

    # Peeks at the first consumer
    first_consumer = consumers.queue[0]

    # If the market_deadline is less than or equal to the market period,
    # then that means they have to charge this period
    if first_consumer.market_deadline <= market_period:
        return True
    else:  # We know everyone else is a flexible asset with deadlines past market period
        return False


def immediate_producers_remain(producers):
    if producers.empty():
        return False

    # Peeks at the first consumer
    first_producer = producers.queue[0]

    # If the first producer in the queue is not flexible, then its an immediate producer
    if first_producer.flexible is False:
        return True
    else:
        # We know everyone else is a flexible producer with storage
        return False


# This is the naive implementation of the matching logic.
# Matches consumers up with corresponding producers
# The producers and consumers are priority queues. They are not django objects
# The consumers will be ordered by deadline, but not every deadline is within the current market period
def simple_matchup(market_price, market_period, consumers, producers):
    while not consumers.empty() and not producers.empty():
        current_producer = producers.get()
        print(current_producer.asset_id)

        while current_producer.energy > 0:

            # We will be distributing energy from the current_producer to the consumers until this producer
            # runs out of energy. So we need to ensure there are still consumers.
            # if we run out of consumers, then the producers can sell the rest to the grid
            if consumers.empty():
                producers.put(current_producer)
                # Break out of this loop and sell the inflexible producers' energy to the grid
                break

            current_consumer = consumers.get()

            # the consumer can take more than what the producer has, so give them all the producer's energy.
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
                is_with_grid=False,
                # Transaction Time set to market period instead of now for simulation of time
                transaction_time=market_period
            )
            transaction.save()

            # Record the transaction of the producer selling to the "aggregator" 
            transaction = Transaction(
                asset_id=db.get_asset_instance(current_producer.asset_id),
                energy_sent=sent_energy,
                price_per_kwh=market_price,
                purchased=False,
                is_with_grid=False,
                # Transaction Time set to market period instead of now for simuation of time
                transaction_time=market_period
            )

            transaction.save()
            db.update_consumer_energy(current_consumer.asset_id, current_consumer.energy)
            db.update_producer_energy(current_producer.asset_id, current_producer.energy)

    while immediate_consumers_remain(consumers, market_period):
        current_consumer = consumers.get()
        buy_from_grid(current_consumer, market_price, market_period)

    while immediate_producers_remain(producers):
        current_producer = producers.get()
        sell_inflexible_to_grid(current_producer, market_price, market_period)
    

def do_naive_matching(market_period, market_price=.15):  # market period is the time
    print("\tMarket price: %", market_price)

    consumers = get_consumers_as_queue(market_period)
    producers = get_producers_as_queue()

    # print("\tActive consumers: ", consumers
    # print("\tActive producers: ", producers)

    simple_matchup(market_price, market_period, consumers, producers)
    simulate_agents(market_period)

    print("Completed Market Period")

# Make random changes to agents in system to simulate user change
def simulate_agents(market_period):
    print("Market period: ", market_period)

    # If daytime, add 2kwh of energy to all panels
    panels = db.get_active_sim_producers()
    if (market_period.hour >= 10 and market_period.hour <= 17):
        for panel in panels:
            db.update_producer_energy(panel.asset_id, min(panel.energy+2, panel.capacity))

    # Unplug simulated consumers once their deadline has passed
    for plugged_sim_consumer in db.get_available_sim_consumers():
        # If this was a sim agent who plugged in for only hour, set them back to unplugged regardless of deadline
        if plugged_sim_consumer.flexible == False:
            plugged_sim_consumer.available = False

        # Unplug
        if plugged_sim_consumer.user_deadline < market_period:
            plugged_sim_consumer.flexible = False 
            plugged_sim_consumer.available = False
            plugged_sim_consumer.user_deadline = plugged_sim_consumer.user_deadline + timedelta(hours=24)
        plugged_sim_consumer.save()

    # Update deadlines of remaining consumers whose deadlines have passed (to tomorrow at same time)
    for plugged_consumer in db.get_available_nonsim_consumers():
        if plugged_consumer.user_deadline < market_period:
            plugged_consumer.user_deadline = plugged_consumer.user_deadline + timedelta(hours=24)
            plugged_consumer.save()      
        

        
    for unplugged_consumer in db.get_unavailable_sim_consumers():
        # Unplugged vehicles have a 10% chance of plugging in while inflexible
        if random.random() < .1:
            unplugged_consumer.available = True
            unplugged_consumer.save()

        # During night, unplugged cars have a 10% chance of expending 10kwh. 40% during day.
        if market_period.hour > 8 and market_period.hour < 18:
            if random.random() < .4:
                db.update_consumer_energy(unplugged_consumer.asset_id, (unplugged_consumer.energy-10))
        else:
            if random.random() < .1:
                db.update_consumer_energy(unplugged_consumer.asset_id, (unplugged_consumer.energy-10))
    

    # Arrival times are dependent on user_profile (think about doing hard set energy levels here)
    
    # Home EVs plug in from 7pm to 7am
    for unplugged_home_ev in db.get_unplugged_home_evs():
        arrival_time = unplugged_home_ev.user_deadline - timedelta(hours=12)
        if (market_period > arrival_time):
            unplugged_home_ev.available = True
            unplugged_home_ev.flexible = True
            unplugged_home_ev.save()

    # Public EVs plug in from 11am to 2pm
    for unplugged_public_ev in db.get_unplugged_public_evs():
        arrival_time = unplugged_public_ev.user_deadline - timedelta(hours=3)
        if (market_period > arrival_time):
            unplugged_public_ev.available = True
            unplugged_public_ev.flexible = True
            unplugged_public_ev.save()
    
    # Work EVs plug in from 9am to 6pm
    for unplugged_work_ev in db.get_unplugged_work_evs():
        arrival_time = unplugged_work_ev.user_deadline - timedelta(hours=9)
        if (market_period > arrival_time):
            unplugged_work_ev.available = True
            unplugged_work_ev.flexible = True
            unplugged_work_ev.save()
    


def reset_simulated_marketplace(market_period):
    db.reset_simulated_agents(market_period)
    db.delete_future_transactions(market_period)
