from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction 
        fields = ('transaction_id', 'asset_id', 'transaction_time', 'energy_sent', 'price_per_kwh', 'purchased', 'is_with_grid')
