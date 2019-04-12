import csv
import os

from users.models import User
from devices.models import Device

with open('seed_files/user_seed.csv') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        p = User(
        first_name=row[0],
        last_name=row[1],
        email=row[2],
        asset=row[3],
        address=row[4])
        p.save()


with open('seed_files/device_seed.csv') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        p = Device(
        nickname=row[0],
        device_type=row[1],
        charge_deadline=row[2],)
        p.save()


# with open('seed_files/asset_seed.csv') as csvfile:
#     reader = csv.reader(csvfile)
#     for row in reader:
#         p = Device(
#         nickname=row[0],
#         asset_type=row[1],
#         percent_of_mrkt_price=row[2],)
#         p.save()



