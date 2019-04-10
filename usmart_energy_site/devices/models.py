from django.db import models

# Create your models here.
class Device(models.Model):
    objects = models.Manager()

    # Device data
    device_id = models.AutoField()
    nickname = models.CharField("nickname", max_length=255)
    device_type = models.CharField("device_type", max_length=255)
    #Set the charge time to default to time of creation. 
    charge_deadline = models.TimeField("deadline", auto_now_add=True, blank=True)

    # set user_id as primary key
    device_id.primary_key = True

    # to string function
    def __str__(self):
        return "%s %s" % (self.device_type, self.nickname)
