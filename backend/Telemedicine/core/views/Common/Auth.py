import jwt

# import from django
from django.conf import settings

# import from rest framework
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework_jwt.serializers import jwt_payload_handler
from rest_framework.generics import RetrieveUpdateAPIView

# import models
from core.models import Account, PatientAccount, DoctorAccount

class DoctorAuth(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=['HS256'])['user_id']
        account = Account.objects.get(id=id)
        if(account.is_staff):
            return Response({"message": "true"})
        else:
            return Response({"message": "false"})

class PatientAuth(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=['HS256'])['user_id']
        account = Account.objects.get(id=id)
        if(account.is_staff):
            return Response({"message": "false"})
        else:
            return Response({"message": "true"})
