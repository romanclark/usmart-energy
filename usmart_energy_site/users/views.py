from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import User 
from .serializers import *

from assets.models import Asset
from assets.serializers import *

@api_view(['GET', 'POST'])
def users_list(request):
    """
 List users, or create a new user.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        # user = User.objects.all()
        user = User.objects.get_queryset().order_by('user_id')
        page = request.GET.get('page', 1)
        paginator = Paginator(user, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = UserSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/users/?page=' + str(nextPage), 'prevlink': '/api/users/?page=' + str(previousPage)})

    # the method serializes the received user data and then calls the save() method of the serializer object
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def asset_user(request, asset_id):
    """
 Get user from an asset
 """
    if request.method == 'GET':
        asset = Asset.objects.get(asset_id=asset_id)
        owner = User.objects.get(user_id=asset.owner_id)
        serializer = UserSerializer(owner,context={'request': request})
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def users_detail(request, user_id):
    """
 Retrieve, update or delete a user by user_id.
 """
    try:
        user = User.objects.get(user_id=user_id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def list_of_all_users(request):
    """
 List users, or create a new user.
 """
    if request.method == 'GET':
        user = User.objects.get_queryset().order_by('user_id')
        serializer = UserSerializer(user,context={'request': request} ,many=True)

        return Response({'data': serializer.data})