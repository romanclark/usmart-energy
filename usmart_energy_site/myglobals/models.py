from django.db import models

# Create your models here.
class Myglobals(models.Model):
    key = models.CharField(max_length=32, unique=True)
    date_value = models.DateTimeField(null=True)
    float_value = models.FloatField(null=True)