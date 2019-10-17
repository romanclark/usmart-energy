from assets.models import Asset
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import requests
from datetime import datetime


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
        fulfillment_text = {'fulfillmentText': 'Something went wrong. Please make sure you have a linked account with us'}
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
        return update_deadline(user_id, device, deadline, text)
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


def update_deadline(user_id, asset_name, deadline, text):
    try:
        asset = Asset.objects.get(owner=user_id, nickname__iexact=asset_name, inactive=False)
    except Asset.DoesNotExist:
        return JsonResponse({'fulfillmentText': 'Unable to find matching asset, please try again.'}, safe=False)

    if "tomorrow" in text.lower():
        if "am" not in text.lower() and "pm" not in text.lower():
            return JsonResponse({'fulfillmentText': 'Unable to update the deadline, please specify a '
                                                    'time with am or pm.'}, safe=False)

    if type(deadline) is dict:
        dl_string = deadline['date_time']
    else:
        dl_string = deadline

    # When google is told a date and time, it sends it as a dictionary (No clue why)
    # So to ensure we get a datetime, I check to see if they sent us a dictionary, and
    # if they don't then I ask them to specify a day ^^

    # Here, we split on the T in the date-time that is sent to us, to parse the date
    split_dl = dl_string.split("T")

    # The time comes in a weird  HH:MM:SS-00.00 format, and we don't care about the stuff after the dash.
    time_split = split_dl[1].split("-")
    # Now get the hour, minute, and seconds to update later
    time_split = time_split[0].split(":")

    # Google always sends it in this format, for parse using this format and update
    date = datetime.strptime(split_dl[0], '%Y-%m-%d')

    date = date.replace(hour=int(time_split[0]), minute=int(time_split[1]), second=0, microsecond=0)

    print(date)
    print(datetime.now())
    if date < datetime.now():  # index in the dict to get the actual datetime
        return JsonResponse({'fulfillmentText': 'I am sorry, you cannot change your deadline to the past'}, safe=False)

    asset.user_deadline = date
    asset.save()

    return JsonResponse({'fulfillmentText': 'Ok, deadline for {} updated.'.format(asset_name)}, safe=False)
