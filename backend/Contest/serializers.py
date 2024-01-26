from django.db.models import fields
from .models import Contest, Question
from rest_framework import serializers


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class ContestSerializer(serializers.ModelSerializer):
    courses = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Contest
        fields = '__all__'