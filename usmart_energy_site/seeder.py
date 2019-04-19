import csv
import os
import random

from users.models import User
from assets.models import Asset
from users.views import users_detail
from transactions.models import Transaction

# Seed users
userCount = 0

with open('seed_files/user_seed.csv') as csvfile:
    READER = csv.reader(csvfile)
    for row in READER:
        u = User(
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
        userCount += 1
        u.save()


# Seed Assets
with open('seed_files/asset_seed.csv') as csvfile:
    READER = csv.reader(csvfile)
    for row in READER:
        userID = random.randint(1, userCount)
        user = User.objects.get(user_id=userID)
        p = Asset(
            owner=user,
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
        userID1 = random.randint(1, userCount)
        asset1 = Asset.objects.filter(owner_id=userID1, inactive = 'False')[:1].get()
        
        while not asset1:
            userID1 = random.randint(1, userCount)
            asset1 = Asset.objects.filter(owner_id=userID1, inactive = 'False')[:1].get()
        
        userID2 = random.randint(1, userCount)
        asset2 = (Asset.objects.filter(owner_id=userID2, inactive = 'False')[:1]).get()

        while not asset2:
            userID2 = random.randint(1, userCount + 1)
            asset2 = Asset.objects.filter(owner_id=userID2, inactive = 'False')[:1].get()

        p = Transaction(
            buyer_asset_id = asset1,
            seller_asset_id = asset2,
            #transaction_time = row[2],
            energy_sent = row[2],
            price_per_kwh = row[3],
        )
       
        p.save()
        