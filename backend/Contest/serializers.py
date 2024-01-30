from django.db.models import fields
from django.db import models
from .models import Contest, Question
from rest_framework import serializers


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class ContestSerializer(serializers.ModelSerializer):
    # courses = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Contest
        fields = '__all__'

class UserSerializer():
    
    username = models.CharField(max_length=40)
    email = models.EmailField()
    last_name = models.CharField(max_length=40)
    first_name = models.CharField(max_length=40)
    