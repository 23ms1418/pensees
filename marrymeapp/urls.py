from django.urls import path
from marrymeapp import views

urlpatterns = [
    path("", views.index),
    path("api/chat", views.chat)
]

# 주석 해제시 브라우저에서 /static/파일 에 가면 파일 확인 가능

# from django.conf import settings
# from django.conf.urls.static import static
# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
