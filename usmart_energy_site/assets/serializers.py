from rest_framework import serializers
from .models import Asset
from users import serializers as user_serializers

class AssetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Asset 
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['owner'] = user_serializers.UserSerializer(instance.owner).data
        return response

# ^^^ pulled from JPG's answer on https://stackoverflow.com/questions/29950956/drf-simple-foreign-key-assignment-with-nested-serializers
