from rest_framework import serializers
from core.models import Account

# To create an account for a doctor or a patient
class AccountSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = [
            'email',
            'password',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        account = Account(
            email=self.validated_data['email']
        )
        account.set_password(self.validated_data['password'])
        account.save()
        return account
