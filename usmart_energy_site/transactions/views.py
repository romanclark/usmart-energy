from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Transaction 
from .serializers import *

@api_view(['GET', 'POST'])
def transactions_list(request):
    """
 List transactions, or create a new transaction.
 """
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

@api_view(['GET', 'PUT', 'DELETE'])
def transactions_detail(request, trnasaction_id):
    """
 Retrieve, update or delete a transaction by id/pk.
 """
    try:
        transaction = Transaction.objects.get(transaction_id=trnasaction_id)
    except Transaction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TransactionSerializer(transaction,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TransactionSerializer(transaction, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)