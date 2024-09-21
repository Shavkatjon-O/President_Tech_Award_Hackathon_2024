from django.db import models
from apps.common.models import BaseModel
from apps.providers.models import Provider


class MenuItem(BaseModel):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="menu_items/images/")

    calories = models.IntegerField()
    proteins = models.FloatField()
    fats = models.FloatField()
    carbohydrates = models.FloatField()

    ingredients = models.TextField()

    price = models.DecimalField(max_digits=10, decimal_places=2)
    available = models.BooleanField(default=True)

    preparation_time = models.IntegerField()

    provider = models.ForeignKey(
        Provider, on_delete=models.CASCADE, related_name="menu_items"
    )

    def __str__(self):
        return f"{self.provider} - {self.name}"

    class Meta:
        verbose_name = "Item"
        verbose_name_plural = "Items"
