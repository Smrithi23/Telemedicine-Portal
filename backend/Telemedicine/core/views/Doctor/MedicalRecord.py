import jwt

# import from django
from django.conf import settings

# import from rest framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.generics import RetrieveUpdateAPIView

# import models
from core.models import Account, PatientAccount, Appointment, MedicalRecord, DoctorAccount

# import serializers
from core.serializers import CreateMedicalRecordSerializer, AppointmentSerializer, MedicalRecordSerializer, UpdateAppointmentSerializer, ViewDoctorDetails

# To let a doctor create a medical record for a particular appointment
class CreateMedicalRecord(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def post(self, request, appointment_id):
        medical_record = {}
        medical_record["appointment_id"] = appointment_id
        medical_record["diagnosis"] = request.data["diagnosis"]
        medical_record["medical_treatment"] = request.data["medication"]
        appointment = Appointment.objects.get(id=appointment_id)
        appointment_serializer = UpdateAppointmentSerializer(appointment, data={"active": 0})
        serializer = CreateMedicalRecordSerializer(data=medical_record)
        if appointment_serializer.is_valid():
            appointment_serializer.save()
        else:
            return Response({"message": "Failed to update appointment"})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Medical record saved successfully"})
        return Response(serializer.errors)

# To let a doctor view a medical record by its id
class ViewMedicalRecordById(RetrieveUpdateAPIView):

    permission_classes = (IsAuthenticated,)
    def get(self, request, id):
        medical_record = MedicalRecord.objects.get(id=id)
        serializer = MedicalRecordSerializer(medical_record)
        print(medical_record.doctor.id)
        doctor = DoctorAccount.objects.get(id=medical_record.doctor.id)
        doctor_serializer = ViewDoctorDetails(doctor)
        return Response({**serializer.data, **doctor_serializer.data})

# To let a doctor view a medical record by its id
class ViewMedicalRecords(RetrieveUpdateAPIView):

    permission_classes = (IsAuthenticated,)
    def get(self, request):
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=['HS256'])['user_id']
        account = Account.objects.get(id=id)
        doctor = DoctorAccount.objects.get(account=account)
        medical_record = MedicalRecord.objects.all().filter(doctor=doctor)
        serializer = MedicalRecordSerializer(medical_record, many=True)
        return Response(serializer.data)
