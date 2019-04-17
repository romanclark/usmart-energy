from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction 
        fields = ('transaction_id','buyer_asset_id', 'seller_asset_id','transaction_time', 'energy_sent', 'price_per_kwh')
