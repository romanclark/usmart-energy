from django.db import models

# Create your models here.
class Asset(models.Model):
    objects = models.Manager()

    # Asset data
    asset_id = models.AutoField()
    nickname = models.CharField("nickname", max_length=255)
    asset_type = models.CharField("asset_type", max_length=255)

    # set user_id as primary key
    asset_id.primary_key = True

    # to string function
    def __str__(self):
        return "%s %s" % (self.asset_type, self.nickname)
