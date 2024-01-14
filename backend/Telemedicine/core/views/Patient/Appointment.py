import jwt

from datetime import datetime, timedelta

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
from core.models import Account, PatientAccount, Appointment, DoctorAccount

# import serializers
from core.serializers import BookAppointmentSerializer, AppointmentSerializer, ViewAppointmentListSerializer, ViewDoctorDetails

# To let a patient book an appointment
class PatientBookAppointmentList(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def get(self, request):

        gen_med = DoctorAccount.objects.all().filter(department="General Medicine")
        ent = DoctorAccount.objects.all().filter(department="Ear, nose and throat (ENT)")
        dental = DoctorAccount.objects.all().filter(department="Dental")
        ophthalmology = DoctorAccount.objects.all().filter(department="Ophthalmology")
        cardiology = DoctorAccount.objects.all().filter(department="Cardiology")
        orthopedics = DoctorAccount.objects.all().filter(department="Orthopedics")
        pediatrics = DoctorAccount.objects.all().filter(department="Pediatrics")
        gynecology = DoctorAccount.objects.all().filter(department="Gynecology")
        dermatology = DoctorAccount.objects.all().filter(department="Dermatology")
        nutri_diet = DoctorAccount.objects.all().filter(department="Nutrition and Dietics")


        gen_med_serializer = ViewAppointmentListSerializer(gen_med, many=True)
        ent_serializer = ViewAppointmentListSerializer(ent, many=True)
        dental_serializer = ViewAppointmentListSerializer(dental, many=True)
        ophthalmology_serializer = ViewAppointmentListSerializer(ophthalmology, many=True)
        cardiology_serializer = ViewAppointmentListSerializer(cardiology, many=True)
        orthopedics_serializer = ViewAppointmentListSerializer(orthopedics, many=True)
        pediatrics_serializer = ViewAppointmentListSerializer(pediatrics, many=True)
        gynecology_serializer = ViewAppointmentListSerializer(gynecology, many=True)
        dermatology_serializer = ViewAppointmentListSerializer(dermatology, many=True)
        nutri_diet_serializer = ViewAppointmentListSerializer(nutri_diet, many=True)

        return Response({
            "gen_med": gen_med_serializer.data,
            "ent": ent_serializer.data,
            "dental": dental_serializer.data,
            "ophthalmology": ophthalmology_serializer.data,
            "cardiology": cardiology_serializer.data,
            "orthopedics": orthopedics_serializer.data,
            "pediatrics": pediatrics_serializer.data,
            "gynecology": gynecology_serializer.data,
            "dermatology": dermatology_serializer.data,
            "nutri_diet": nutri_diet_serializer.data
        })

# To let a patient book an appointment
class PatientViewBookAppointmentForm(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def get(self, request, id):
        doctor = DoctorAccount.objects.get(id=id)
        serializer = ViewDoctorDetails(doctor)
        start_hours = doctor.start_hours
        start_minutes = doctor.start_minutes
        end_hours = doctor.end_hours
        end_minutes = doctor.end_minutes

        time_slots = {}
        time_slots["day1"] = []
        time_slots["day2"] = []
        time_slots["day3"] = []
        time_slots["day4"] = []
        time_slots["day5"] = []
        time_slots["day6"] = []
        time_slots["day7"] = []
        day_no = 1
        while day_no <= 7:
            date = datetime.today() + timedelta(day_no)
            time_hours = start_hours
            index = 0;
            while time_hours < end_hours:
                app = Appointment.objects.filter(doctor=doctor, date=date, hours=time_hours, minutes=0).count()
                if not app:
                    app_slot = {}
                    app_slot["hours"] = time_hours
                    app_slot["minutes"] = "00"
                    if day_no == 1:
                        time_slots["day1"].append(app_slot)
                    elif day_no == 2:
                        time_slots["day2"].append(app_slot)
                    elif day_no == 3:
                        time_slots["day3"].append(app_slot)
                    elif day_no == 4:
                        time_slots["day4"].append (app_slot)
                    elif day_no == 5:
                        time_slots["day5"].append(app_slot)
                    elif day_no == 6:
                        time_slots["day6"].append(app_slot)
                    elif day_no == 7:
                        time_slots["day7"].append(app_slot)
                app = Appointment.objects.filter(doctor=doctor, date=date, hours=time_hours, minutes=30).count()
                if not app:
                    app_slot = {}
                    app_slot["hours"] = time_hours
                    app_slot["minutes"] = "30"
                    if day_no == 1:
                        time_slots["day1"].append(app_slot)
                    elif day_no == 2:
                        time_slots["day2"].append(app_slot)
                    elif day_no == 3:
                        time_slots["day3"].append(app_slot)
                    elif day_no == 4:
                        time_slots["day4"].append(app_slot)
                    elif day_no == 5:
                        time_slots["day5"].append(app_slot)
                    elif day_no == 6:
                        time_slots["day6"].append(app_slot)
                    elif day_no == 7:
                        time_slots["day7"].append(app_slot)
                time_hours = time_hours + 1
            day_no = day_no + 1
            if end_minutes == 30:
                app = Appointment.objects.filter(doctor=doctor, date=date, hours=end_hours, minutes=0).count()
                if not app:
                    app_slot = {}
                    app_slot["hours"] = time_hours
                    app_slot["minutes"] = "00"
                    if day_no == 1:
                        time_slots["day1"].append(app_slot)
                    elif day_no == 2:
                        time_slots["day2"].append(app_slot)
                    elif day_no == 3:
                        time_slots["day3"].append(app_slot)
                    elif day_no == 4:
                        time_slots["day4"].append(app_slot)
                    elif day_no == 5:
                        time_slots["day5"].append(app_slot)
                    elif day_no == 6:
                        time_slots["day6"].append(app_slot)
                    elif day_no == 7:
                        time_slots["day7"].append(app_slot)
        return Response({
            **serializer.data,
            "dates" : [
                        datetime.today() + timedelta(1),
                        datetime.today() + timedelta(2),
                        datetime.today() + timedelta(3),
                        datetime.today() + timedelta(4),
                        datetime.today() + timedelta(5),
                        datetime.today() + timedelta(6),
                        datetime.today() + timedelta(7)
                      ],
            "time_slots" : time_slots
        })

# To let a patient book an appointment
class BookAppointment(RetrieveUpdateAPIView):
    # Allow only authenticated users to access this url
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        data=request.data.copy()
        data["patient_id"]=jwt.decode(request.headers["Authorization"].split(' ')[1], settings.SECRET_KEY, algorithms=["HS256"])["user_id"]
        patient_account=Account.objects.get(id=data["patient_id"])
        doctor=DoctorAccount.objects.get(id=data["doctor_id"])
        data["active"]=True
        data["doctor_first_name"]=doctor.first_name
        data["doctor_last_name"]=doctor.last_name
        data["department"]=doctor.department
        data["specialization"]=doctor.specialization
        patient=PatientAccount.objects.get(account=patient_account)
        data["patient_first_name"]=patient.first_name
        data["patient_last_name"]=patient.last_name
        serializer = BookAppointmentSerializer(data=data)
        if serializer.is_valid():
            appointment = serializer.save()
            return Response({"message": "Successfully booked appointment"}, status=status.HTTP_200_OK)
        return Response(serializer.errors)
