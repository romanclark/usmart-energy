from assets.models import Asset
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import requests


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
    user_info = json.loads(response.content)
    user_id = user_info.get('sub')

    # Define paths for each action to follow
    if action == 'list_active':
        pass
    elif action == 'update_deadline':
        device = req.get('queryResult').get('parameters').get('device_nickname')
        deadline = req.get('queryResult').get('parameters').get('deadline')
        return update_deadline(user_id, device, deadline)

    # return a fulfillment message contiaining and Error message since no action was taken
    fulfillment_text = {'fulfillmentText': 'Please try again, we are unable to fulfill your request at this time'}
    # return response
    return JsonResponse(fulfillment_text, safe=False)


def active_devices(user_id):
    pass


def update_deadline(user_id, asset_name, deadline):
    try:
        asset = Asset.objects.get(owner=user_id, nickname=asset_name)
    except Asset.DoesNotExist:
        return JsonResponse({'fulfillmentText': 'Unable to find matching asset, please try again.'}, safe=False)

    asset.user_deadline = deadline
    asset.save()

    return JsonResponse({'fulfillmentText': 'Ok, deadline for {} updated.'.format(asset_name)}, safe=False)
