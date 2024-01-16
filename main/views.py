from django.shortcuts import render


def index(req):
    return render(req, "main.html")
