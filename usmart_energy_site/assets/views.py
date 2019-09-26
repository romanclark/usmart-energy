from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Asset
from users.models import User
from users.serializers import *

from .serializers import *

@api_view(['GET', 'POST'])
def assets_list(request):
    """
 List  Asset, or create a new Asset.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        assets_list = Asset.objects.all().order_by('asset_id')
        page = request.GET.get('page', 1)
        paginator = Paginator(assets_list, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = AssetSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
                         'nextlink': '/api/assets/?page=' + str(nextPage),
                         'prevlink': '/api/assets/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = AssetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def all_assets_list(request):
    """Gets the list of all assets (no pagination)"""
    all_assets = Asset.objects.all().order_by('asset_id')
    serializer = AssetSerializer(all_assets, context={'request': request}, many=True)
    return Response({'data': serializer.data})

@api_view(['GET', 'POST'])
def user_assets_list(request, user_id):
    """
 List assets of one user or create a new asset for that user
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        assets_list = Asset.objects.filter(owner=user_id, inactive="False").order_by('asset_id')
        page = request.GET.get('page', 1)
        paginator = Paginator(assets_list, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = AssetSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data, 'count': paginator.count, 'numpages' : paginator.num_pages,
                         'nextlink': '/api/assets/?page=' + str(nextPage),
                         'prevlink': '/api/assets/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = AssetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def assets_detail(request, asset_id):
    """
 Retrieve, update or delete a asset by id/pk.
 """
    try:
        asset = Asset.objects.get(asset_id=asset_id)
    except Asset.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AssetSerializer(asset, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AssetSerializer(asset, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        asset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
