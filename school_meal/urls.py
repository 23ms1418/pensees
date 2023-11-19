from django.urls import path
from school_meal import views

urlpatterns = [
    path("", views.index),
]