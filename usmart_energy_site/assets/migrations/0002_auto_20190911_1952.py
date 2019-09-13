# Generated by Django 2.2 on 2019-09-11 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='asset',
            name='mileage_needed',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='asset',
            name='flexible',
            field=models.BooleanField(default=True),
        ),
    ]
