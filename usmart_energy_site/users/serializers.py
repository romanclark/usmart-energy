from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User 
        # fields = ('user_id','first_name', 'last_name', 'email', 'street', 'city', 'state', 'zipcode', 'latitude', 'longitude', 'createdAt', 'inactive')
        fields = '__all__'
