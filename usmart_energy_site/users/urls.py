from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^api/asset_user/(?P<asset_id>.+)$', views.asset_user),

    url(r'^api/users/$', views.users_list),
    url(r'^api/users/(?P<user_id>[0-9]+)$', views.users_detail),
]