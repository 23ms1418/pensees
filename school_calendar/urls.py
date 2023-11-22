from django.urls import path
from school_calendar import views

urlpatterns = [
    path("", views.index),
]