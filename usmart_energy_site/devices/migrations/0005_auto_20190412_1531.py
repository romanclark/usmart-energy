# Generated by Django 2.2 on 2019-04-12 15:31

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('devices', '0004_auto_20190412_1529'),
    ]

    operations = [
        migrations.AlterField(
            model_name='device',
            name='charge_deadline',
            field=models.TimeField(default=datetime.datetime(2019, 4, 12, 23, 31, 45, 723098), verbose_name='deadline'),
        ),
    ]
