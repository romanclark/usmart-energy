from rest_framework import serializers
from .models import Transaction
from assets import serializers as asset_serializers

class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        # fields = ('transaction_id', 'asset_id', 'transaction_time', 'energy_sent', 'price_per_kwh', 'purchased', 'is_with_grid')
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['asset_id'] = asset_serializers.AssetSerializer(instance.asset_id).data
        return response

# ^^^ pulled from JPG's answer on https://stackoverflow.com/questions/29950956/drf-simple-foreign-key-assignment-with-nested-serializers
