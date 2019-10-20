from django.urls import path

from . import views

urlpatterns = [
    path('api/all_transactions/', views.all_transactions_list),
    path('api/transactions/', views.transactions_list),
    path('api/transactions_total/', views.transactions_total),
    path('api/transactions_total/<int:month>', views.transactions_total_month),
    path('api/transactions/<int:transaction_id>', views.transactions_detail),
    path('api/user_transactions/<str:user_id>', views.user_transactions),
    path('api/user_transaction_data/<str:user>', views.transaction_data_by_user),
    path('api/monthly_user_transactions/<str:user>/<int:month>', views.transactions_by_user_by_month),
    path('api/energy_total/<int:month>', views.energy_total),

    path('api/market_period_transactions/<is_with_grid>', views.market_period_transactions),
    path('api/all_market_period_transactions/<is_with_grid>', views.all_market_period_transactions),
    path('api/filter_transactions_list/<startTime>/<endTime>/<is_with_grid>/<purchased>',
        views.filter_transactions_list),
    path('api/transactions_stats/', views.transactions_stats),

]
