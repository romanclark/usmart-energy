from django.db import models
from decimal import Decimal

class Asset(models.Model):
    """An Asset model to be tied to a user. Assets can be solar panels, wind turbines, etc. and include selling info."""
    objects = models.Manager()

    # Asset data
    asset_id = models.AutoField()
    nickname = models.CharField("nickname", max_length=255)
    asset_type = models.CharField("asset_type", max_length=255)
    # max_digits is total number of digits, decimal_places is digits to the right of the .
    # ex: a max_digits of 4 allows up to 99.99
    percent_of_mrkt_price = models.DecimalField(max_digits=3, decimal_places=2, default=Decimal('0.50'))
    owner_id = models.ForeignKey("users.User", on_delete=models.CASCADE)

    # set user_id as primary key
    asset_id.primary_key = True

    # to string function
    def __str__(self):
        return "%s %s" % (self.asset_type, self.nickname)
