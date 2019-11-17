from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import render
from .models import Myglobals
from datetime import timedelta, datetime
from django.http import HttpResponse
import marketplace_service.matching_naive as matching
import marketplace_service.service as market_service
import mysite.system_config as system_config

# Create your views here.

@api_view(['GET', 'PUT'])
def marketplace_control(request, command):
    market_period = Myglobals.objects.get(key='market_period')
    market_running = Myglobals.objects.get(key='market_running')
    tempPause = False
    if (command == "skip"):
        # Move market period forward to next hour
        market_period.date_value += timedelta(hours=1)
        market_period.date_value.replace(microsecond=0,second=0,minute=0,hour=0)
        market_period.save()

        # Stop the market and run the matching algorithm immediately
        if (market_running.bool_value):
            tempPause = True
            market_service.stop_market()
            # Maybe sleep for a second in case last market period already happened

        matching.do_naive_matching(market_period.date_value) 

        # Remove any progress towards the next market_period
        already_elapsed = Myglobals.objects.get(key='already_elapsed')
        already_elapsed.float_value = 0
        already_elapsed.save()

        # If we paused the market to do an immediate match, restart it
        if tempPause:
            market_service.start_market()

    elif (command == "play"):
        market_service.start_market()
    elif (command == "pause"):
        market_service.stop_market()
    elif (command == "reset"):
        market_service.stop_market()
        market_period.date_value = datetime.now().replace(microsecond=0,second=0,minute=0,hour=0)
        matching.reset_simulated_marketplace(market_period.date_value)
        market_period.save()
        already_elapsed = Myglobals.objects.get(key='already_elapsed')
        already_elapsed.float_value = 0
        already_elapsed.save()

    # If we paused, wait until market successfully stopped to grab the time
    if (command == "pause"):
        while 1:
            market_still_running = Myglobals.objects.get(key='market_running').bool_value
            if not market_still_running:
                break      
    
    already_elapsed = Myglobals.objects.get(key='already_elapsed')
    time_in_curr_market = timedelta(hours = (already_elapsed.float_value / system_config.SECONDS_PER_MARKET_PERIOD))
    time_to_show = market_period.date_value + time_in_curr_market

    return HttpResponse(time_to_show)


@api_view(['PUT'])
def reset_simulation(request):
    matching.reset_simulated_marketplace(datetime.today().replace(hour=0, minute=0, second=0))
    market_period = Myglobals.objects.get(key='market_period')
    market_period.date_value = datetime.today().replace(hour=0, minute=0, second=0)
    market_period.save()
    return HttpResponse('')

@api_view(['PUT'])
def run_market(request, market_period):
    matching.do_naive_matching(market_period)
    return HttpResponse('')

@api_view(['GET'])
def get_market_time(request):
    market_period = Myglobals.objects.get(key='market_period')
    time_to_show = market_period.date_value
    return HttpResponse(time_to_show)

@api_view(['GET'])
def get_market_running(request):
    market_running = Myglobals.objects.get(key='market_running').bool_value
    return HttpResponse(market_running)