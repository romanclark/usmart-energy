from django.db import models

# run "python manage.py makemigrations" and "python manage.py migrate" if you change any models

# Create your models here.
class User(models.Model):
    objects = models.Manager()

    # user data
    user_id = models.AutoField()
    first_name = models.CharField("First name", max_length=255)
    last_name = models.CharField("Last name", max_length=255)
    email = models.EmailField()
    address =  models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    # do we want lists of devices and assets?

    # set user_id as primary key
    user_id.primary_key = True

    # to string function
    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)