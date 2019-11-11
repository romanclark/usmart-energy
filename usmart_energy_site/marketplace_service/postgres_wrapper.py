from assets.models import Asset
from users.models import User
from transactions.models import Transaction
from myglobals.models import Queue


def get_active_producers():
    """for the matching algorithm"""
    # TODO include an OR in asset_class for "Battery" and "Wind Turbine" so it grabs all of them?
    producer_types = ["Solar Panel", "Battery", "Wind Turbine"]
    return Asset.objects.filter(asset_class="Solar Panel", available=True, inactive=False)

def get_active_sim_producers():
    """for agent simulation"""
    return Asset.objects.filter(asset_class="Solar Panel", available=True, inactive=False, nickname__startswith='SIM_')


def get_available_consumers():
    """for the matching algorithm"""
    return Asset.objects.filter(asset_class="Electric Vehicle", available=True, inactive=False)

def get_available_sim_consumers():
    """for agent simulation"""
    return Asset.objects.filter(asset_class="Electric Vehicle", available=True, inactive=False, nickname__startswith='SIM_')

def get_available_nonsim_consumers():
    """for agent simulation"""
    return Asset.objects.filter(asset_class="Electric Vehicle", available=True, inactive=False).exclude(nickname__startswith='SIM_')

def get_active_consumers():
    """For resetting marketplace"""
    return Asset.objects.filter(asset_class="Electric Vehicle", inactive=False)

def get_unavailable_consumers():
    return Asset.objects.filter(asset_class="Electric Vehicle", available=False, flexible=False, inactive=False)

def get_unavailable_sim_consumers():
    return Asset.objects.filter(asset_class="Electric Vehicle", available=False, flexible=False, inactive=False, nickname__startswith='SIM_')

def update_consumer_energy(pk, energy):
    """Updates the consumer energy value for the matching PK"""
    cons = Asset.objects.get(asset_id=pk)
    cons.energy = energy
    cons.save()
    

def update_producer_energy(pk, energy):
    """Updates the producer energy value for the matching PK"""
    prod = Asset.objects.get(asset_id=pk)
    prod.energy = energy
    prod.save()


def get_asset_instance(pk):
    """Gets the user for the matching PK"""
    return Asset.objects.get(asset_id=pk)


# unused? Grid is not agent in matching algorithm
def get_grid():
    grid = User.objects.get(first_name="System", last_name="Distributor")
    return Asset.objects.get(owner=grid)


def delete_future_transactions(curr_time):
    Transaction.objects.filter(transaction_time__gte=curr_time).delete()


def get_unplugged_public_evs():
    return Asset.objects.filter(asset_class="Electric Vehicle", inactive=False, available=False, nickname__startswith='SIM_PUBLIC')


def get_unplugged_home_evs():
    return Asset.objects.filter(asset_class="Electric Vehicle", inactive=False, available=False, nickname__startswith='SIM_HOME')


def get_unplugged_work_evs():
    return Asset.objects.filter(asset_class="Electric Vehicle", inactive=False, available=False, nickname__startswith='SIM_WORK')


def reset_simulated_agents(market_period):
    # Reset deadlines to today, make all evs unplugged and half full of energy (TODO change amounts)
    today = market_period.day

    # Start home EVs with 60 energy, plugged in. Deadline of 8am, they'll plug in 6pm most nights.
    home_evs = Asset.objects.filter(asset_class="Electric Vehicle", inactive=False, nickname__startswith='SIM_HOME')
    for home_ev in home_evs:
        home_ev.energy = 60
        home_ev.flexible = True
        home_ev.available = True
        home_ev.user_deadline = home_ev.user_deadline.replace(day=today)
        home_ev.save()

    # Start public evs with 90 energy, unplugged. Deadline of 2pm, they'll plug in at 11am.
    public_evs = Asset.objects.filter(asset_class="Electric Vehicle", inactive=False, nickname__startswith='SIM_PUBLIC')
    for public_ev in public_evs:
        public_ev.energy = 90
        public_ev.flexible = False
        public_ev.available = False
        public_ev.user_deadline = public_ev.user_deadline.replace(day=today)
        public_ev.save()

    # Start work evs with 60 energy, unplugged. Deadline of 6 pm, they'll plug in at 9am.
    work_evs = Asset.objects.filter(asset_class="Electric Vehicle", inactive=False, nickname__startswith='SIM_WORK')
    for work_ev in work_evs:
        work_ev.energy = 60
        work_ev.flexible = False
        work_ev.available = False
        work_ev.user_deadline = work_ev.user_deadline.replace(day=today)
        work_ev.save()

    # Set all panels to have 0 energy at midnight (no daylight)
    sim_panels = Asset.objects.filter(asset_class="Solar Panel", inactive=False, nickname__startswith='SIM_')  
    for sim_panel in sim_panels:
        sim_panel.energy = 0
        sim_panel.save()

def update_queue(time, energy):
    queue = Queue(
                market_period=time,
                queued_energy=energy
            )
    queue.save()

def delete_future_queue(curr_time):
    Queue.objects.filter(market_period__gte=curr_time).delete()