from django.db import models
from apps.common.models import BaseModel


class Provider(BaseModel):
    title = models.CharField(max_length=256)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    image = models.ImageField(upload_to="providers/images", blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    phone_number = models.CharField(max_length=32, null=True, blank=True)
    working_hours = models.CharField(max_length=128, null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Provider"
        verbose_name_plural = "Providers"


class Meal(BaseModel):
    title = models.CharField(max_length=256)

    description = models.TextField(null=True, blank=True)

    price = models.DecimalField(max_digits=10, decimal_places=2)

    provider = models.ForeignKey(
        Provider, on_delete=models.CASCADE, related_name="meals"
    )

    image = models.ImageField(upload_to="meals/images", blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Meal"
        verbose_name_plural = "Meals"


from rest_framework import serializers, generics


class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = "__all__"


class MealListAPIView(generics.ListAPIView):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

    def get_queryset(self):
        provider_id = self.request.query_params.get("provider_id")
        if provider_id:
            return Meal.objects.filter(provider_id=provider_id)
        return Meal.objects.all()
