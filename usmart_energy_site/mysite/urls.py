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
from django.conf.urls import url
from users import views as users_views
from assets import views as assets_views
from transactions import views as transactions_views

import marketplace.service as market_service

urlpatterns = [
    path('admin/', admin.site.urls),

    url(r'^api/user_assets/(?P<user_id>[0-9]+)$', assets_views.user_assets_list),

    url(r'^api/asset_user/(?P<asset_id>.+)$', users_views.asset_user),

    url(r'^api/users/$', users_views.users_list),
    url(r'^api/users/(?P<user_id>[0-9]+)$', users_views.users_detail),

    url(r'^api/assets/$', assets_views.assets_list),
    url(r'^api/assets/(?P<asset_id>.+)$', assets_views.assets_detail),

    url(r'^api/transactions/$', transactions_views.transactions_list),
    url(r'^api/transactions_total/$', transactions_views.transactions_total),
    url(r'^api/transactions_total/(?P<month>.+)$', transactions_views.transactions_total_month),
    url(r'^api/transactions/(?P<transaction_id>[0-9]+)$', transactions_views.transactions_detail),
    url(r'^api/user_transactions/(?P<user>[0-9]+)$', transactions_views.transactions_by_user),
    url(r'^api/monthly_user_transactions/(?P<user>[0-9]+)/(?P<month>[0-9]+)$', transactions_views.transactions_by_user_by_month),

    url(r'^api/energy_total/(?P<month>.+)$', transactions_views.energy_total)
]

# call to begin the service
market_service.start_service()
print("\t### Service has started, beginning server now...")
