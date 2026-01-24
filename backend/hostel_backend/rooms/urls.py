from django.urls import path,include
from .views import AllottedStudentsListAPIView, AllotRoomAPIView, VacateRoomAPIView

urlpatterns = [
    path('allotted-students/', AllottedStudentsListAPIView.as_view()),
    path('allot-room/', AllotRoomAPIView.as_view()),
    path('vacate-room/', VacateRoomAPIView.as_view()),
]

