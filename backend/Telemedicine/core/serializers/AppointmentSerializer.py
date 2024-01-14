from core.models import Appointment, Account, DoctorAccount, PatientAccount
from rest_framework import serializers

# To book an appointment
class BookAppointmentSerializer(serializers.ModelSerializer):
    doctor_id = serializers.CharField()
    patient_id = serializers.CharField()
    class Meta:
        model = Appointment
        fields = [
                    'doctor_id',
                    'patient_id',
                    'doctor_first_name',
                    'doctor_last_name',
                    'department',
                    'specialization',
                    'patient_first_name',
                    'patient_last_name',
                    'symptoms',
                    'duration',
                    'height',
                    'weight',
                    'temperature',
                    'pulse_rate',
                    'blood_pressure_systolic',
                    'blood_pressure_diastolic',
                    'date',
                    'hours',
                    'minutes',
                    'active',
        ]
    def save(self):
        doctor = DoctorAccount.objects.get(id=self.validated_data['doctor_id'])
        account = Account.objects.get(id=self.validated_data['patient_id'])
        patient = PatientAccount.objects.get(account=account)
        appointment = Appointment(
            patient = patient,
            doctor = doctor,
            patient_first_name = self.validated_data['patient_first_name'],
            patient_last_name = self.validated_data['patient_last_name'],
            doctor_first_name = self.validated_data['doctor_first_name'],
            doctor_last_name = self.validated_data['doctor_last_name'],
            department = self.validated_data['department'],
            specialization = self.validated_data['specialization'],
            symptoms = self.validated_data['symptoms'],
            duration = self.validated_data['duration'],
            height = self.validated_data['height'],
            weight = self.validated_data['weight'],
            temperature = self.validated_data['temperature'],
            pulse_rate = self.validated_data['pulse_rate'],
            blood_pressure_systolic = self.validated_data['blood_pressure_systolic'],
            blood_pressure_diastolic = self.validated_data['blood_pressure_diastolic'],
            date = self.validated_data['date'],
            hours = self.validated_data['hours'],
            minutes = self.validated_data['minutes'],
            active = self.validated_data['active'],
        )
        appointment.save()
        return appointment

# To view an appointment or a list of appointments
class ViewAppointmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorAccount
        fields = [
                    'first_name',
                    'last_name',
                    'specialization',
                    'nationality',
                    'start_hours',
                    'start_minutes',
                    'end_hours',
                    'end_minutes',
                    'profile_pic',
                    'id',
        ]

# To view an appointment or a list of appointments
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

# To store details when a patient registers
class UpdateAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
                    'active'
                 ]
    def update(self, instance, validate_data):
        instance.active=self.validated_data["active"]
        instance.save()
        return instance
