import React, { useState } from 'react';
import "../App.css";
import '@blueprintjs/core/lib/css/blueprint.css';
import { Button, Card, Elevation } from "@blueprintjs/core";
import axiosInstance from './axiosInstance';

const SurveyCard = ({ survey, onDelete, onClose ,setSurveyJson}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const accessToken = localStorage.getItem('access_token')

  const handleDeleteSurvey = () => {
    setIsDeleting(true);
    onDelete(survey.id);
    setIsDeleting(false);
  };
  const handleCloseSurvey=()=>{
    onClose(survey.id);
  }

  const handleCardOpen= async ()=>{
    
    const response= await axiosInstance.post('http://localhost:8000/api/surveys/questions/',{survey_id: survey.id},{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      
    });

    const res=response.data;
      const question_data = {
        id: survey.id,
        completedBeforeHtml:"<div><p style='margin: 40px;'>You have already taken this survey.</p></div>",
        pages: res.map(question => {
          let surveyQuestion = {
            name: question.title,
            title: question.title,
          };
          if (question.question_type === 'single-choice') {
            surveyQuestion.type = 'radiogroup';
            surveyQuestion.choices = question.answer_option;
          } else if (question.question_type === 'multiple-choice') {
            surveyQuestion.type = 'checkbox';
            surveyQuestion.choices = question.answer_option;
          } else if (question.question_type === 'text') {
            surveyQuestion.type = 'text';
          }
          surveyQuestion.isRequired=true;
          return {
            elements :[surveyQuestion]
          };
        })
      };
      setSurveyJson(question_data)
   
  }
 
  return (
        <div className="card-componenet">
            <Card interactive={true} elevation={Elevation.TWO}>
                <h2>
                    {survey.name}
                </h2>
                <p><strong>Number of Steps:</strong> {survey.questions.length}</p>
                <p><strong>Status:</strong> {survey.status}</p>
                <p><strong>Creation Date:</strong> {new Date(survey.created_at?.replace(' ','T'))?.toLocaleDateString()}</p>

                <Button
                className='survey-card-btn'
                onClick={handleDeleteSurvey}
                disabled={isDeleting}
                intent='danger'
                >
                Delete Survey
                </Button>
                {survey.status !== 'closed' && <Button
                className='survey-card-btn'
                onClick={handleCloseSurvey}
                outlined={true} intent="warning"
                >
                Close Survey
                </Button>}
                <Button className='survey-card-btn' intent="primary" onClick={handleCardOpen}>Take Survey</Button>
            </Card>
        </div>
   
  );
};

export default SurveyCard;
