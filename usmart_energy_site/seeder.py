import csv
import os
import random

from transactions.models import Transaction
from assets.models import Asset

with open('seed/add_transactions.csv') as toaddfile:
    addreader = csv.reader(toaddfile)
    for row in addreader:
        add_asset = Asset.objects.get(asset_id=row[4])
        t = Transaction(
            asset_id = add_asset,
            transaction_time = row[1],
            energy_sent = row[2],
            price_per_kwh = row[3],
            purchased = row[6],
            is_with_grid = row[5]
        )
        t.save()
