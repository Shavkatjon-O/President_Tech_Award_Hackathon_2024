from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .serializers import ItemSerializer
from .models import MenuItem
from apps.providers.models import Provider

class ItemListView(generics.ListAPIView):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        provider_id = self.kwargs['provider_id']

        provider = Provider.objects.filter(id=provider_id, user=user).first()
        if provider:
            return MenuItem.objects.filter(menu_items=provider)
        else:
            return MenuItem.objects.none()

class ItemDetailView(generics.RetrieveAPIView):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        item_id = self.kwargs['item_id']

        return MenuItem.objects.filter(id=item_id)