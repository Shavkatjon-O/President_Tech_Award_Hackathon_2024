from django.core import validators
from django.utils.deconstruct import deconstructible
from django.utils.translation import gettext_lazy as _


@deconstructible
class PhoneNumberValidator(validators.RegexValidator):
    regex = r"^\+998\d{9}$"
    message = _(
        "Phone number must be entered in a valid format.",
    )


phone_number_validators = [PhoneNumberValidator()]
