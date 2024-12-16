from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Survey(models.Model):
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=20, default='open')
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class Question(models.Model):
    survey = models.ForeignKey(Survey, related_name='questions', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    question_type = models.CharField(max_length=20, choices=[('single-choice', 'Single-choice'), ('multiple-choice', 'Multiple-choice'), ('text', 'Text')])
    answer_option=models.JSONField( null=True,blank=True)
    def __str__(self):
        return self.title


class SurveyResponse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    survey = models.ForeignKey(Survey, related_name='responses', on_delete=models.CASCADE)  
    responses = models.JSONField()  
    created_at = models.DateTimeField(default=timezone.now)  

    class Meta:
        unique_together= ('user','survey')

    def __str__(self):
        return f'Response by {self.user.username} to {self.survey.name}'