from django.contrib import admin
from django.urls import path

from .views import ContestDetailView, ContestListView, QuestionDetailView, QuestionListView, Code_run, HelloView, Contest_questions
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('contest/', ContestListView.as_view()),
    path('question/', QuestionListView.as_view()),
    path('question/:<int:pk>', QuestionDetailView.as_view(), name='question-detail'),
    path('contest/:<int:pk>', ContestDetailView.as_view(),
        name='contest-detail'),
    path('contest_question/:<int:id>', Contest_questions.as_view()),
    path('auth/login/', obtain_auth_token,name='create-token'),
    path("api-token-auth", HelloView.as_view()),
    
    path('run-code/', Code_run.as_view())
]