from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import render
from .models import Myglobals
from datetime import timedelta, datetime
from django.http import HttpResponse
import marketplace_service.matching_naive as matching
import marketplace_service.service as market_service

# Create your views here.

@api_view(['GET', 'PUT'])
def marketplace_control(request, command):
    market_period = Myglobals.objects.get(key='market_period')
    if (command == "skip"):
        # Move market period forward to next hour
        market_period.date_value += timedelta(hours=1)
        market_period.date_value.replace(microsecond=0,second=0,minute=0,hour=0)
        market_period.save()

        # Stop the market and run the matching algorithm immediately
        #market_service.stop_market()
        matching.do_naive_matching(market_period.date_value)

        # Remove any progress towards the next market_period
        already_elapsed = Myglobals.objects.get(key='already_elapsed')
        already_elapsed.float_value = 0
        already_elapsed.save()

        # Resume market - but what if it's already running? Need to store bool?
        #market_service.run_market()

    elif (command == "play"):
        market_service.run_market()
    elif (command == "pause"):
        market_service.stop_market()
    elif (command == "reset"):
        market_service.stop_market()
        market_period.date_value = datetime.now().replace(microsecond=0,second=0,minute=0,hour=0)
        matching.reset_marketplace(market_period.date_value)
        market_period.save()

    return HttpResponse(market_period.date_value)

@api_view(['GET'])
def get_market_time(request):
    market_period = Myglobals.objects.get(key='market_period')
    return HttpResponse(market_period.date_value)
