# Generated by Django 2.2 on 2019-04-13 18:59

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Asset',
            fields=[
                ('asset_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nickname', models.CharField(max_length=255)),
                ('asset_class', models.CharField(max_length=255, null=True)),
                ('power', models.FloatField(default=0)),
                ('energy', models.FloatField(default=0)),
                ('capacity', models.FloatField(default=0)),
                ('flexible', models.BooleanField(default=False)),
                ('preferences', models.CharField(max_length=255, null=True)),
                ('available', models.BooleanField(default=True)),
                ('inactive', models.BooleanField(default=False)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='users.User')),
            ],
        ),
    ]
