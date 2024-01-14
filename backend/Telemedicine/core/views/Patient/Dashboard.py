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
from core.models import Account, PatientAccount, Appointment, MedicalRecord

# import serializers
from core.serializers import BookAppointmentSerializer, AppointmentSerializer, MedicalRecordSerializer, PatientDashboardSerializer

# To let a patient view all appointments booked by him/her
class PatientDashboard(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=['HS256'])['user_id']
        account = Account.objects.get(id=id)
        patient = PatientAccount.objects.get(account=account)
        patient_serializer = PatientDashboardSerializer(patient)
        appointments = Appointment.objects.all().filter(patient=patient, active=True).order_by('date').reverse()
        appointment_serializer = AppointmentSerializer(appointments, many=True)
        medical_records = MedicalRecord.objects.all().filter(patient=patient).order_by('date').reverse()
        medical_records_serializer = MedicalRecordSerializer(medical_records, many=True)
        recent_medical_records = []
        if len(medical_records) >= 3:
            recent_medical_records = [medical_records_serializer.data[0], medical_records_serializer.data[1], medical_records_serializer.data[2]]
        elif len(medical_records) == 2:
            recent_medical_records = [medical_records_serializer.data[0], medical_records_serializer.data[1]]
        elif len(medical_records) == 1:
            recent_medical_records = [medical_records_serializer.data[0]]
        else:
            recent_medical_records = []
        return Response({
            **patient_serializer.data,
            "appointments": appointment_serializer.data,
            "medical_records": recent_medical_records
        })
