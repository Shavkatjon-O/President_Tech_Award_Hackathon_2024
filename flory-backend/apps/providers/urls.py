from django.urls import path
from .views import ProviderListView, ProviderDetailView
from .models import MealListAPIView

urlpatterns = [
    path("", ProviderListView.as_view(), name="provider-list"),
    path("meals/<int:provider_id>/", MealListAPIView.as_view(), name="meal-list"),
    path("<int:pk>/", ProviderDetailView.as_view(), name="provider-detail"),
]
