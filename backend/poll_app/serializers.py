# serializers.py
from rest_framework import serializers
from .models import Survey, Question, SurveyResponse
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email','username', 'first_name', 'last_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class QuestionSerializer(serializers.ModelSerializer):
    answer_option = serializers.ListField(child=serializers.CharField(),required=False,allow_null=True)

    class Meta:
        model = Question
        fields = ['title', 'question_type', 'answer_option']

    def validate_question_type(self, value):
        allowed_types = ['single-choice', 'multiple-choice', 'text']
        if value not in allowed_types:
            raise serializers.ValidationError(f"Invalid question type: {value}. Must be one of {allowed_types}.")
        return value


class SurveySerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    name = serializers.CharField(max_length=255)

    class Meta:
        model = Survey
        fields = ['id','name', 'questions','created_at','status']

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')  # Extract questions data
        survey = Survey.objects.create(**validated_data)  # Create the Survey instance

        # Create each Question instance and associate it with the Survey
        for question_data in questions_data:
            Question.objects.create(survey=survey, **question_data)  # Assuming Question has a ForeignKey to Survey

        return survey


class SurveyResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyResponse
        fields = ['user', 'survey', 'responses', 'created_at']