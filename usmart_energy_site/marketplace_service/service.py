import time
from threading import Thread
import marketplace_service.matching_naive as matching_naive
import mysite.system_config as system_config
from datetime import datetime, timedelta

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
    curr_market_period = datetime.now().replace(microsecond=0,second=0,minute=0)
    while 1:
        time.sleep(2)
        print("\n\tService loop:")

        print("\tRunning matching algorithm...")
        matching_naive.do_naive_matching(market_period=curr_market_period)

        # keep loop going
        time.sleep(schedule)  # seconds

        # simulate progression of an hour in market
        curr_market_period += timedelta(hours=1)
