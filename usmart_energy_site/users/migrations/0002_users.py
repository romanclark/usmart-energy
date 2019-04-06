# Generated by Django 2.2 on 2019-04-06 20:39

from django.db import migrations

def create_data(apps, schema_editor):
        # grab the User class
        User = apps.get_model('users', 'User')

        # make the user and save it
        User(first_name="Jim", last_name="de St. Germain", email="binary@cs.utah.edu", address="1835 University Street, Salt Lake City, Utah").save()

class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]