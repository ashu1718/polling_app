from django.http import JsonResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Survey, SurveyResponse
from .serializers import SurveySerializer, QuestionSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.db import IntegrityError
from rest_framework.exceptions import AuthenticationFailed
@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User created successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        email = request.data.get('signInEmail')
        password = request.data.get('signInPassword')
        user = User.objects.filter(email=email).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



@api_view(['GET'])
def get_user(request):
    if request.user.is_authenticated:
        return Response({
            'username': request.user.username,
            'email': request.user.email
        })
    return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def refresh_token(request):
    """
    Refresh the access token using the provided refresh token.
    """
    refresh_token = request.data.get('refresh', None)

    if not refresh_token:
        raise AuthenticationFailed("Refresh token is required")

    try:
        # Create a RefreshToken object using the provided refresh token
        token = RefreshToken(refresh_token)

        # Generate new access and refresh tokens
        access_token = token.access_token

        # Return the new access and refresh tokens
        return Response({
            'access': str(access_token),
            'refresh': str(token)  # Return a new refresh token if needed
        })

    except Exception as e:
        raise AuthenticationFailed("Invalid or expired refresh token")


# GET /api/surveys/ - List all surveys
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_surveys(request):
    surveys = Survey.objects.all()
    serializer = SurveySerializer(surveys, many=True)
    return Response(serializer.data)


# POST /api/surveys/ - Create a new survey
@api_view(['POST'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def delete_survey(request, pk):
    try:
        survey = Survey.objects.get(pk=pk)
    except Survey.DoesNotExist:
        return HttpResponseNotFound("Survey not found")
    
    survey.delete()
    return JsonResponse({'status': 'Survey deleted'}, status=status.HTTP_204_NO_CONTENT)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_questions(request):
    try:
        survey_id= request.data.get('survey_id')
        survey= Survey.objects.get(id=survey_id)
        questions=survey.questions.all()
        serializer= QuestionSerializer(questions,many=True)
        return Response(serializer.data)

    except Exception as e:
        return Response("error in fetching questions:",status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_survey_response(request):
    if request.method == 'POST':
        data = request.data
        user = request.user 
        survey_id = data.get('survey_id')
        responses = data.get('responses')
        if not survey_id or not responses:
            return Response({"error": "Survey ID and responses are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            survey = Survey.objects.get(id=survey_id)
        except Survey.DoesNotExist:
            return Response({"error": "Survey not found."}, status=status.HTTP_404_NOT_FOUND)

        # Save the response
        try:
            survey_response = SurveyResponse.objects.create(
                user=user,
                survey=survey,
                responses=responses
            )

            return Response({"message": "Survey response saved successfully."}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"message": "Survey already taken by user"}, status=status.HTTP_400_BAD_REQUEST)