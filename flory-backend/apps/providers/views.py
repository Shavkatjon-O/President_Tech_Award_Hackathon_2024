from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import ProviderSerializer
from .models import Provider


class ProviderListView(generics.ListAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer
    permission_classes = [IsAuthenticated]


class ProviderDetailView(generics.RetrieveAPIView):
    serializer_class = ProviderSerializer
    permission_classes = [IsAuthenticated]
    queryset = Provider.objects.all()
