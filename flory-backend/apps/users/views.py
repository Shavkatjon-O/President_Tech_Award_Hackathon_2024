from rest_framework.generics import CreateAPIView

from apps.users.serializers import UserCreateSerializer
from apps.users.models import User


class UserCreateView(CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()
