from django.conf import settings
from django.db import models


class Room(models.Model):

    ROOM_TYPE = (
        ('single', 'Single'),
        ('double', 'Double'),
    )

    ROOM_STATUS = (
        ('available', 'Available'),
        ('allotted', 'Allotted'),
        ('cleaned', 'Cleaned'),
        ('dirty', 'Dirty'),
    )

    room_number = models.CharField(max_length=10, unique=True)
    room_type = models.CharField(max_length=10, choices=ROOM_TYPE)
    price = models.IntegerField()
    status = models.CharField(max_length=10, choices=ROOM_STATUS, default='available')

    def __str__(self):
        return f"{self.room_number} ({self.room_type})"


class RoomAllotment(models.Model):
    student = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'student'}
    )
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    allotment_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.student} → {self.room}"
