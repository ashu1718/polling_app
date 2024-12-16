import React, { useRef, useState } from 'react';
import CreateQuestionForm from './surveyForm';
import "../App.css";
import { Toaster, Intent } from '@blueprintjs/core';
import axios from 'axios';
import axiosInstance from './axiosInstance';
const SurveyCreator = ({setFormVisible}) => {
    const [surveyName,setSurveyName]=useState('')
    const [questions, setQuestions] = useState([]);
    const toasterRef=useRef(null);
    const accessToken = localStorage.getItem('access_token');
    const handleCreateNextQuestion = (questionData) => {
        // Save the current question to the state
        setQuestions((prevQuestions) => [...prevQuestions, questionData]);
        // toasterRef.current.show({
        //     message: "Question added to current Survey",
        //     intent: Intent.SUCCESS,
        // });
    };

    const handleCompleteSurvey = async (questionData) => {
        // Save the last question and complete the survey
        setQuestions((prevQuestions) => [...prevQuestions, questionData]);
        // toasterRef.show({
        //     message: "Survey Added Successfully",
        //     intent: Intent.SUCCESS,
        // });
        setFormVisible(false);
        // Here you can also send the questions to your backend API
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

        }
        catch(error){
            console.log("error while updating survey data into DB",error);
        }
    };
    const handleSurveyChange=(e)=>{
        setSurveyName(e.target.value)
    }
    return (
        <div className='survey-create-form-container'>
            {/* <Toaster ref={toasterRef}></Toaster> */}
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