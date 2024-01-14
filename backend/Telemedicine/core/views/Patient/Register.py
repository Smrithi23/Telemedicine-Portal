import jwt

# import from django
from django.conf import settings

#import from rest framework
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_jwt.serializers import jwt_payload_handler
from rest_framework.generics import RetrieveUpdateAPIView

# import serializers
from core.serializers import PatientAccountSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def patient_register(request):
    serializer = PatientAccountSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        account = serializer.save()
        data["response"] = "Successfully registered a new user"
        data["email"] = account.email
        payload = jwt_payload_handler(account)
        token = jwt.encode(payload, settings.SECRET_KEY)
        data["token"] = token
    else:
        data = serializer.errors
    return Response(data)
