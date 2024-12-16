import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import "survey-core/defaultV2.min.css";
import { Icon} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import "../App.css";
import axiosInstance from './axiosInstance';
const QuestionFormComp=({ surveyJSON, setSurveyJson })=>{
    const accessToken = localStorage.getItem('access_token')
    const handleSurveyClose=()=>{
        setSurveyJson(null);
    }
    const handleComplete= async(surveydata)=>{
        try{
            const surveyId = surveyJSON.id; 
            const responses = surveydata.data; 

            // Send data to the backend to store it
            const response= await axiosInstance.post('http://localhost:8000/api/surveys/save-survey-response/',{
                survey_id: surveyId,
                responses: responses
            }, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // Include the auth token if needed
                },
                
            });
            if(response){
                console.log("response saved successfully");
            }
        } catch(e){
                console.log("error while saving response");
        }
        

       
    }
    return (
       <div className="survey-create-form-container">
            <button onClick={handleSurveyClose} className="close-btn-question-form">
                <Icon icon={IconNames.CROSS} />
            </button>
            {surveyJSON && (
                <Survey model={new Model(surveyJSON)} onComplete={handleComplete} />
            )}
       </div>
    )
}
export default QuestionFormComp;