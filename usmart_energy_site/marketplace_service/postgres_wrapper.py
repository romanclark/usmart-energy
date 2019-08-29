from assets.models import Asset

def get_active_producers():
    """for the matching algorithm"""
    # TODO include an OR in asset_class for "Battery" and "Wind Turbine" so it grabs all of them?
    producer_types = ["Solar Panel", "Battery", "Wind Turbine"]
    return Asset.objects.filter(asset_class="Solar Panel", available=True, inactive=False)


def get_active_consumers():
    """for the matching algorithm"""
    return Asset.objects.filter(asset_class="Electric Vehicle", available=True, inactive=False)


def update_consumer_energy(pk, energy):
    cons = Asset.objects.get(asset_id=pk)
    cons.energy = energy
    cons.save()


def update_producer_energy(pk, energy):
    prod = Asset.objects.get(asset_id=pk)
    prod.energy = energy
    prod.save()


def get_user(pk):
    return Asset.objects.get(asset_id=pk)
