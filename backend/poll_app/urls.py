from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('api/surveys/', views.get_surveys, name='get_surveys'),  # GET all surveys
    path('api/surveys/', views.create_survey, name='create_survey'),  # POST create survey
    path('api/surveys/close/<int:pk>', views.close_survey, name='close_survey'),  # PUT close survey
    path('api/surveys/delete/<int:pk>', views.delete_survey, name='delete_survey'),  # DELETE delete survey
]