from rest_framework.viewsets import ModelViewSet
from .models import MessItem
from .serializers import MessItemSerializer

class MessMenuViewSet(ModelViewSet):
    queryset = MessItem.objects.all()
    serializer_class = MessItemSerializer
