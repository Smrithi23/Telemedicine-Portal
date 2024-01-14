# import from django
from django.urls import re_path
from django.urls import path

# import views
from core import views

urlpatterns = [
    path('doctor/register/', views.doctor_register),
    path('doctor/login/', views.doctor_login),
    path('doctor/auth/', views.DoctorAuth.as_view()),
    path('doctor/dashboard/', views.DoctorDashboard.as_view()),
    path('doctor/profile/', views.DoctorViewProfile.as_view()),
    path('doctor/attendpatient/<int:appointment_id>/', views.AttendPatient.as_view()),
    path('doctor/patientdetails/<int:appointment_id>/<int:patient_id>/', views.PatientDetails.as_view()),
    path('doctor/createmedicalrecord/<int:appointment_id>/', views.CreateMedicalRecord.as_view()),
    path('doctor/updateprofile/', views.UpdateDoctorProfile.as_view()),
    path('doctor/updateprofilepic/', views.UpdateDoctorProfilePic.as_view()),
    path('doctor/updatepassword/', views.UpdateDoctorPassword.as_view()),
    path('doctor/medicalrecords/', views.ViewMedicalRecords.as_view()),
    path('medicalrecords/<int:id>/', views.ViewMedicalRecordById.as_view()),
    path('patient/register/', views.patient_register),
    path('patient/login/', views.patient_login),
    path('patient/auth/', views.PatientAuth.as_view()),
    path('patient/dashboard/', views.PatientDashboard.as_view()),
    path('patient/profile/', views.PatientViewProfile.as_view()),
    path('patient/updateprofile/', views.UpdatePatientProfile.as_view()),
    path('patient/updateprofilepic/', views.UpdatePatientProfilePic.as_view()),
    path('patient/updatepassword/', views.UpdatePatientPassword.as_view()),
    path('patient/medicalrecords/', views.PatientViewAllMedicalRecords.as_view()),
    path('patient/doctor/bookappointment/', views.BookAppointment.as_view()),
    path('patient/doctors/', views.PatientBookAppointmentList.as_view()),
    path('patient/doctor/<int:id>/', views.PatientViewBookAppointmentForm.as_view()),
    path('patient/feedback/<int:appointment_id>/<int:doctor_id>/<int:patient_id>/', views.CreateFeedback.as_view()),
]
