# Generated by Django 2.2 on 2019-04-12 22:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20190412_2025'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='inactive',
            field=models.BooleanField(default=False),
        ),
    ]
