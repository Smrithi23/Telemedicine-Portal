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
from core.models import PatientAccount, DoctorAccount, Appointment

# import serializers
from core.serializers import CreateFeedbackSerializer

# To let a doctor create a medical record for a particular appointment
class CreateFeedback(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def post(self, request, doctor_id, patient_id, appointment_id):
        feedback = {}
        feedback["doctor_id"] = doctor_id
        feedback["patient_id"] = patient_id
        feedback["appointment_id"] = appointment_id
        feedback["feedback"] = request.data["feedback"]
        feedback["rating"] = request.data["rating"]
        serializer = CreateFeedbackSerializer(data=feedback)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Feedback saved successfully"})
        return Response(serializer.errors)
