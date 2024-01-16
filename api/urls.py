from django.urls import path
from api import views

urlpatterns = [
    path("chat", views.chat),
    path("autocomplete", views.autocomplete)
]
