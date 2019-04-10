from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Device 
from .serializers import *


@api_view(['GET', 'POST'])
def devices_list(request):
    """
 List  device, or create a new device.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        devices = Device.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(devices, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = DeviceSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/devices/?page=' + str(nextPage), 'prevlink': '/api/devices/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = DeviceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
def devices_detail(request, device_id):
    """
 Retrieve, update or delete a device by id/pk.
 """
    try:
        device = Device.objects.get(device_id=device_id)
    except Device.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DeviceSerializer(device,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = DeviceSerializer(device, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        device.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)