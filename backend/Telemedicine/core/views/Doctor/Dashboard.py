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
from core.models import Account, DoctorAccount, Appointment, Feedback

# import serializers
from core.serializers import FeedbackSerializer, AppointmentSerializer, DoctorDashboardDetailsSerializer

# To let a patient view all appointments booked by him/her
class DoctorDashboard(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        id = jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=['HS256'])['user_id']
        account = Account.objects.get(id=id)
        doctor = DoctorAccount.objects.get(account=account)
        feedbacks = Feedback.objects.all().filter(doctor=doctor).order_by('date').reverse()
        feedback_serializer = FeedbackSerializer(feedbacks, many=True)
        appointments = Appointment.objects.all().filter(doctor=doctor, active=True).order_by('date').reverse()
        appointment_serializer = AppointmentSerializer(appointments, many=True)
        doctor_serializer = DoctorDashboardDetailsSerializer(doctor)
        return Response({
            "doctor" : doctor_serializer.data,
            "appointment" : appointment_serializer.data,
            "feedback" : feedback_serializer.data
        })
