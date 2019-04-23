from django.db import models
from assets import models as asset_models
from datetime import datetime, timedelta

class Transaction(models.Model):
    """A transaction model to cointain the who and what and how much of a peer-to-peer energy transaction."""
    objects = models.Manager()

    # Transaction data
    transaction_id = models.AutoField(primary_key=True)
    buyer_asset_id = models.ForeignKey(asset_models.Asset, related_name="buyer", on_delete=models.PROTECT)
    seller_asset_id = models.ForeignKey(asset_models.Asset, related_name="seller", on_delete=models.PROTECT)
    transaction_time = models.DateTimeField(auto_now_add=True)
    energy_sent = models.FloatField("Total kW Sent")
    price_per_kwh = models.DecimalField(max_digits=8, decimal_places=2) # money

    # to string function
    def __str__(self):
        return "#%s Buyer: %s Seller: %s" % (self.transaction_id, self.buyer_asset_id, self.seller_asset_id)    