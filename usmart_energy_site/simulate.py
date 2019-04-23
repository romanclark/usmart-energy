import csv
import os
import random

from users.models import User
from assets.models import Asset
from users.views import users_detail
from transactions.models import Transaction
from datetime import datetime



# Seed Transactions
with open('seed_files/simulate_seed.csv') as csvfile:
    READER = csv.reader(csvfile)
    row_count = 0

    for row in READER:
        if (row_count < 7):
            # Buyer is one of Paul's chargers
            buyer_asset = Asset.objects.filter(owner_id=2, asset_class='USmart Charger', inactive = 'False')[:1].get()
            # Seller is one of Connie's panels
            seller_asset = Asset.objects.filter(owner_id=1, asset_class='Solar Panel', inactive = 'False')[:1].get()
        else:
            # Buyer is one of Connie's cars
            buyer_asset = Asset.objects.filter(owner_id=1, asset_class='Electric Vehicle', inactive = 'False')[:1].get()
            # Seller is one of Paul's panels
            seller_asset = Asset.objects.filter(owner_id=2, asset_class='Solar Panel', inactive = 'False')[:1].get()
        
        p = Transaction(
            buyer_asset_id = buyer_asset,
            seller_asset_id = seller_asset,
            energy_sent = row[1],
            price_per_kwh = row[2],
        )
       
        p.save()

        temp_date = datetime.strptime(row[0], '%Y-%m-%d %H:%M:%S')

        p.transaction_time = temp_date
        p.save(update_fields=['transaction_time'])
        row_count+=1



