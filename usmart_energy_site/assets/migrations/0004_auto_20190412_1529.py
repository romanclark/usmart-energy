# Generated by Django 2.2 on 2019-04-12 15:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0003_auto_20190412_0047'),
    ]

    operations = [
        migrations.RenameField(
            model_name='asset',
            old_name='ownder_id',
            new_name='owner_id',
        ),
    ]
