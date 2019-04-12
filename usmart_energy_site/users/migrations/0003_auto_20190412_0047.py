# Generated by Django 2.2 on 2019-04-12 00:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_users'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='address',
        ),
        migrations.RemoveField(
            model_name='user',
            name='asset',
        ),
        migrations.AddField(
            model_name='user',
            name='city',
            field=models.TextField(default='Salt Lake City'),
        ),
        migrations.AddField(
            model_name='user',
            name='latitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='longitute',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='state',
            field=models.TextField(default='Utah'),
        ),
        migrations.AddField(
            model_name='user',
            name='street',
            field=models.TextField(default='201 Presidents Cir'),
        ),
        migrations.AddField(
            model_name='user',
            name='zipcode',
            field=models.TextField(default='84112'),
        ),
    ]
