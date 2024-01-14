import jwt

# import from django
from django.conf import settings
from django.contrib.auth import authenticate

# import from rest framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_jwt.serializers import jwt_payload_handler

# To let a patient login
@api_view(['POST'])
@permission_classes([AllowAny])
def patient_login(request):
    email = request.data['email']
    password = request.data['password']
    account = authenticate(email=email, password=password)
    if account and account.is_staff == 0:
        try:
            payload = jwt_payload_handler(account)
            token = jwt.encode(payload, settings.SECRET_KEY)
            account_details = {}
            account_details['email'] = account.email
            account_details['token'] = token
            return Response(account_details, status=status.HTTP_200_OK)

        except Exception as e:
            raise e
    else:
        res = {'error': 'can not authenticate with the given credentials or the account has been deactivated'}
        return Response(res, status=status.HTTP_403_FORBIDDEN)
