from django.db import models
from apps.common.models import BaseModel
from apps.users.models import User
from apps.item.models import MenuItem


class Order(BaseModel):
    order_number = models.CharField(max_length=32, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    order_date = models.DateTimeField(auto_now_add=True)

    delivery_address = models.TextField()
    delivery_status = models.CharField(max_length=20, default="Pending")

    payment_method = models.CharField(max_length=20)
    payment_status = models.CharField(max_length=20, default="Pending")
    transaction_id = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.order_number

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_items"
    )
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    count = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.count} x {self.menu_item.name}"
