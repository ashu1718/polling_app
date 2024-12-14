from django.http import JsonResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Survey,Question
from .serializers import SurveySerializer, QuestionSerializer
from django.utils import timezone


# GET /api/surveys/ - List all surveys
@api_view(['GET'])
def get_surveys(request):
    surveys = Survey.objects.all()
    serializer = SurveySerializer(surveys, many=True)
    return Response(serializer.data)


# POST /api/surveys/ - Create a new survey
@api_view(['POST'])
def create_survey(request):
    serializer = SurveySerializer(data=request.data)
    if serializer.is_valid():
        survey = serializer.save()
        return Response(SurveySerializer(survey).data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# PUT /api/surveys/<id>/ - Update an existing survey (e.g., close a survey)
@csrf_exempt
@api_view(['PUT'])
def close_survey(request, pk):
    try:
        survey = Survey.objects.get(pk=pk)
    except Survey.DoesNotExist:
        return HttpResponseNotFound("Survey not found")
    
    # Change status to 'closed'
    survey.status = 'closed'
    survey.save()
    return JsonResponse({'status': 'Survey closed'}, status=status.HTTP_200_OK)


# DELETE /api/surveys/<id>/ - Delete a survey
@csrf_exempt
@api_view(['DELETE'])
def delete_survey(request, pk):
    try:
        survey = Survey.objects.get(pk=pk)
    except Survey.DoesNotExist:
        return HttpResponseNotFound("Survey not found")
    
    survey.delete()
    return JsonResponse({'status': 'Survey deleted'}, status=status.HTTP_204_NO_CONTENT)



@api_view(['POST'])
def get_questions(request):
    try:
        survey_id= request.data.get('survey_id')
        print("sid:",survey_id)
        survey= Survey.objects.get(id=survey_id)
        questions=survey.questions.all()
        serializer= QuestionSerializer(questions,many=True)
        print(serializer.data)
        return Response(serializer.data)

    except Exception as e:
        return Response("error in fetching questions:",status=status.HTTP_400_BAD_REQUEST)