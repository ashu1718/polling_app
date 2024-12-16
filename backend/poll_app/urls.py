from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('api/signup/', views.signup, name='signup'),
    path('api/login/', views.login, name='login'),
    path('api/user/', views.get_user, name='user-info'),
    path('api/token/refresh/',views.refresh_token,name='refresh-token'),
    path('api/surveys/', views.get_surveys, name='get_surveys'),  # GET all surveys
    path('api/surveys/create', views.create_survey, name='create_survey'),  # POST create survey
    path('api/surveys/close/<int:pk>', views.close_survey, name='close_survey'),  # PUT close survey
    path('api/surveys/delete/<int:pk>', views.delete_survey, name='delete_survey'),  # DELETE delete survey
    path('api/surveys/questions/',views.get_questions,name="get_questions"),
    path('api/surveys/save-survey-response/', views.save_survey_response, name='save_survey_response'),
]