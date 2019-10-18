from assets.models import Asset
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import requests
import dateparser
from datetime import datetime, date, timedelta


@csrf_exempt
def webhook(request):
    # build a request object
    req = json.loads(request.body)
    # get action from json
    action = req.get('queryResult').get('action')

    # Get the access token and user info from the request
    access_token = req.get('originalDetectIntentRequest').get('payload').get('user').get('accessToken')

    response = requests.get('http://electricavenue.auth0.com/userinfo',
                            headers={'Authorization': 'Bearer {token}'.format(token=access_token)})

    resp = response.content.decode()
    if "Unauthorized" in resp:
        fulfillment_text = {
            'fulfillmentText': 'Something went wrong. Please make sure you have a linked account with us'}
        # return response
        return JsonResponse(fulfillment_text, safe=False)

    user_info = json.loads(response.content)
    user_id = user_info.get('sub')

    # Define paths for each action to follow
    if action == 'get_my_devices':
        return get_my_devices(user_id)
    elif action == 'set_to_available':
        device = req.get('queryResult').get('parameters').get('device_nickname')
        return set_to_available(user_id, device)
    elif action == 'update_deadline':
        device = req.get('queryResult').get('parameters').get('device_nickname')
        deadline = req.get('queryResult').get('parameters').get('deadline')
        text = req.get('queryResult').get('queryText')
        return update_deadline(user_id, device, deadline)
    elif action == 'set_to_unavailable':
        device = req.get('queryResult').get('parameters').get('device_nickname')
        return set_to_un_available(user_id, device)
    elif action == 'device_charge':
        device = req.get('queryResult').get('parameters').get('device_nickname')
        return device_charge_level(user_id, device)
    elif action == 'set_to_flexible':
        device = req.get('queryResult').get('parameters').get('device_nickname')
        return set_to_flexible(user_id, device)
    elif action == 'set_to_inflexible':
        device = req.get('queryResult').get('parameters').get('device_nickname')
        return set_to_inflexible(user_id, device)

    # return a fulfillment message containing and Error message since no action was taken
    fulfillment_text = {'fulfillmentText': 'Please try again, we are unable to fulfill your request at this time'}
    # return response
    return JsonResponse(fulfillment_text, safe=False)


def device_charge_level(user_id, asset_name):
    try:
        device = Asset.objects.get(owner=user_id, nickname__iexact=asset_name, inactive=False)
    except Asset.DoesNotExist:
        return JsonResponse({'fulfillmentText': 'Unable to find matching asset, please try again.'}, safe=False)

    if device.asset_class == "Electric Vehicle" or device.asset_class == "Solar Panel with Battery":
        return JsonResponse({'fulfillmentText': 'The charge level is {}'.format(device.energy)},
                            safe=False)
    else:
        return JsonResponse({'fulfillmentText': 'Normal solar panels do not have a charge'},
                            safe=False)


def set_to_flexible(user_id, asset_name):
    try:
        device = Asset.objects.get(owner=user_id, nickname__iexact=asset_name, inactive=False)
    except Asset.DoesNotExist:
        return JsonResponse({'fulfillmentText': 'Unable to find matching asset, please try again.'}, safe=False)

    if device.flexible:
        return JsonResponse({'fulfillmentText': 'This asset is already flexible.'}, safe=False)
    else:
        device.flexible = True
        device.save()
        return JsonResponse({'fulfillmentText': 'Ok, your asset, {}, is set to flexible.'.format(asset_name)},
                            safe=False)


def set_to_inflexible(user_id, asset_name):
    try:
        device = Asset.objects.get(owner=user_id, nickname__iexact=asset_name, inactive=False)
    except Asset.DoesNotExist:
        return JsonResponse({'fulfillmentText': 'Unable to find matching asset, please try again.'}, safe=False)

    if not device.flexible:
        return JsonResponse({'fulfillmentText': 'This asset is already inflexible.'}, safe=False)
    else:
        device.flexible = False
        device.save()
        return JsonResponse({'fulfillmentText': 'Ok, your asset, {}, is set to inflexible.'.format(asset_name)},
                            safe=False)


