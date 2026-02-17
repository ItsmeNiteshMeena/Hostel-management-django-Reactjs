from rest_framework.viewsets import ModelViewSet
from .models import Room
from .serializers import RoomSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from users.models import StudentProfile
from rest_framework.permissions import IsAuthenticated

class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer





User = get_user_model()

@api_view(['POST'])
def allot_room(request):

    user = request.user

    profile, created = StudentProfile.objects.get_or_create(user=user)

    if profile.room:
        return Response(
            {"error": "Room already allotted"},
            status=400
        )

    room = Room.objects.filter(
        room_type='single',
        status='available'
    ).first()

    if not room:
        room = Room.objects.filter(
            room_type='double',
            status='available'
        ).first()

    if not room:
        return Response(
            {"error": "No rooms available"},
            status=400
        )

    room.status = 'allotted'
    room.save()

    profile.room = room
    profile.save()

    return Response({
        "message": "Room allotted successfully",
        "room_number": room.room_number,
        "room_type": room.room_type,
        "price": room.price
    })


from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAdminUser
from .models import RoomAllotment
from .serializers import AllottedStudentSerializer

class AllottedStudentsListAPIView(ListAPIView):
    queryset = RoomAllotment.objects.select_related('student', 'room')
    serializer_class = AllottedStudentSerializer
    permission_classes = [IsAdminUser]

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
# from django.contrib.auth.models import User
from .models import Room, RoomAllotment
from .serializers import RoomSerializer, AllottedStudentSerializer

class AllotRoomAPIView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        student_id = request.data.get('student_id')
        room_type = request.data.get('room_type')

        student = User.objects.get(id=student_id)

        if RoomAllotment.objects.filter(student=student).exists():
            return Response({"error": "Student already has a room"}, status=400)

        room = Room.objects.filter(
            room_type=room_type,
            status='available'
        ).first()

        if not room:
            return Response({"error": "No rooms available"}, status=400)

        RoomAllotment.objects.create(student=student, room=room)

        room.status = 'allotted'
        room.save()

        return Response({
            "message": "Room allotted successfully",
            "room_number": room.room_number
        })







from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .models import RoomAllotment

class VacateRoomAPIView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        allotment_id = request.data.get('allotment_id')

        allotment = RoomAllotment.objects.select_related('room').get(id=allotment_id)

        room = allotment.room

        # Step 1: Delete allotment
        allotment.delete()

        # Step 2: Update room status
        room.status = 'dirty'
        room.save()

        return Response({
            "message": "Room vacated successfully",
            "room_number": room.room_number,
            "new_status": room.status
        })


class StudentRoomAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            allotment = RoomAllotment.objects.select_related('room').get(student=request.user)

            return Response({
                "student": request.user.username,
                "room_number": allotment.room.room_number,
                "room_type": allotment.room.room_type,
                "price": allotment.room.price,
                "room_status": allotment.room.status,
                "allotment_date": allotment.allotment_date
            })

        except RoomAllotment.DoesNotExist:
            return Response({
                "message": "No room allotted yet"
            }, status=404)

from rest_framework.permissions import IsAdminUser
from django.db.models import Count, Sum
from django.contrib.auth.models import User

class AdminDashboardStatsAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        total_rooms = Room.objects.count()
        available_rooms = Room.objects.filter(status='available').count()
        allotted_rooms = Room.objects.filter(status='allotted').count()
        dirty_rooms = Room.objects.filter(status='dirty').count()

        total_students_allotted = RoomAllotment.objects.count()

        total_revenue = Room.objects.filter(status='allotted').aggregate(
            total=Sum('price')
        )['total'] or 0

        return Response({
            "total_rooms": total_rooms,
            "available_rooms": available_rooms,
            "allotted_rooms": allotted_rooms,
            "dirty_rooms": dirty_rooms,
            "total_students_allotted": total_students_allotted,
            "monthly_revenue": total_revenue
        })

from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework.permissions import AllowAny

class StudentRegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

User = get_user_model()
class StudentRegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = StudentRegisterSerializer
    permission_classes = [AllowAny]
