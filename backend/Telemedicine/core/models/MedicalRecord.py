from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from .PatientAccount import PatientAccount
from .DoctorAccount import DoctorAccount
from .Appointment import Appointment

class MedicalRecord(models.Model):

    DEPARTMENT_CHOICES = [
        ('General Medicine', 'General Medicine'),
        ('Ear, nose and throat (ENT)', 'Ear, nose and throat (ENT)'),
        ('Dental', 'Dental'),
        ('Ophthalmology', 'Ophthalmology'),
        ('Cardiology', 'Cardiology'),
        ('Orthopedics', 'Orthopedics'),
        ('Pediatrics', 'Pediatrics'),
        ('Gynecology', 'Gynecology'),
        ('Dermatology', 'Dermatology'),
        ('Nutrition and Dietics', 'Nutrition and Dietics'),
    ]

    patient = models.ForeignKey(PatientAccount, on_delete=models.CASCADE)
    doctor = models.ForeignKey(DoctorAccount, on_delete=models.CASCADE)
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    department = models.CharField(choices=DEPARTMENT_CHOICES, max_length=100)
    specialization = models.CharField(max_length=300)
    doctor_first_name = models.CharField(max_length=100)
    doctor_last_name = models.CharField(max_length=100)
    patient_first_name = models.CharField(max_length=100)
    patient_last_name = models.CharField(max_length=100)
    symptoms = models.CharField(max_length=200)
    duration = models.CharField(max_length=200)
    height = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0.0), MaxValueValidator(12.0)], blank=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0.0), MaxValueValidator(700.0)], blank=True)
    temperature = models.DecimalField(max_digits=5, decimal_places=2, blank=True)
    pulse_rate = models.IntegerField()
    blood_pressure_systolic = models.IntegerField()
    blood_pressure_diastolic = models.IntegerField()
    date = models.DateField()
    hours = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(23)])
    minutes = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(30)])
    diagnosis = models.CharField(max_length=200)
    medical_treatment = models.CharField(max_length=200)
