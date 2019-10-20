from django.urls import path

from . import views

urlpatterns = [
    path('api/marketplace/<str:command>', views.marketplace_control),
    path('api/marketplace/', views.get_market_time),
    path('api/marketplace_check/', views.get_market_running)
]