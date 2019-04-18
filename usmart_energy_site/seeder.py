import csv
import os

from users.models import User
from assets.models import Asset
from transactions.models import Transaction

# Seed users
with open('seed_files/user_seed.csv') as csvfile:
    READER = csv.reader(csvfile)
    for row in READER:
        p = User(
            first_name=row[0],
            last_name=row[1],
            email=row[2],
            street=row[3],
            city=row[4],
            state=row[5],
            zipcode=row[6],
            latitude=row[7],
            longitude=row[8],
            inactive=row[9],
        )
        p.save()


# Seed Assets
with open('seed_files/asset_seed.csv') as csvfile:
    READER = csv.reader(csvfile)
    for row in READER:
        p = Asset(
            owner=row[0],
            nickname=row[1],
            asset_class=row[2],
            power=row[3],
            energy=row[4],
            capacity=row[5],
            flexible=row[6],
            preferences=row[7],
            available=row[8],
            inactive=row[9],
        )
        p.save()


# Seed Transactions
with open('seed_files/transactions_seed.csv') as csvfile:
    READER = csv.reader(csvfile)
    for row in READER:
        p = Transaction(
            buyer_asset_id = row[0],
            seller_asset_id = row[1],
            transaction_time = row[2],
            energy_sent = row[3],
            price_per_kwh = row[4],
        )
        p.save()
        