import jwt

# import from django
from django.conf import settings

# import from rest framework
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView

# import models
from core.models import Account, PatientAccount

# import serializers
from core.serializers import PatientProfileSerializer, UpdatePatientAccountSerializer, UpdatePatientProfilePicSerializer, UpdatePatientPasswordSerializer

# To let a patient view his/her profile
class PatientViewProfile(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes=(IsAuthenticated,)
    def get(self, request):
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=['HS256'])['user_id']
        account = Account.objects.get(id=id)
        patient = PatientAccount.objects.get(account=account)
        serializer = PatientProfileSerializer(patient)
        return Response({**serializer.data, "email": account.email})

# To let a patient update his/her profile
class UpdatePatientProfile(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes=(IsAuthenticated,)
    def post(self, request):
        data = request.data.copy()
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=["HS256"])["user_id"]
        account = Account.objects.get(id=id)
        patient = PatientAccount.objects.get(account=account)
        serializer = UpdatePatientAccountSerializer(patient, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Successfully updated profile"})
        return Response(serializer.errors)

# To let a patient update his/her profile
class UpdatePatientProfilePic(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes=(IsAuthenticated,)
    def post(self, request):
        data = request.data.copy()
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=["HS256"])["user_id"]
        account = Account.objects.get(id=id)
        patient = PatientAccount.objects.get(account=account)
        serializer = UpdatePatientProfilePicSerializer(patient, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Successfully updated profile"})
        return Response(serializer.errors)

# To let a patient update his/her profile
class UpdatePatientPassword(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes=(IsAuthenticated,)
    def post(self, request):
        data = request.data.copy()
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=["HS256"])["user_id"]
        account = Account.objects.get(id=id)
        serializer = UpdatePatientPasswordSerializer(account, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Successfully updated profile"})
        return Response(serializer.errors)
