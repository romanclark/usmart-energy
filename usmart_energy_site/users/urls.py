from django.urls import path

from . import views

urlpatterns = [
    path('api/asset_user/<uuid:asset_id>', views.asset_user),
    path('api/users/', views.users_list),
    path('api/users/<str:user_id>', views.users_detail),
    path('api/all_users/', views.all_users_list)
]
