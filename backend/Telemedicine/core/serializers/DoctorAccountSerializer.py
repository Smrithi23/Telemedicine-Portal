from core.models import DoctorAccount, Account
from rest_framework import serializers
from .AccountSerializer import AccountSerilizer

# To store details when a doctor registers
class DoctorAccountSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    password = serializers.CharField()
    class Meta:
        model = DoctorAccount
        fields = [
                    'email',
                    'first_name',
                    'last_name',
                    'gender',
                    'dob',
                    'department',
                    'specialization',
                    'registration_number',
                    'years_of_experience',
                    'hospital',
                    'hospital_address',
                    'start_hours',
                    'start_minutes',
                    'end_hours',
                    'end_minutes',
                    'nationality',
                    'home_address',
                    'contact_number',
                    'profile_pic',
                    'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def save(self):
        account = Account(
            email=self.validated_data["email"],
            is_staff=1
        )
        account.set_password(self.validated_data["password"])
        account.save()
        doctor = DoctorAccount(
            account = account,
            first_name=self.validated_data["first_name"],
            last_name = self.validated_data["last_name"],
            gender = self.validated_data["gender"],
            dob = self.validated_data["dob"],
            department = self.validated_data["department"],
            specialization = self.validated_data["specialization"],
            registration_number = self.validated_data["registration_number"],
            years_of_experience = self.validated_data["years_of_experience"],
            hospital = self.validated_data["hospital"],
            hospital_address = self.validated_data["hospital_address"],
            start_hours = self.validated_data["start_hours"],
            start_minutes = self.validated_data["start_minutes"],
            end_hours = self.validated_data["end_hours"],
            end_minutes = self.validated_data["end_minutes"],
            nationality = self.validated_data["nationality"],
            contact_number = self.validated_data["contact_number"],
            home_address = self.validated_data["home_address"],
            profile_pic = self.validated_data["profile_pic"]
        )
        doctor.save()
        return account

# To store details when a doctor registers
class ViewDoctorDetails(serializers.ModelSerializer):
    class Meta:
        model = DoctorAccount
        fields = [
                    'first_name',
                    'last_name',
                    'gender',
                    'dob',
                    'department',
                    'specialization',
                    'registration_number',
                    'years_of_experience',
                    'hospital',
                    'hospital_address',
                    'start_hours',
                    'start_minutes',
                    'end_hours',
                    'end_minutes',
                    'nationality',
                    'home_address',
                    'contact_number',
                    'profile_pic'
        ]

class UpdateDoctorAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorAccount
        fields = [
                    'first_name',
                    'last_name',
                    'gender',
                    'dob',
                    'department',
                    'specialization',
                    'registration_number',
                    'years_of_experience',
                    'hospital',
                    'hospital_address',
                    'start_hours',
                    'start_minutes',
                    'end_hours',
                    'end_minutes',
                    'nationality',
                    'home_address',
                    'contact_number',
        ]
    def update(self, instance, validated_data):
        instance.first_name = self.validated_data["first_name"]
        instance.last_name = self.validated_data["last_name"]
        instance.gender = self.validated_data["gender"]
        instance.dob = self.validated_data["dob"]
        instance.department = self.validated_data["department"]
        instance.specialization = self.validated_data["specialization"]
        instance.registration_number = self.validated_data["registration_number"]
        instance.years_of_experience = self.validated_data["years_of_experience"]
        instance.hospital = self.validated_data["hospital"]
        instance.hospital_address = self.validated_data["hospital_address"]
        instance.start_hours = self.validated_data["start_hours"]
        instance.start_minutes = self.validated_data["start_minutes"]
        instance.end_hours = self.validated_data["end_hours"]
        instance.end_minutes = self.validated_data["end_minutes"]
        instance.nationality = self.validated_data["nationality"]
        instance.home_address = self.validated_data["home_address"]
        instance.contact_number = self.validated_data["contact_number"]
        instance.save()
        return instance

class UpdateDoctorProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorAccount
        fields = [
                    'profile_pic'
        ]
    def update(self, instance, validated_data):
        instance.profile_pic = self.validated_data["profile_pic"]
        instance.save()
        return instance

class UpdateDoctorPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = [
                    'password'
        ]
    def update(self, instance, validated_data):
        instance.set_password(self.validated_data["password"])
        instance.save()
        return instance

# To view an appointment or a list of appointments
class DoctorDashboardDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorAccount
        fields = [
            'first_name',
            'profile_pic'
        ]
