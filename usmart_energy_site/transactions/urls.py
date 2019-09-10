from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^api/transactions/$', views.transactions_list),
    url(r'^api/transactions_total/$', views.transactions_total),
    url(r'^api/transactions_total/(?P<month>.+)$', views.transactions_total_month),
    url(r'^api/transactions/(?P<transaction_id>[0-9]+)$', views.transactions_detail),
    url(r'^api/user_transactions/(?P<user>[0-9]+)$', views.transactions_by_user),
    url(r'^api/monthly_user_transactions/(?P<user>[0-9]+)/(?P<month>[0-9]+)$', views.transactions_by_user_by_month),
    url(r'^api/energy_total/(?P<month>.+)$', views.energy_total),

    url(r'^api/market_period_transactions/(?P<numberOfMarketPeriods>.+)$', views.market_period_transactions),
]
