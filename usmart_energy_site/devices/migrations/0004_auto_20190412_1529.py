# Generated by Django 2.2 on 2019-04-12 15:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('devices', '0003_auto_20190412_0047'),
    ]

    operations = [
        migrations.AlterField(
            model_name='device',
            name='charge_deadline',
            field=models.TimeField(default=datetime.datetime(2019, 4, 12, 23, 29, 6, 173414), verbose_name='deadline'),
        ),
    ]
