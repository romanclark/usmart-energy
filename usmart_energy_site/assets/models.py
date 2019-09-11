from django.db import models
import uuid
from decimal import Decimal
from users import models as user_model

class Asset(models.Model):
    """An Asset model belongs to a user. Assets can be solar panels, solar panel with storage, or an EV. and include selling info via perferences."""
    objects = models.Manager()

    # Asset data
    asset_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) # universal unique identifier
    owner = models.ForeignKey(user_model.User, null=True, on_delete=models.PROTECT) # asset owner FK
    nickname = models.CharField(max_length=255) # name of asset
    asset_class = models.CharField(null=True, max_length=255) # eg. EV, solar panel, solar panel with storage
    power = models.FloatField(default=0) # rate of consumption/production
    energy = models.FloatField(default=0) # amount of energy I have to use
    capacity = models.FloatField(default=0) # total capacity of asset
    # EV_make = models.CharField(default="")
    # EV_model = models.CharField(default="") TODO for beta?
    flexible = models.BooleanField(default=True) # if load can be shifted in time
    # preferences = models.CharField(null=True, max_length=255) # preferences like deadline, selling price, amount willing to sell from battery
    available = models.BooleanField(default=True) # if asset on/off (eg. if car is plugged in, if a solar panel can give energy at that moment)
    inactive = models.BooleanField(default=False) # in place of delete
    mileage_needed = models.IntegerField(default=0)
    user_deadline = models.DateTimeField(null=True)
    market_deadline = models.DateTimeField(null=True)

    # to string function
    def __str__(self):
        # return "%s %s %s" % (self.asset_id, self.nickname, self.asset_class)
        return "%s %s" % (self.nickname, self.energy)
