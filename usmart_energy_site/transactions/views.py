from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import HttpResponse
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
import decimal
from django.db.models import Sum
from django.db.models import F
from django.db import models
import json
from assets.models import Asset
from assets.serializers import *
from myglobals.models import Myglobals, Queue

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Transaction 
from .serializers import *

import mysite.system_config as system_config
from datetime import datetime, timedelta

@api_view(['GET'])
def all_transactions_list(request):
    """Gets the list of all transactions (no pagination)"""
    all_transactions = Transaction.objects.all().order_by('transaction_id')
    serializer = TransactionSerializer(all_transactions, context={'request': request}, many=True)
    return Response({'data': serializer.data})

@api_view(['GET', 'POST'])
def transactions_list(request):
    """List transactions, or create a new transaction."""

    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        transactions_list = Transaction.objects.all().order_by('transaction_id')
        page = request.GET.get('page', 1)
        paginator = Paginator(transactions_list, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = TransactionSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/transactions/?page=' + str(nextPage), 'prevlink': '/api/transactions/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def transactions_stats(request):
    """Get the stats of the current market period"""

    market_period = Myglobals.objects.get(key='market_period')
    market_period_transactions = Transaction.objects.filter(transaction_time=market_period.date_value)

    stats = []

    sum = 0
    for trans in market_period_transactions.filter(is_with_grid=0):
        sum += decimal.Decimal(trans.energy_sent)

    stats.append(sum/2)

    sum = 0
    for trans in market_period_transactions.filter(is_with_grid=1, purchased=1):
        sum += decimal.Decimal(trans.energy_sent)


    stats.append(sum)

    sum = 0
    for trans in market_period_transactions.filter(is_with_grid=1, purchased=0):
        sum += decimal.Decimal(trans.energy_sent)

    stats.append(sum)

    return  HttpResponse( json.dumps(list(stats), cls=DjangoJSONEncoder))

@api_view(['GET'])
def filter_transactions_list(request, startTime, endTime, is_with_grid, purchased):
    """Get all the transactions that occurred based off the filters"""

    with_grid = True if is_with_grid == "true" else False
    purch = True if purchased == "true" else False

    filtered_transactions = Transaction.objects.filter(transaction_time__gte=startTime, transaction_time__lte=endTime, is_with_grid=with_grid, purchased=purch).order_by('-transaction_time')
    serializer = TransactionSerializer(filtered_transactions, context={'request': request}, many=True)
    return Response({'data': serializer.data})

# @api_view(['GET'])
# def market_period_transactions(request, is_with_grid):
#     """Get all the transactions that occurred in the most recent market period of time t"""

#     next_page = 1
#     previous_page = 1
#     recent_transaction = Transaction.objects.order_by('-transaction_time')[:1]
#     period_transactions = Transaction.objects.filter(transaction_time=recent_transaction[0].transaction_time,
#                                                    is_with_grid=is_with_grid).order_by('-transaction_time')
#     page = request.GET.get('page', 1)
#     paginator = Paginator(period_transactions, 10)
#     try:
#         data = paginator.page(page)
#     except PageNotAnInteger:
#         data = paginator.page(1)
#     except EmptyPage:
#         data = paginator.page(paginator.num_pages)

#     serializer = TransactionSerializer(data,context={'request': request} ,many=True)
#     if data.has_next():
#         next_page = data.next_page_number()
#     if data.has_previous():
#         previous_page = data.previous_page_number()

#     return Response({'data': serializer.data, 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/transactions/?page=' + str(next_page), 'prevlink': '/api/transactions/?page=' + str(previous_page)})

@api_view(['GET'])
def all_market_period_transactions(request, is_with_grid):
    """Gets the list of all transactions that belong to the given market period (no pagination)"""
    market_period = Myglobals.objects.get(key='market_period')
    all_period_transactions = Transaction.objects.filter(transaction_time=market_period.date_value,
                                                   is_with_grid=is_with_grid).order_by('-transaction_time')
    serializer = TransactionSerializer(all_period_transactions, context={'request': request}, many=True)
    return Response({'data': serializer.data})

@api_view(['GET'])
def transactions_total(request):
    """
 Get total amount spent throughout all transactions per day
 """
    
    q = Transaction.objects.extra(select={'day': 'date( transaction_time )'}).values('day').annotate(total=Sum(F('price_per_kwh')*F('energy_sent'), output_field=models.FloatField())).order_by('day')
    return HttpResponse( json.dumps(list((q)), cls=DjangoJSONEncoder) )

@api_view(['GET'])
def transactions_total_month(request, month):
    """
 Get total amount spent throughout all transactions in a given month
 """

    sum = 0
    for t in Transaction.objects.filter(transaction_time__month=month).order_by('transaction_time'):
        sum += t.price_per_kwh * decimal.Decimal(t.energy_sent)

    # Just returning a string, so no need to mess with Response() and Serializer
    return HttpResponse("{:.2f}".format(sum))

@api_view(['GET'])
def energy_total(request, month):
    """Get total amount of energy distributed throughout all transactions in a given month"""
    
    q = Transaction.objects.filter(transaction_time__month=month).extra(select={'day': 'date( transaction_time )'}).values('day').annotate(total=Sum('energy_sent')).order_by('day')
    return HttpResponse( json.dumps(list((q)), cls=DjangoJSONEncoder) )

@api_view(['GET'])
def prior_day_demand(request):
    """Get total amount of energy distributed throughout all transactions in the last 24 hours"""
    
    market_period = Myglobals.objects.get(key='market_period')
    today = market_period.date_value.date()
    q = Transaction.objects.filter(transaction_time__date=today, purchased=True).extra(select={'hour': 'date_part(\'hour\', transaction_time)'}).values('hour').annotate(total=Sum('energy_sent')).order_by('hour')

    return HttpResponse( json.dumps(list((q)), cls=DjangoJSONEncoder) )

@api_view(['GET'])
def prior_day_supply(request):
    """Get total amount of energy distributed throughout all transactions in the last 24 hours"""
    
    market_period = Myglobals.objects.get(key='market_period')
    today = market_period.date_value.date()
    q = Transaction.objects.filter(transaction_time__date=today, purchased=False).extra(select={'hour': 'date_part(\'hour\', transaction_time)'}).values('hour').annotate(total=Sum('energy_sent')).order_by('hour')

    return HttpResponse( json.dumps(list((q)), cls=DjangoJSONEncoder) )

@api_view(['GET'])
def user_transactions(request, user_id):
    """Get all transactions a user is a part of"""

    transactions = []
    user_assets = Asset.objects.filter(owner=user_id).values('asset_id')
    for asset in user_assets:
        id = asset['asset_id']
        usr_trans = Transaction.objects.filter(asset_id_id=id).order_by('-transaction_time')
        for t in usr_trans:
            transactions.append(t)

    serializer = TransactionSerializer(transactions, context={'request': request}, many=True)
    return Response({'data': serializer.data})


@api_view(['GET'])
def daily_energy_queue(request):
    """Get total amount of energy distributed throughout all transactions in the last 24 hours"""
    
    market_period = Myglobals.objects.get(key='market_period')
    today = market_period.date_value.date()
    q = Queue.objects.filter(market_period__date=today).extra(select={'hour': 'date_part(\'hour\', market_period)'}).values('hour', 'queued_energy').order_by('hour')
    return HttpResponse( json.dumps(list((q)), cls=DjangoJSONEncoder) )
# @api_view(['GET'])
# def transaction_data_by_user(request, user):
#     """Get transactional data for given user. Returns [$ spent, energy bought, $ sold, energy sold, $ saved]"""

#     dollar_bought = 0
#     energy_bought = 0
#     dollar_sold = 0
#     energy_sold = 0
#     user_assets = Asset.objects.filter(owner=user).values('asset_id')
#     for user_asset in user_assets:
#         id = user_asset['asset_id']
#         # sale stats
#         for t in Transaction.objects.filter(asset_id_id=id):
#             dollar_sold += t.price_per_kwh * decimal.Decimal(t.energy_sent)
#             energy_sold += t.energy_sent
    
#     # find saved amount using hardcoded distributor price of $0.15
#     market_cost = energy_bought * 0.15
#     saved = decimal.Decimal(market_cost) - dollar_bought

#     obj = [str(dollar_bought), energy_bought, str(dollar_sold), energy_sold, saved]
#     return HttpResponse(json.dumps(obj))

@api_view(['GET'])
def transactions_by_user_by_month(request, user, month):
    """Get transactional data for given user in a given month. Returns [$ spent, energy bought, $ sold, energy sold, $ saved]"""

    dollar_bought = 0
    energy_bought = 0
    dollar_sold = 0
    energy_sold = 0
    user_assets = Asset.objects.filter(owner=user).values('asset_id')
    for user_asset in user_assets:
        id = user_asset['asset_id']
        # sale stats
        for t in Transaction.objects.filter(asset_id_id=id, transaction_time__month=month, purchased=1):
            dollar_bought += t.price_per_kwh * decimal.Decimal(t.energy_sent)
            energy_bought += t.energy_sent

        for t in Transaction.objects.filter(asset_id_id=id, transaction_time__month=month, purchased=0):
            dollar_sold += t.price_per_kwh * decimal.Decimal(t.energy_sent)
            energy_sold += t.energy_sent

    # find saved amount using hardcoded distributor price of $0.15
    market_cost = energy_bought * 0.15
    saved = decimal.Decimal(market_cost) - dollar_bought

    obj = [str(dollar_bought), energy_bought, str(dollar_sold), energy_sold, str(saved)]
    return HttpResponse(json.dumps(obj))



# @api_view(['GET', 'PUT', 'DELETE'])
# def transactions_detail(request, transaction_id):
#     """Retrieve, update or delete a transaction by id/pk."""

#     try:
#         transaction = Transaction.objects.get(transaction_id=transaction_id)
#     except Transaction.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = TransactionSerializer(transaction,context={'request': request})
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = TransactionSerializer(transaction, data=request.data,context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         transaction.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)