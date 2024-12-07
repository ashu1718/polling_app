import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import '@blueprintjs/core/lib/css/blueprint.css';
import { Button, Card, Elevation } from "@blueprintjs/core";
const SurveyCard = ({ survey, onDelete, onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false);
//   const history = useNavigate();

//   const handleViewResponses = () => {
//     // Redirect to the survey responses page
//     history.push(`/responses/${survey.id}`);
//   };

//   const handleEditSurvey = () => {
//     // Redirect to survey creation/edit page
//     history.push(`/edit-survey/${survey.id}`);
//   };

  const handleDeleteSurvey = () => {
    setIsDeleting(true);
    onDelete(survey.id);
    setIsDeleting(false);
  };
  const handleCloseSurvey=()=>{
    onClose(survey.id);
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
                onClick={handleDeleteSurvey}
                disabled={isDeleting}
                >
                {isDeleting ? 'Deleting...' : 'Delete Survey'}
                </Button>
                {survey.status !== 'closed' && <Button
                onClick={handleCloseSurvey}
                >
                close Survey
                </Button>}
            </Card>
        </div>
   
  );
};

export default SurveyCard;
