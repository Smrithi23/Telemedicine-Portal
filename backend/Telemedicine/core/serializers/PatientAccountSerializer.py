from core.models import PatientAccount, Account
from .AccountSerializer import AccountSerilizer
from rest_framework import serializers

# To store details when a patient registers
class PatientAccountSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    password = serializers.CharField()
    class Meta:
        model = PatientAccount
        fields = [
                    'email',
                    'first_name',
                    'last_name',
                    'gender',
                    'dob',
                    'occupation',
                    'nationality',
                    'height',
                    'weight',
                    'blood_group',
                    'pre_medical_conditions',
                    'surgeries_in_past',
                    'allergies',
                    'contact_number',
                    'home_address',
                    'profile_pic',
                    'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def save(self):
        account = Account(
            email=self.validated_data['email'],
        )
        account.set_password(self.validated_data['password'])
        account.save()
        patient = PatientAccount(
            account = account,
            first_name=self.validated_data['first_name'],
            last_name = self.validated_data['last_name'],
            gender = self.validated_data['gender'],
            dob = self.validated_data['dob'],
            occupation = self.validated_data['occupation'],
            height = self.validated_data['height'],
            weight = self.validated_data['weight'],
            blood_group = self.validated_data['blood_group'],
            pre_medical_conditions = self.validated_data['pre_medical_conditions'],
            surgeries_in_past = self.validated_data['surgeries_in_past'],
            allergies = self.validated_data['allergies'],
            nationality = self.validated_data['nationality'],
            contact_number = self.validated_data['contact_number'],
            home_address = self.validated_data['home_address'],
            profile_pic = self.validated_data['profile_pic']
        )
        patient.save()
        return account

# To store details when a patient registers
class UpdatePatientAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientAccount
        fields = [
                    'first_name',
                    'last_name',
                    'gender',
                    'dob',
                    'occupation',
                    'nationality',
                    'height',
                    'weight',
                    'blood_group',
                    'pre_medical_conditions',
                    'surgeries_in_past',
                    'allergies',
                    'contact_number',
                    'home_address',
                    'pre_medical_conditions',
                    'surgeries_in_past',
                    'allergies'
        ]
    def update(self, instance, validate_data):
        instance.first_name=self.validated_data['first_name']
        instance.last_name = self.validated_data['last_name']
        instance.gender = self.validated_data['gender']
        instance.dob = self.validated_data['dob']
        instance.occupation = self.validated_data['occupation']
        instance.height = self.validated_data['height']
        instance.weight = self.validated_data['weight']
        instance.blood_group = self.validated_data['blood_group']
        instance.pre_medical_conditions = self.validated_data['pre_medical_conditions']
        instance.surgeries_in_past = self.validated_data['surgeries_in_past']
        instance.allergies = self.validated_data['allergies']
        instance.nationality = self.validated_data['nationality']
        instance.contact_number = self.validated_data['contact_number']
        instance.home_address = self.validated_data['home_address']
        instance.save()
        return instance

# To store details when a patient registers
class UpdatePatientProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientAccount
        fields = [
                    'profile_pic'
        ]
    def update(self, instance, validate_data):
        instance.profile_pic=self.validated_data['profile_pic']
        instance.save()
        return instance

# To store details when a patient registers
class UpdatePatientPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = [
                    'password'
        ]
    def update(self, instance, validate_data):
        instance.set_password(self.validated_data["password"])
        instance.save()
        return instance

# To view patient profile
class PatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientAccount
        fields = [
            'first_name',
            'last_name',
            'gender',
            'dob',
            'occupation',
            'nationality',
            'height',
            'weight',
            'blood_group',
            'contact_number',
            'home_address',
            'profile_pic',
            'pre_medical_conditions',
            'surgeries_in_past',
            'allergies'
        ]

# To view patient details in dashboard
class PatientDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientAccount
        fields = [
            'first_name',
            'height',
            'weight',
            'blood_group',
            'profile_pic'
        ]

# To view medical info of patient
class PatientMedicalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientAccount
        fields = [
            'first_name',
            'last_name',
            'gender',
            'dob',
            'blood_group',
            'surgeries_in_past',
            'pre_medical_conditions',
            'allergies'
        ]
