from django.urls import path

from . import views

urlpatterns = [
    path('api/assets/', views.assets_list),
    path('api/assets/<uuid:asset_id>', views.assets_detail),
    path('api/user_assets/<str:user_id>', views.user_assets_list),
    path('api/all_assets/', views.all_assets_list)
]
