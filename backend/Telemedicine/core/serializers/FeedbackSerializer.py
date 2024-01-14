from core.models import Feedback, DoctorAccount, PatientAccount, Appointment
from rest_framework import serializers

# To view a medical record or a list of medical records
class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

# To let a doctor create a new medical record
class CreateFeedbackSerializer(serializers.ModelSerializer):
    appointment_id = serializers.CharField()
    doctor_id = serializers.CharField()
    patient_id = serializers.CharField()
    class Meta:
        model = Feedback
        fields = [
                    'doctor_id',
                    'patient_id',
                    'appointment_id',
                    'rating',
                    'feedback'
        ]
    def save(self):
        doctor = DoctorAccount.objects.get(id=self.validated_data["doctor_id"])
        patient = PatientAccount.objects.get(id=self.validated_data["patient_id"])
        appointment = Appointment.objects.get(id=self.validated_data["appointment_id"])
        feedback = Feedback(
            doctor = doctor,
            patient = patient,
            patient_first_name = patient.first_name,
            patient_last_name = patient.last_name,
            date = appointment.date,
            rating = self.validated_data["rating"],
            feedback = self.validated_data["feedback"]
        )
        feedback.save()
        return feedback
