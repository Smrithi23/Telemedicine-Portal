from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework import exceptions

# To let both doctors and patients login
class LoginSerializer(serializers.Serializer):
    username = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username", "")
        password = data.get("password", "")

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data["user"] = user
                else:
                    msg = "Account is disabled"
                    raise exceptions.ValidationError(msg)
            else:
                msg = "Unable to login with the given credentials."
                raise exceptions.ValidationError(msg)
        else:
            msg = "Must provide username and password"
            raise exceptions.ValidationError(msg)
        return data
