from django.db import models
from datetime import datetime, timedelta

class Device(models.Model):
    """A Device model to be tied to a user, Eg. an electric car charger."""
    objects = models.Manager()

    # Device data
    device_id = models.AutoField()
    nickname = models.CharField("nickname", max_length=255)
    device_type = models.CharField("device_type", max_length=255)
    # Set the charge time to default to time of creation
    charge_deadline = models.TimeField("deadline", default=datetime.now()+timedelta(hours=8))
    ownder_id = models.ForeignKey("users.User", on_delete=models.CASCADE, default="1")

    # set user_id as primary key
    device_id.primary_key = True

    # to string function
    def __str__(self):
        return "%s %s" % (self.device_type, self.nickname)