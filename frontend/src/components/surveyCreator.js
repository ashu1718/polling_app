import React, { useRef, useState } from 'react';
import CreateQuestionForm from './surveyForm';
import "../App.css";
import axiosInstance from './axiosInstance';
import { toast } from 'react-toastify';

const SurveyCreator = ({setFormVisible}) => {
    const [surveyName,setSurveyName]=useState('')
    const [questions, setQuestions] = useState([]);
    const accessToken = localStorage.getItem('access_token');
    const handleCreateNextQuestion = (questionData) => {
        setQuestions((prevQuestions) => [...prevQuestions, questionData]);
    };

    const handleCompleteSurvey = async (questionData) => {
        setQuestions((prevQuestions) => [...prevQuestions, questionData]);
        setFormVisible(false);
        
        const surveyData={
            name: surveyName,
            questions:[...questions,questionData]
        }
        try{
            const response= await axiosInstance.post('http://localhost:8000/api/surveys/create',surveyData, {
                headers:{
                    "Content-Type":'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },   
            });

            if(response){
                toast.success("Survey Created Successfully!")
            }
        }
        catch(error){
            console.log("error while updating survey data into DB",error);
            toast.error("Error in creating Survey!")
        }
    };
    const handleSurveyChange=(e)=>{
        setSurveyName(e.target.value)
    }
    return (
        <div className='survey-create-form-container'>
            <h1>Create Survey</h1>
            <div>
                <label><strong>Survey Name:</strong></label>
                <input type='text' value={surveyName} onChange={handleSurveyChange} style={{marginLeft: "8px"}}></input>
            </div>
            <CreateQuestionForm 
                onCreateNextQuestion={handleCreateNextQuestion} 
                onCompleteSurvey={handleCompleteSurvey} 
                setFormVisible={setFormVisible}
            />
        </div>
    );
};

export default SurveyCreator;