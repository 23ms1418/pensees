from django.shortcuts import render
from django.http import JsonResponse


def index(req):
    return render(req, "school_calendar.html")


def get_data(request):
    data = {'message': 'Hello from Django backend!'}
    return JsonResponse(data)
