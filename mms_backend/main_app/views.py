
from rest_framework.authentication import BasicAuthentication
from rest_framework.viewsets import ModelViewSet

from .models import User, Customer
from .serializers import UserSerializer, CustomerSerializer
from .view_auth import handle_login
from .view_send_texts import send_text_reminders

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(
            proprietor=self.request.user.id
        )

    def create(self, request, *args, **kwargs):
        # update request to include user foreign key
        request.data.update({"proprietor": request.user.id})
        return super().create(request, args, kwargs)

    def patch(self, request, *args, **kwargs):
        print(f'\n\n\n\n\n------{request}------\n\n\n\n\n')
        return super().patch(request, args, kwargs)

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [BasicAuthentication]

@csrf_exempt
def test(request):
    body = request.user.id
    print(f'\n\n\n\n\n------{body}------\n\n\n\n\n')
    return HttpResponse(request)

