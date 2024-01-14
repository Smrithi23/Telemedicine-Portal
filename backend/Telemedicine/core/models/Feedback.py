from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from .PatientAccount import PatientAccount
from .DoctorAccount import DoctorAccount

class Feedback(models.Model):

    patient = models.ForeignKey(PatientAccount, on_delete=models.CASCADE)
    doctor = models.ForeignKey(DoctorAccount, on_delete=models.CASCADE)
    patient_first_name = models.CharField(max_length=100)
    patient_last_name = models.CharField(max_length=100)
    date = models.DateField()
    feedback = models.CharField(max_length=200)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
