from django.db import models

class MessItem(models.Model):

    MEAL_TYPE = (
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
    )

    meal_type = models.CharField(max_length=10, choices=MEAL_TYPE)
    name = models.CharField(max_length=100)
    price = models.IntegerField()

    def __str__(self):
        return f"{self.meal_type} - {self.name}"

