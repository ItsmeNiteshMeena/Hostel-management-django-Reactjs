from rest_framework import serializers
from .models import MessItem

class MessItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessItem
        fields = '__all__'

