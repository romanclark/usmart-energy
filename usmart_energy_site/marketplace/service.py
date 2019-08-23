import time
from threading import Thread
import logging
from marketplace.matching_naive import do_naive_matching

# Start the marketplace service
def start_new_thread(function):
    """This service will spin in the background, executing the matching logic every
        schedule period (default is 5 minutes for Alpha)"""
    def decorator(*args, **kwargs):
        thread = Thread(target=function, args=args, kwargs=kwargs)
        thread.daemon = True
        thread.start()
    return decorator

@start_new_thread
def start_service(schedule=5, repeat_until=None):
    """While loop to begin service"""
    # Do setups: set log levels, set schedule
    print("\t### Beginning service...")
    while 1:
        time.sleep(schedule)
        print("\t### Service loop...")

        print("\t### Parsing fresh CAL ISO data...")
        # get cal iso data
        # returns delta, price

        print("\t### Updating assets from user preferences...")
        # updaate_assets_from_preferences()
        # randomize/simulating unique demands as necessary

        print("\t### Running scheduling algorithm...")
        # scheduling_naive()
        # returns ordered list of pairs that will be matched up

        print("\t### Running matching algorithm...")
        do_naive_matching()
        # returns the number of kWh that weren't able to be fulfilled by the marketplace
        # keep loop going
        print()
