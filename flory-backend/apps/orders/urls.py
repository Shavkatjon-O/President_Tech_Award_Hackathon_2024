from django.urls import path
from .views import OrderItemListView, OrderDetailView

urlpatterns = [
    path('<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('<int:order_id>/items/', OrderItemListView.as_view(), name='order-item-list'),
]