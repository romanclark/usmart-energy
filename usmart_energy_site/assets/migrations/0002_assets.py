# Generated by Django 2.2 on 2019-04-09 06:10

from django.db import migrations

def create_data(apps, schema_editor):
    Asset = apps.get_model('assets', 'Asset')
    Asset(nickname="SolarP", asset_type="Solar Panel").save()


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
