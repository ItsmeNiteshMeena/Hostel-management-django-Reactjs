from rest_framework import serializers
from .models import Room, RoomAllotment
from users.models import User

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class AllottedStudentSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.username', read_only=True)
    room_number = serializers.IntegerField(source='room.room_number', read_only=True)
    room_type = serializers.CharField(source='room.room_type', read_only=True)
    price = serializers.IntegerField(source='room.price', read_only=True)
    room_status = serializers.CharField(source='room.status', read_only=True)

    class Meta:
        model = RoomAllotment
        fields = [
            'id',
            'student_name',
            'room_number',
            'room_type',
            'price',
            'room_status',
            'allotment_date'
        ]
