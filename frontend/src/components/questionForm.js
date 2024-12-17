import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import "survey-core/defaultV2.min.css";
import { Icon} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import "../App.css";
import axiosInstance from './axiosInstance';
import { toast } from "react-toastify";


const QuestionFormComp=({ surveyJSON, setSurveyJson })=>{
    const accessToken = localStorage.getItem('access_token')
    const handleSurveyClose=()=>{
        setSurveyJson(null);
    }
    const handleComplete= async(surveydata)=>{
        try{
            setSurveyJson(null);
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
                    'Authorization': `Bearer ${accessToken}`, 
                },
                
            });
            
            if(response){
                console.log("response saved successfully");
                toast.success("Survey Submitted Successfully");
            }
        } catch(e){
                
                console.log("error while saving response",e.response.data);
                if(e.response.data.message=== "Survey already taken by user"){
                    toast.error("Survey Already Taken Previously");
                }
                else{
                    toast.error("Error in Saving, pl try again.");
                }
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