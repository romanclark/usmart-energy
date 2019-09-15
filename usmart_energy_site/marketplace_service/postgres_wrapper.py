from assets.models import Asset
from users.models import User

def get_active_producers():
    """for the matching algorithm"""
    # TODO include an OR in asset_class for "Battery" and "Wind Turbine" so it grabs all of them?
    producer_types = ["Solar Panel", "Battery", "Wind Turbine"]
    return Asset.objects.filter(asset_class="Solar Panel", available=True, inactive=False)


def get_active_consumers():
    """for the matching algorithm"""
    return Asset.objects.filter(asset_class="Electric Vehicle", available=True, inactive=False)

def get_unavailable_consumers():
    return Asset.objects.filter(asset_class="Electric Vehicle", available=False, flexible=False, inactive=False)

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


def get_grid():
    grid = User.objects.get(first_name="System", last_name="Distributor")
    return Asset.objects.get(owner=grid)
