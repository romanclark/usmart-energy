import time
from threading import Thread
import marketplace_service.matching_naive as matching_naive
import mysite.system_config as system_config


# Start the marketplace_service service
def start_new_thread(function):
    """This service will spin in the background, executing the matching logic every
        schedule period (default is 1 minute for Alpha)"""
    def decorator(*args, **kwargs):
        thread = Thread(target=function, args=args, kwargs=kwargs)
        thread.daemon = True
        thread.start()
    return decorator


@start_new_thread
def start_service():
    """While loop to begin service"""
    schedule = system_config.SECONDS_PER_MARKET_PERIOD

    # Do setups: set log levels, set schedule
    print("\tBeginning service...")
    while 1:
        time.sleep(2)
        print("\tService loop...")

        print("\tRunning matching algorithm...")
        matching_naive.do_naive_matching()
        # returns the number of kWh that weren't able to be fulfilled by the marketplace_service
        # keep loop going
        print()
        time.sleep(schedule)  # seconds
