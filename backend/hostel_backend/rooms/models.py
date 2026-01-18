from django.db import models

class Room(models.Model):
    room_number = models.CharField(max_length=10)
    capacity = models.IntegerField()
    occupied = models.IntegerField(default=0)

    def __str__(self):
        return self.room_number
