from django.urls import path, include
from rest_framework import routers

from main_app.view_auth import handle_login, handle_logout
from .views import UserViewSet, CustomerViewSet, test, send_text_reminders

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('customers', CustomerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('test', test, name="test"),
    path('login', handle_login, name='login'),
    path('logout', handle_logout, name='logout'),
    path('send-texts', send_text_reminders, name="send_texts" )

]