# Generated by Django 2.2 on 2019-04-08 23:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20190408_2312'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='asset',
            field=models.CharField(max_length=255, verbose_name='Asset'),
        ),
    ]
