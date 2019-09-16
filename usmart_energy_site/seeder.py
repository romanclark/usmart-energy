import csv
import os
import random

from users.models import User
from assets.models import Asset
from users.views import users_detail

# Seed users
userCount = 0

# with open('seed/users.csv') as csvfile:
#    READER = csv.reader(csvfile)
#    for row in READER:
#        u = User(
#            first_name=row[0],
#            last_name=row[1],
#            email=row[2],
#            street=row[3],
#            city=row[4],
#            state=row[5],
#            zipcode=row[6],
#            latitude=row[7],
#           longitude=row[8],
#            inactive=row[9],
#        )
#        u.save()


# Seed Assets
with open('seed/assets.csv') as csvfile:
    READER = csv.reader(csvfile)
    for row in READER:
        p = Asset(
            nickname=row[0],
            asset_class=row[1],
            power=row[2],
            energy=row[3],
            capacity=row[4],
            flexible=row[5],
            available=row[6],
            inactive=row[7],
            owner_id=row[8],
            mileage_needed=row[9],
            user_deadline=row[10]
        )
        p.save()
