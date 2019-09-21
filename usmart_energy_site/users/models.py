from django.db import models
from decimal import Decimal


# run "python manage.py makemigrations" and "python manage.py migrate" if you change any models

class User(models.Model):
    """A User model to describe all info necessary for a person using the service."""
    objects = models.Manager()

    # User data
    user_id = models.CharField(max_length=255, primary_key=True)
    first_name = models.CharField("First name", max_length=255)
    last_name = models.CharField("Last name", max_length=255)
    email = models.EmailField()
    street = models.TextField(default="201 Presidents Cir")
    city = models.TextField(default="Salt Lake City")
    state = models.TextField(default="Utah")
    zipcode = models.TextField(default="84112")
    latitude = models.DecimalField(max_digits=12, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=12, decimal_places=6, blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    inactive = models.BooleanField(default=False)  # in place of delete
    is_admin = models.BooleanField(default=False)  # Used for simple login TODO remove after alpha

    # a user's assets are connected via foreign keys - assets has a FK to user

    # to string function
    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)
