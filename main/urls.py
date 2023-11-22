from django.urls import path
from marrymeapp import views

urlpatterns = [
    path("", views.index),
    path("api/chat", views.chat)
]