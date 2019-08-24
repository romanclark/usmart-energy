"""The matching algorithm"""
from assets.models import Asset
from assets import views as assets_views
from queue import PriorityQueue
from marketplace_service.custom_priority_queue import CustomPriorityQueue as custom_pq


def get_producers():
    active_producers = assets_views.get_active_producers().order_by('-energy')

    producers_who_have_energy = PriorityQueue()

    for prods in active_producers:
        temp_producer = (prods.asset_id, prods.energy)
        if temp_producer[1] > 0:
            producers_who_have_energy.put(temp_producer)

    return producers_who_have_energy


def get_consumers():
    # https://docs.djangoproject.com/en/2.2/topics/db/queries/#retrieving-objects
    active_consumers = assets_views.get_active_consumers().order_by('-energy')
    consumers_who_need_energy = custom_pq()

    for cons in active_consumers:
        # capacity - energy is their demand (alpha version)
        temp_consumer = (cons.asset_id, (cons.capacity - cons.energy))
        # dependent on energy never being > than capacity

        if temp_consumer[1] > 0:
            consumers_who_need_energy.put(temp_consumer)

    return consumers_who_need_energy

# def simple_matchup(consumers, producers):


def do_naive_matching(demand_delta=10, market_price=.15):
    """Called from the Cal ISO parsing, A naive version of the matching algorithm"""

    print("\tDemand delta: %d", demand_delta)
    print("\tMarket price: %d", market_price)

    consumers = get_consumers()
    producers = get_producers()

    # print("\tActive consumers: ", consumers)
    # print("\tActive producers: ", producers)

    # TODO implement the matching algorithm

    # Now we have the desired energy for available energy, lets match them up


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
