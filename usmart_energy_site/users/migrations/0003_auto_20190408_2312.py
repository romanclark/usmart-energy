# Generated by Django 2.2 on 2019-04-08 23:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='asset',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Asset'),
        ),
    ]
