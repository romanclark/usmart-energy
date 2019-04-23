from transactions.models import Transaction

Transaction.objects.filter(transaction_time__range=["2019-04-23", "2019-05-02"]).delete()