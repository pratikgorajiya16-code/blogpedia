from django.urls import path
from . import views


urlpatterns = [
    path('',views.login, name='Login'),
    path('signup/',views.signup,name="Sign up")
]