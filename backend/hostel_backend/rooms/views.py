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
