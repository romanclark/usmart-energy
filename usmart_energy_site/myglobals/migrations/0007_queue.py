# Generated by Django 2.2 on 2019-11-03 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myglobals', '0006_myglobals_bool_value'),
    ]

    operations = [
        migrations.CreateModel(
            name='Queue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('market_period', models.DateTimeField()),
                ('queued_energy', models.FloatField()),
            ],
        ),
    ]
