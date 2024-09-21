from django.urls import path
from .views import ItemListView, ItemDetailView

urlpatterns = [ 
    path('<int:item_id>/', ItemDetailView.as_view(), name='item-detail'),
    path('<int:provider_id>/items/', ItemListView.as_view(), name='item-list')
]

