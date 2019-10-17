import random
import json
from users.models import User
from assets.models import Asset
from datetime import timedelta, datetime

rand_latitude = "{0:.7f}".format(random.uniform(40.71, 40.782))
rand_longitude = "{0:.7f}".format(random.uniform(-111.8, -111.91))

USER_COUNT = 25
WORK_EV_COUNT = 5
HOME_EV_COUNT = 5
PUBLIC_EV_COUNT = 5
PANEL_COUNT = 5
FLEXIBLE_PANEL_COUNT = 5

# Create users
for x in range(USER_COUNT):
    rand_latitude = "{0:.6f}".format(random.uniform(40.71, 40.782))
    rand_longitude = "{0:.6f}".format(random.uniform(-111.8, -111.91))
    u = User(
        user_id = str(x),  
        first_name = "FName" + str(x),
        last_name="LName" + str(x),
        email= str(x) + "@email.com",
        street="Address" + str(x),
        city="Salt Lake City",
        state="Utah",
        zipcode="84111",
        latitude=rand_latitude, 
        longitude=rand_longitude,
        inactive=False 
    )
    u.save()
     

# Work profiles - deadline of 18. Requests between 19-8 are inflexible. 80% will become available at 9 until deadline. 10% of requesting for an hour 18-4. 30% from 5-8.
for x in range(WORK_EV_COUNT):
    a = Asset(
        nickname="SIM_WORK_EV_" + str(x),
        asset_class="Electric Vehicle",
        power=8.8,
        energy=50,
        capacity=100,
        flexible=True,
        available=False,
        inactive=False,
        owner_id= str(x),
        mileage_needed=0,
        user_deadline=datetime.now().replace(microsecond=0,second=0,minute=0,hour=18)
    )
    a.save()

# Home profiles - deadline of 8. Requests between 8-18 are inflexible. 10% of requesting for an hour from 8-12, 20% from 12-18. 80% will become available at 18 until deadline.
for x in range(HOME_EV_COUNT):
    a = Asset(
        nickname="SIM_HOME_EV_" + str(x),
        asset_class="Electric Vehicle",
        power=8.8,
        energy=50,
        capacity=100,
        flexible=True,
        available=False,
        inactive=False,
        owner_id= str(x+WORK_EV_COUNT),
        mileage_needed=0,
        user_deadline=datetime.now().replace(microsecond=0,second=0,minute=0,hour=8) + timedelta(days=1)
    )
    a.save()

# Public profiles - deadline of 2 hours from arrival. Arrival is 10% from 23-6, 40% from 7-22. 
for x in range(PUBLIC_EV_COUNT):
    a = Asset(
        nickname="SIM_PUBLIC_EV_" + str(x),
        asset_class="Electric Vehicle",
        power=22,
        energy=50,
        capacity=100,
        flexible=True,
        available=False,
        inactive=False,
        owner_id= str(x+HOME_EV_COUNT+WORK_EV_COUNT),
        mileage_needed=0,
        user_deadline=datetime.now().replace(microsecond=0,second=0,minute=0,hour=12)
    )
    a.save()

# Inflexible panels
for x in range(PANEL_COUNT):
    a = Asset(
        nickname="SIM_PANEL_" + str(x),
        asset_class="Solar Panel",
        power=10,
        energy=20,
        capacity=50,
        flexible=False,
        available=False,
        inactive=False,
        owner_id= str(x+HOME_EV_COUNT+WORK_EV_COUNT+PUBLIC_EV_COUNT),
        mileage_needed=0,
        user_deadline=datetime.now().replace(microsecond=0,second=0,minute=0,hour=0)
    )
    a.save()

# Flexible panels
for x in range(FLEXIBLE_PANEL_COUNT):
    a = Asset(
        nickname="SIM_FLEX_PANEL_" + str(x),
        asset_class="Solar Panel",
        power=10,
        energy=20,
        capacity=50,
        flexible=True,
        available=False,
        inactive=False,
        owner_id= str(x+HOME_EV_COUNT+WORK_EV_COUNT+PUBLIC_EV_COUNT+PANEL_COUNT),
        mileage_needed=0,
        user_deadline=datetime.now().replace(microsecond=0,second=0,minute=0,hour=0)
    )
    a.save()