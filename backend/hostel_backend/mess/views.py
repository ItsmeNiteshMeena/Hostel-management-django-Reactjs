from rest_framework.viewsets import ModelViewSet
from .models import MessMenu
from .serializers import MessMenuSerializer

class MessMenuViewSet(ModelViewSet):
    queryset = MessMenu.objects.all()
    serializer_class = MessMenuSerializer
