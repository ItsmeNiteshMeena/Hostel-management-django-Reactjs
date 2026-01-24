from django.contrib.auth.models import AbstractUser
from django.db import models
from rooms.models import Room
from django.conf import settings

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('student', 'Student'),
    )

    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='student'
    )

    def __str__(self):
        return self.username



class StudentProfile(models.Model):
    user = models.OneToOneField(

        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    room = models.OneToOneField(
        Room,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.user.username