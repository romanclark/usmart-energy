# Generated by Django 2.2 on 2019-04-09 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0002_assets'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asset',
            name='asset_type',
            field=models.CharField(max_length=255, verbose_name='asset_type'),
        ),
        migrations.AlterField(
            model_name='asset',
            name='nickname',
            field=models.CharField(max_length=255, verbose_name='nickname'),
        ),
    ]
