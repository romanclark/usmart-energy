# Generated by Django 2.2 on 2019-09-15 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_is_admin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.DecimalField(decimal_places=0, max_digits=30, primary_key=True, serialize=False),
        ),
    ]
