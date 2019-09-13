from django.db import models
from assets import models as asset_models
from datetime import datetime, timedelta


class Transaction(models.Model):
    """A transaction model to contain the who and what and how much of a peer-to-peer energy transaction."""
    objects = models.Manager()

    # Transaction data
    transaction_id = models.AutoField(primary_key=True)
    asset_id = models.ForeignKey(asset_models.Asset, null=True, on_delete=models.PROTECT)
    transaction_time = models.DateTimeField(auto_now_add=True)
    energy_sent = models.FloatField("Total kW Sent")
    price_per_kwh = models.DecimalField(max_digits=8, decimal_places=2) # money
    purchased = models.BooleanField(default=False) # If purchased is false, then this asset sold the energy
    is_with_grid = models.BooleanField(default=False) # If from_grid is false, then the transaction involves the grid

    # to string function
    def __str__(self):
        if self.purchased:
            return "#%s Buyer: #%s , with grid: #%s" % (self.transaction_id, self.asset_id, self.is_with_grid)
        else:
            return "#%s Seller: #%s , with grid: #%s" % (self.transaction_id, self.asset_id, self.is_with_grid)