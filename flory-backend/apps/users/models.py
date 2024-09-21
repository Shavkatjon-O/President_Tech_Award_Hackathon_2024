from django.db import models
from django.contrib.auth.models import AbstractUser

from core.validators import phone_number_validators

from apps.common.models import BaseModel
from apps.users.managers import UserManager


class User(AbstractUser, BaseModel):
    username = None
    email = None

    address = models.CharField(max_length=256, default="Address")
    phone_number = models.CharField(max_length=64, unique=True)
    dob = models.CharField(max_length=64, default="Date of birth")

    REQUIRED_FIELDS = []
    USERNAME_FIELD = "phone_number"

    objects = UserManager()

    def __str__(self):
        return self.phone_number
