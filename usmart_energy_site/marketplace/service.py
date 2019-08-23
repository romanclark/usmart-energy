import time
from threading import Thread
import logging
# Start the marketplace service
# This service will spin in the background, executing the matching logic every schedule period (default is 5 minutes for Alpha)
def start_new_thread(function):
    def decorator(*args, **kwargs):
        t = Thread(target = function, args=args, kwargs=kwargs)
        t.daemon = True
        t.start()
    return decorator


@start_new_thread
def start_service(schedule=5, repeat_until=None):
    # Do setups: set log levels, set schedule
    while 1:
        print("Hello from marketplace")
        time.sleep(schedule)



