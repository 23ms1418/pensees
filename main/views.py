from django.shortcuts import render, HttpResponse


def index(req):
    return render(req, "main.html")


def chat(req):
    print(req)
    return HttpResponse("no")
