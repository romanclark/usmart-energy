from rest_framework import serializers
from .models import Asset

class AssetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Asset 
        fields = ('asset_id','nickname', 'asset_type')