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
from core.models import Account, DoctorAccount, PatientAccount, MedicalRecord

# import serializers
from core.serializers import MedicalRecordSerializer

# To let a patient view his/her medical records
class PatientViewAllMedicalRecords(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=['HS256'])['user_id']
        account = Account.objects.get(id=id)
        patient = PatientAccount.objects.get(account=account)

        gen_med = MedicalRecord.objects.all().filter(patient=patient, department="General Medicine").order_by('date').reverse()
        ent = MedicalRecord.objects.all().filter(patient=patient, department="Ear, nose and throat (ENT)").order_by('date').reverse()
        dental = MedicalRecord.objects.all().filter(patient=patient, department="Dental").order_by('date').reverse()
        ophthalmology = MedicalRecord.objects.all().filter(patient=patient, department="Ophthalmology").order_by('date').reverse()
        cardiology = MedicalRecord.objects.all().filter(patient=patient, department="Cardiology").order_by('date').reverse()
        orthopedics = MedicalRecord.objects.all().filter(patient=patient, department="Orthopedics").order_by('date').reverse()
        pediatrics = MedicalRecord.objects.all().filter(patient=patient, department="Pediatrics").order_by('date').reverse()
        gynecology = MedicalRecord.objects.all().filter(patient=patient, department="Gynecology").order_by('date').reverse()
        dermatology = MedicalRecord.objects.all().filter(patient=patient, department="Dermatology").order_by('date').reverse()
        nutri_diet = MedicalRecord.objects.all().filter(patient=patient, department="Nutrition and Dietics").order_by('date').reverse()

        gen_med_serializer = MedicalRecordSerializer(gen_med, many=True)
        ent_serializer = MedicalRecordSerializer(ent, many=True)
        dental_serializer = MedicalRecordSerializer(dental, many=True)
        ophthalmology_serializer = MedicalRecordSerializer(ophthalmology, many=True)
        cardiology_serializer = MedicalRecordSerializer(cardiology, many=True)
        orthopedics_serializer = MedicalRecordSerializer(orthopedics, many=True)
        pediatrics_serializer = MedicalRecordSerializer(pediatrics, many=True)
        gynecology_serializer = MedicalRecordSerializer(gynecology, many=True)
        dermatology_serializer = MedicalRecordSerializer(dermatology, many=True)
        nutri_diet_serializer = MedicalRecordSerializer(nutri_diet, many=True)
        return Response({
            "gen_med" : gen_med_serializer.data,
            "ent" : ent_serializer.data,
            "dental" : dental_serializer.data,
            "ophthalmology" : ophthalmology_serializer.data,
            "cardiology" : cardiology_serializer.data,
            "orthopedics" : orthopedics_serializer.data,
            "pediatrics" : pediatrics_serializer.data,
            "gynecology" : gynecology_serializer.data,
            "dermatology" : dermatology_serializer.data,
            "nutri_diet" : nutri_diet_serializer.data
        })

# To let a patient view his/her medical records by doctor id
class PatientViewMedicalRecordsByDoctorId(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def get(self, request, id):
        doctor = DoctorAccount.objects.get(id=id)
        medical_records = MedicalRecord.objects.all().filter(doctor=doctor)
        serializer = MedicalRecordSerializer(data=medical_records)
        return Response(serializer.data)

# To let a patient view a particular medical record by id
class PatientViewMedicalRecordById(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def get(self, request, id):
        medical_record = MedicalRecord.objects.get(id=id)
        serializer = MedicalRecordSerializer(data=medical_record)
        return Response(serializer.data)
