from core.models import MedicalRecord, Account, DoctorAccount, PatientAccount, Appointment
from rest_framework import serializers

# To let a doctor create a new medical record
class CreateMedicalRecordSerializer(serializers.ModelSerializer):
    appointment_id = serializers.CharField()
    class Meta:
        model = MedicalRecord
        fields = [
                    'appointment_id',
                    'diagnosis',
                    'medical_treatment'
        ]
    def save(self):
        appointment = Appointment.objects.get(id=self.validated_data['appointment_id'])
        patient = appointment.patient
        doctor = appointment.doctor
        medical_record = MedicalRecord(
            patient = appointment.patient,
            doctor = appointment.doctor,
            appointment = appointment,
            department = appointment.department,
            specialization = appointment.specialization,
            doctor_first_name = appointment.doctor_first_name,
            doctor_last_name = appointment.doctor_last_name,
            patient_first_name = appointment.patient_first_name,
            patient_last_name = appointment.patient_last_name,
            symptoms = appointment.symptoms,
            duration = appointment.duration,
            height = appointment.height,
            weight = appointment.weight,
            temperature = appointment.temperature,
            pulse_rate = appointment.pulse_rate,
            blood_pressure_systolic = appointment.blood_pressure_systolic,
            blood_pressure_diastolic = appointment.blood_pressure_diastolic,
            date = appointment.date,
            hours = appointment.hours,
            minutes = appointment.minutes,
            diagnosis = self.validated_data['diagnosis'],
            medical_treatment = self.validated_data['medical_treatment']
        )
        medical_record.save()
        return medical_record

# To view a medical record or a list of medical records
class MedicalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecord
        fields = '__all__'
