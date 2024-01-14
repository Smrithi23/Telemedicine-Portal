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
from core.models import Appointment

# import serializers
from core.serializers import AppointmentSerializer

# To let a patient book an appointment
class AttendPatient(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def get(self, request, appointment_id):
        appointment = Appointment.objects.get(id=appointment_id)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)
