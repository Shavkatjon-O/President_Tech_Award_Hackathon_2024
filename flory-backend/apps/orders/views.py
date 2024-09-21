from django.shortcuts import render

# Create your views here.
from .serializers import OrderItemSerializer, OrderSerializer
from .models import Order, OrderItem

from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(user=user)


class OrderItemListView(generics.ListAPIView):
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        order_id = self.kwargs['order_id']
        # Ensure the order belongs to the authenticated user
        order = Order.objects.filter(id=order_id, user=user).first()
        if order:
            return OrderItem.objects.filter(order_items=order)
        else:
            return OrderItem.objects.none()  # Return an empty queryset if the order does not belong to the user
