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
    run_market()
    #starting_market_period = datetime.now().replace(hour=0,minute=0,second=0,microsecond=0)
    #market_period = Myglobals.objects.get(key='market_period')
    #market_period.date_value = starting_market_period
    #market_period.save()
    #matching.reset_simulated_marketplace(starting_market_period)
    #already_elapsed = Myglobals.objects.get(key='already_elapsed')
    #already_elapsed.float_value = 0
    #already_elapsed.save()


running = False

@start_new_thread
def run_market():
    global running
    running = False
    firstStop = False
    firstRun = True
    market_interval = system_config.SECONDS_PER_MARKET_PERIOD
    
    while True:
        if running:
            # Only have to grab initi
            if firstRun:
                already_elapsed = Myglobals.objects.get(key='already_elapsed')
                market_running = Myglobals.objects.get(key='market_running')
                market_running.bool_value = True
                market_running.save()
                start_time = time.time() - already_elapsed.float_value
                elapsed = 0
                firstRun = False
                firstStop = True
            elapsed = time.time() - start_time
            if (elapsed > market_interval):
                # Move market_period forward and run matching algo
                elapsed = 0
                market_period = Myglobals.objects.get(key='market_period')
                market_period.date_value += timedelta(hours=1)
                market_period.save()
                matching.do_naive_matching(market_period.date_value)

                #Reset market start_time
                start_time = time.time()
                already_elapsed.float_value = 0
                already_elapsed.save()
        else:
            # Only need to update myglobals after initial stop
            if firstStop:
                # Once stop_market is called and we leave for loop, update how much time has passed since start of this market period  
                already_elapsed = Myglobals.objects.get(key='already_elapsed')
                already_elapsed.float_value = elapsed
                already_elapsed.save()
                market_running = Myglobals.objects.get(key='market_running')
                market_running.bool_value = False
                market_running.save()
                firstStop = False
                firstRun = True


def stop_market():
    global running
    running = False


def start_market():
    global running
    running = True