def set_to_un_available(user_id, asset_name):
    try:
        device = Asset.objects.get(owner=user_id, nickname__iexact=asset_name, inactive=False)
    except Asset.DoesNotExist:
        return JsonResponse({'fulfillmentText': 'Unable to find matching asset, please try again.'}, safe=False)

    if not device.available:
        return JsonResponse({'fulfillmentText': 'This asset is already un-available.'}, safe=False)
    else:
        device.available = False
        device.save()
        return JsonResponse({'fulfillmentText': 'Ok, your asset, {}, is set to un-available.'.format(asset_name)},
                            safe=False)


def set_to_available(user_id, asset_name):
    try:
        device = Asset.objects.get(owner=user_id, nickname__iexact=asset_name, inactive=False)
    except Asset.DoesNotExist:
        return JsonResponse({'fulfillmentText': 'Unable to find matching asset, please try again.'}, safe=False)

    if device.available:
        return JsonResponse({'fulfillmentText': 'This asset is already available.'}, safe=False)
    else:
        device.available = True
        device.save()
        return JsonResponse({'fulfillmentText': 'Ok, your asset, {}, is now available.'.format(asset_name)}, safe=False)


#  Get my devices
def get_my_devices(user_id):
    try:
        devices = Asset.objects.filter(owner=user_id, inactive=False)
    except Asset.DoesNotExist:
        return JsonResponse({'fulfillmentText': 'You do not have any active assets'}, safe=False)

    if devices.count() == 0:
        return JsonResponse({'fulfillmentText': 'You do not have any active assets'}, safe=False)

    devString = ""
    counter = 1

    for dev in devices:
        if devices.count() == 1:
            return JsonResponse({'fulfillmentText': 'Here is your only asset: {}.'.format(dev.nickname)}, safe=False)

        if counter == devices.count():
            devString += " and " + dev.nickname
            break

        devString += dev.nickname + ", "
        counter += 1

    return JsonResponse({'fulfillmentText': 'Here are your assets: {}.'.format(devString)}, safe=False)

def update_deadline(user_id, asset_name, deadline):
    try:
        asset = Asset.objects.get(owner=user_id, nickname__iexact=asset_name, inactive=False)
    except Asset.DoesNotExist:
        return JsonResponse({'fulfillmentText': 'Unable to find matching asset, please try again.'}, safe=False)

    if deadline.lower() == "tomorrow" or deadline.lower() == "tomorrow.":
        return update_to_tomorrow(asset, asset_name)

    deadline_date = dateparser.parse(deadline)

    if deadline_date is None:
        return JsonResponse({'fulfillmentText': 'I am sorry, I did not '
                                                'understand that deadline. Please try saying it in a different way.'},
                            safe=False)

    if deadline_date < datetime.now():
        return JsonResponse({'fulfillmentText': 'I am sorry, you cannot change your deadline to the past. '
                                                'If this is not what you meant, make sure you include am or pm.'}, safe=False)

    niceTime = get_am_pm(deadline_date)

    # print(deadline_date)
    # print(niceTime)

    # print("deadline: ")
    # print(deadline_date)

    # print(asset.user_deadline)
    asset.user_deadline = deadline_date
    asset.save()

    out_date = deadline_date.strftime("%B %d %Y")
    out_date += " " + niceTime
    # print(out_date)
    return JsonResponse({'fulfillmentText': 'Ok, deadline for {} '
        
                                            'updated to {}.'.format(asset_name, out_date)}, safe=False)
def get_am_pm(deadline_date):
    twelvePM = datetime.strptime("12:00 pm", "%H:%M %p")

    # when subtracting datetimes, it results in a timedelta. This is a trick I found on
    # stackoverflow to get the time out of timedelta.
    if deadline_date.time() > twelvePM.time():
        time_delta = datetime.combine(date.today(), deadline_date.time()) \
                     - datetime.combine(date.today(), twelvePM.time())

        niceTime = (datetime.min + time_delta).time()
        niceTime = niceTime.strftime("%H:%M") + " PM"
    else:
        niceTime = deadline_date.strftime("%H:%M")
        niceTime += " AM"

    return niceTime

def update_to_tomorrow(asset, asset_name):
    user_deadline = asset.user_deadline
    deadline = datetime.combine((date.today() + timedelta(days=1)), user_deadline.time())

    nice_time = get_am_pm(deadline)

    out_date = deadline.strftime("%B %d %Y")
    out_date += " " + nice_time

    print(deadline)
    asset.user_deadline = deadline
    asset.save()

    return JsonResponse({'fulfillmentText': 'Ok, deadline for {} '
                                            'updated to tomorrow at {}.'.format(asset_name, nice_time)}, safe=False)