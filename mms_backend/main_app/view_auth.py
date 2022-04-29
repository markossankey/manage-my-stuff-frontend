from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
import json
from django.http.response import JsonResponse
from .models import User

@csrf_exempt
def handle_login(request):

    body = json.loads(request.body)
    profile_data = {
        'username': body['googleId'],
        'email': body['email'],
        'first_name': body['givenName'],
        'last_name': body['familyName'],
        'password': ''
    }


    user, created = User.objects.get_or_create(**profile_data)
    print(f'\n\n\n\n\n------test{user, created}------\n\n\n\n\n')
    # authenticated_user = authenticate(request=request, username=profile_data['username'], password=profile_data['password'])
    # if authenticated_user:
    login(request, user)
    print(f'\n\n\n\n\n------{"logged in"}------\n\n\n\n\n')
    # user = authenticate(request, username=body.get('username'), password=body.get('password'))
    # if user:
        # login(request, user)
        # print(f'\n\n\n\n\n------user:{user}------\n\n\n\n\n')
        # data = {
        #         'username': user.username,
        #         'id': user.id 
        #         }
    email = {
        'email': user.email
    }
    return JsonResponse(data=email, status=200)
    


@csrf_exempt
def handle_logout(request):
    print(f'\n\n\n\n\n------{request.user}------\n\n\n\n\n') 
    logout(request)
    print(f'\n\n\n\n\n------{"logged out"}------\n\n\n\n\n')
    return JsonResponse(data={'message': 'Successful Logout'}, status=200)