from rest_framework.viewsets import ModelViewSet
from .models import Room
from .serializers import RoomSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from users.models import StudentProfile

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
from django.contrib.auth.models import User
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
