import jwt

# import from django
from django.conf import settings

# import from rest framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.generics import RetrieveUpdateAPIView

# import from models
from core.models import DoctorAccount, Account

# import from serializers
from core.serializers import DoctorAccountSerializer, ViewDoctorDetails, UpdateDoctorAccountSerializer, UpdateDoctorProfilePicSerializer, UpdateDoctorPasswordSerializer

# To let a doctor view his/her profile
class DoctorViewProfile(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes=(IsAuthenticated,)
    def get(self, request):
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=['HS256'])['user_id']
        account = Account.objects.get(id=id)
        doctor = DoctorAccount.objects.get(account=account)
        serializer = ViewDoctorDetails(doctor)
        return Response({**serializer.data, "email": account.email})

# To let a doctor update his/her profile
class UpdateDoctorProfile(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes=(IsAuthenticated,)
    def post(self, request):
        data = request.data.copy()
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=["HS256"])["user_id"]
        account = Account.objects.get(id=id)
        doctor = DoctorAccount.objects.get(account=account)
        serializer = UpdateDoctorAccountSerializer(doctor, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Successfully updated profile"})
        return Response(serializer.errors)

# To let a doctor update his/her profile
class UpdateDoctorProfilePic(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes=(IsAuthenticated,)
    def post(self, request):
        data = request.data.copy()
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=["HS256"])["user_id"]
        account = Account.objects.get(id=id)
        doctor = DoctorAccount.objects.get(account=account)
        serializer = UpdateDoctorProfilePicSerializer(doctor, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Successfully updated profile"})
        return Response(serializer.errors)

# To let a doctor update his/her profile
class UpdateDoctorPassword(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes=(IsAuthenticated,)
    def post(self, request):
        data = request.data.copy()
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=["HS256"])["user_id"]
        account = Account.objects.get(id=id)
        serializer = UpdateDoctorPasswordSerializer(account, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Successfully updated profile"})
        return Response(serializer.errors)
