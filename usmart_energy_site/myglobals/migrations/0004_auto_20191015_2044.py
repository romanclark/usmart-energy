# Generated by Django 2.2 on 2019-10-15 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myglobals', '0003_auto_20191015_0023'),
    ]

    operations = [
        migrations.RenameField(
            model_name='myglobals',
            old_name='value',
            new_name='date_value',
        ),
        migrations.AddField(
            model_name='myglobals',
            name='bool_value',
            field=models.BooleanField(null=True),
        ),
    ]