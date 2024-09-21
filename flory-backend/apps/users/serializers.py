from rest_framework import serializers
from apps.users.models import User


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "phone_number",
            "password",
            "address",
            "dob",
            "first_name",
            "last_name",
        ]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
