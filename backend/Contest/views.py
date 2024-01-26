from django.shortcuts import render
from .models import Contest, Question
from .serializers import ContestSerializer, QuestionSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
from rest_framework.authentication import TokenAuthentication

# Create your views here.

class WriteByAdminOnlyPermission(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if request.method=='GET':
            return True
        if request.method in ['POST', 'PUT', 'DELETE']:
            if user.is_superuser:
                return True
        return False

class ContestListView(generics.ListCreateAPIView):
    serializer_class = ContestSerializer
    queryset = Contest.objects.all()


class QuestionListView(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

class ContestDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ContestSerializer
    queryset = Contest.objects.all()

class QuestionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()