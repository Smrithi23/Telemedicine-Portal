# import from django
from django.conf import settings

# import from rest framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView

# import models
from core.models import Appointment, MedicalRecord, PatientAccount

# import serializers
from core.serializers import AppointmentSerializer, MedicalRecordSerializer, PatientProfileSerializer

# To let a patient book an appointment
class PatientDetails(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def get(self, request, appointment_id, patient_id):
        appointment = Appointment.objects.get(id=appointment_id)
        appointment_serializer = AppointmentSerializer(appointment)
        patient = PatientAccount.objects.get(id=patient_id)
        patient_serializer = PatientProfileSerializer(patient)
        medical_records = MedicalRecord.objects.all().filter(patient=patient)
        medical_records_serializer = MedicalRecordSerializer(medical_records, many=True)
        return Response({
            "patient_details" : patient_serializer.data,
            "appointment_details" : appointment_serializer.data,
            "medical_record" : medical_records_serializer.data
        })
