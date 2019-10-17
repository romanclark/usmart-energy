import time
from threading import Thread
import marketplace_service.matching_naive as matching
import mysite.system_config as system_config
from datetime import datetime, timedelta
from myglobals.models import Myglobals

# Used as a decorator to run marketplace on a separate thread
def start_new_thread(function):
    """This service will spin in the background, executing the matching logic every
        schedule period (default is 1 minute for Alpha)"""
    def decorator(*args, **kwargs):
        thread = Thread(target=function, args=args, kwargs=kwargs)
        thread.daemon = True
        thread.start()
    return decorator


def initialize_market():
    """On server start, reset marketplace to today and freeze market"""

    starting_market_period = datetime.now().replace(hour=0,minute=0,second=0,microsecond=0)
    market_period = Myglobals.objects.get(key='market_period')
    market_period.date_value = starting_market_period
    market_period.save()
    matching.reset_marketplace(starting_market_period)
    already_elapsed = Myglobals.objects.get(key='already_elapsed')
    already_elapsed.float_value = 0
    already_elapsed.save()


running = False

@start_new_thread
def run_market():
    global running
    running = True
    market_interval = system_config.SECONDS_PER_MARKET_PERIOD
    already_elapsed = Myglobals.objects.get(key='already_elapsed')
    start_time = time.time() - already_elapsed.float_value
    
    # Until operator pauses simulation, allow time to pass
    while running:
        elapsed = time.time() - start_time
        if (elapsed > market_interval):
            # Run matching algorithm
            market_period = Myglobals.objects.get(key='market_period')
            matching.do_naive_matching(market_period.date_value)

            # Update market period and reset market start_time
            market_period.date_value += timedelta(hours=1)
            market_period.save()
            start_time = time.time()
            print("Completed Market Period")

    # Once stop_market is called and we leave for loop, update how much time has passed since start of this market period   
    already_elapsed = Myglobals.objects.get(key='already_elapsed')
    already_elapsed.float_value = elapsed
    already_elapsed.save()   


def stop_market():
    global running
    running = False