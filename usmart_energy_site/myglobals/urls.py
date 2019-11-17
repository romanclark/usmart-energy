from django.urls import path

from . import views

urlpatterns = [
    path('api/marketplace/<str:command>', views.marketplace_control),
    path('api/marketplace/', views.get_market_time),
    path('api/marketplace_check/', views.get_market_running),
    path('api/reset_market/', views.reset_simulation),
    path('api/run_market/<str:market_period>', views.run_market)
]