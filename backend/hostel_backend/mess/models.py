from django.db import models

class MessMenu(models.Model):
    day = models.CharField(max_length=10)
    breakfast = models.CharField(max_length=100)
    lunch = models.CharField(max_length=100)
    dinner = models.CharField(max_length=100)

    def __str__(self):
        return self.day
