# serializers.py
from rest_framework import serializers
from .models import Survey, Question, Choice, Response,Testing

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testing
        fields = ['id', 'first_name', 'last_name', 'age','std','marks']  # Add fields as needed


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text']


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'title', 'question_type', 'choices']


class SurveySerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Survey
        fields = ['id', 'name', 'status', 'created_at', 'questions']


class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = ['survey', 'question', 'response_text']
