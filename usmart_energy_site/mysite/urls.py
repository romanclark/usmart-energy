"""usmart_energy_site URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from users import views as users_views
from assets import views as assets_views
from devices import views as devices_views
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/users/$', users_views.users_list),
    url(r'^api/users/(?P<user_id>[0-9]+)$', users_views.users_detail),

    url(r'^api/assets/$', assets_views.assets_list),
    url(r'^api/assets/(?P<asset_id>[0-9]+)$', assets_views.assets_detail),

    url(r'^api/devices/$', devices_views.devices_list),
    url(r'^api/devices/(?P<device_id>[0-9]+)$', devices_views.devices_detail),
]