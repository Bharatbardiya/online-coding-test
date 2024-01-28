from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .models import Contest, Question
from .serializers import ContestSerializer, QuestionSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .services import run_code
import requests
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

# Create your views here.


token = "c3ee9e08-c2d1-4c37-accd-61ce35092c37"

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
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, WriteByAdminOnlyPermission]
    serializer_class = ContestSerializer
    queryset = Contest.objects.all()


class QuestionListView(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, WriteByAdminOnlyPermission]
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

class ContestDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, WriteByAdminOnlyPermission]
    serializer_class = ContestSerializer
    queryset = Contest.objects.all()

class QuestionDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, WriteByAdminOnlyPermission]
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()


class HelloView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] # <-------- Only authenticated users can access this view

    
    def get(self, request):
        
        context = {"detail":"PASS"} # <------ Response to the client
        
        return Response(context)


# @api_view(('GET',))
# @renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def runCode(request):
    print(request)
    #request.data.language, request.data.code
    # output = run_code("python", "print('hello world')")
    language = "python"
    code = "print('hello world')"
    
    '''
    curl --request POST \
        --header 'Authorization: Token <token>' \
        --header 'Content-type: application/json' \
        --data '{"files": [{"name": "main.py", "content": "print(42)"}]}' \
        --url 'https://glot.io/api/run/python/latest'
    '''
    headers = {'Authorization': f"Token {token}", 'Content-type': 'application/json'}
    data = {"files": [{"name": "main.py", "content": "print(42)"}]}
    # payload = {
    #     'language': data['language'],
    #     'code': data['code']
    # }
    url = f"https://glot.io/api/run/{language}/latest"
    response = requests.post(url, headers=headers, json=data).json()
    print(response)
    return JsonResponse(response)


    