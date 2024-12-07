import React, { useRef, useState } from 'react';
import CreateQuestionForm from './surveyForm';
import "../App.css";
import { Toaster, Intent } from '@blueprintjs/core';
const SurveyCreator = ({setFormVisible}) => {
    const [questions, setQuestions] = useState([]);
    const toasterRef=useRef(null);
    const handleCreateNextQuestion = (questionData) => {
        // Save the current question to the state
        setQuestions((prevQuestions) => [...prevQuestions, questionData]);
        console.log('Current Questions:', [...questions, questionData]);
        // toasterRef.current.show({
        //     message: "Question added to current Survey",
        //     intent: Intent.SUCCESS,
        // });
    };

    const handleCompleteSurvey = (questionData) => {
        // Save the last question and complete the survey
        setQuestions((prevQuestions) => [...prevQuestions, questionData]);
        console.log('Survey Completed with Questions:', [...questions, questionData]);
        // toasterRef.show({
        //     message: "Survey Added Successfully",
        //     intent: Intent.SUCCESS,
        // });
        setFormVisible(false);
        // Here you can also send the questions to your backend API
    };

    return (
        <div className='survey-create-form-container'>
            {/* <Toaster ref={toasterRef}></Toaster> */}
            <h1>Create Survey</h1>
            <CreateQuestionForm 
                onCreateNextQuestion={handleCreateNextQuestion} 
                onCompleteSurvey={handleCompleteSurvey} 
            />
        </div>
    );
};

export default SurveyCreator;