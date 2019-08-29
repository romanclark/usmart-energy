import time
from threading import Thread
import os
import logging
import marketplace_service.matching_naive as matching_naive

# Start the marketplace_service service
def start_new_thread(function):
    """This service will spin in the background, executing the matching logic every
        schedule period (default is 5 minutes for Alpha)"""
    def decorator(*args, **kwargs):
        thread = Thread(target=function, args=args, kwargs=kwargs)
        thread.daemon = True
        thread.start()
    return decorator

@start_new_thread
def start_service():
    """While loop to begin service"""
    schedule = 60  # TODO Set this with a config file

    # Do setups: set log levels, set schedule
    print("\t### Beginning service...")
    while 1:
        print("\t### Service loop...")

        print("\t### Parsing fresh CAL ISO data...")
        # get cal iso data
        # returns delta, price

        # print("\t### Updating assets from user preferences...") not doing this in alpha
        # update_assets_from_preferences()
        # randomize/simulating unique demands as necessary

        print("\t### Running scheduling algorithm...")
        # scheduling_naive()
        # returns ordered list of pairs that will be matched up

        print("\t### Running matching algorithm...")
        matching_naive.do_naive_matching()
        # returns the number of kWh that weren't able to be fulfilled by the marketplace_service
        # keep loop going
        print()
        time.sleep(schedule)  # seconds
