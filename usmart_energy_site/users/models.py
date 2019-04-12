from django.db import models
from decimal import Decimal

# run "python manage.py makemigrations" and "python manage.py migrate" if you change any models

class User(models.Model):
    """A User model to describe all info necessary for a person using the service."""
    objects = models.Manager()

    # user data
    user_id = models.AutoField()
    first_name = models.CharField("First name", max_length=255)
    last_name = models.CharField("Last name", max_length=255)
    email = models.EmailField()
    street =  models.TextField(default="201 Presidents Cir")
    city =  models.TextField(default="Salt Lake City")
    state =  models.TextField(default="Utah")
    zipcode =  models.TextField(default="84112")
    latitude =  models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitute =  models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    # a user's devices and assets are connected via foreign keys
    # devices has a FK to user_id
    # assets has a FK to user_id

    # set user_id as primary key
    user_id.primary_key = True

    # to string function
    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)


# # MODEL CODE FOR TRANSACTION

# from django.db import models
# from datetime import datetime, timedelta

# class Transaction(models.Model):
#     objects = models.Manager() # idk why we need this

#     # transaction data
#     trans_id = models.AutoField()
#     device_id = models.ForeignKey("devices.Device", on_delete=models.CASCADE)
#     asset_id = models.ForeignKey("assets.Asset")
#     trans_time = models.models.TimeField("Transaction Time", default=datetime.now())
#     energy_sent = models.FloatField("Total kW Sent")
#     price_per_kwh = models.DecimalField(max_digits=8, decimal_places=2)

#     # set trans_id as primary key
#     trans_id.primary_key = True

#     # to string function
#     def __str__(self):
#         return "%s %s %s" % (self.trans_id, self.device_id, self.asset_id)