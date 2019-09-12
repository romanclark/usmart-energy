from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^api/assets/$', views.assets_list),
    url(r'^api/assets/(?P<asset_id>.+)$', views.assets_detail),

    url(r'^api/user_assets/(?P<user_id>[0-9]+)$', views.user_assets_list),
]
