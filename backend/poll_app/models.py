from django.db import models
from django.utils import timezone

# Create your models here.
class Testing(models.Model):
    first_name= models.CharField(max_length=255)
    last_name= models.CharField(max_length=255)
    age= models.IntegerField()
    std= models.IntegerField()
    marks= models.IntegerField()

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


class Choice(models.Model):
    question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text


class Response(models.Model):
    survey = models.ForeignKey(Survey, related_name='responses', on_delete=models.CASCADE)
    question = models.ForeignKey(Question, related_name='responses', on_delete=models.CASCADE)
    response_text = models.TextField()

    def __str__(self):
        return f"Response for {self.question.title}"
