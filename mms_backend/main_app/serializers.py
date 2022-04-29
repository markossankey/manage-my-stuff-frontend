from rest_framework.serializers import ModelSerializer, CharField, EmailField
from .models import User, Customer

class UserSerializer(ModelSerializer):
    
    password = CharField(write_only=True)
    email = EmailField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'customers', 'email']
        depth = 1

class CustomerSerializer(ModelSerializer):
    # proprietor = CharField(source='proprietor.username')
    class Meta:
        model = Customer
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'proprietor']
