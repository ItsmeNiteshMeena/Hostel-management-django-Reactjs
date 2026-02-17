from django.urls import path,include
from .views import AllottedStudentsListAPIView, AllotRoomAPIView, VacateRoomAPIView,StudentRoomAPIView,AdminDashboardStatsAPIView

urlpatterns = [
    path('allotted-students/', AllottedStudentsListAPIView.as_view()),
    path('allot-room/', AllotRoomAPIView.as_view()),
    path('vacate-room/', VacateRoomAPIView.as_view()),
    path('my-room/', StudentRoomAPIView.as_view()),
    path('admin-stats/', AdminDashboardStatsAPIView.as_view()),
]

