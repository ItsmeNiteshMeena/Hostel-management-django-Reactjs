from django.urls import path
from .views import allot_room

urlpatterns = [
    path('allot/', allot_room),
]
