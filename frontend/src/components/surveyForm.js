import React, { useRef, useState } from 'react';
import { Button } from '@blueprintjs/core';
const CreateQuestionForm = ({ onCreateNextQuestion, onCompleteSurvey }) => {
    const [title, setTitle] = useState('');
    const [questionType, setQuestionType] = useState('single-choice');
    const [answerOptions, setAnswerOptions] = useState(['', '', '', '']);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleQuestionTypeChange = (e) => {
        setQuestionType(e.target.value);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...answerOptions];
        newOptions[index] = value;
        setAnswerOptions(newOptions);
    };

    const handleCreateNextQuestion = () => {
        // Save the current question and its answer type
        
        const questionData = {
            title,
            question_type: questionType,
            answer_option: questionType === 'single-choice' || questionType === 'multiple-choice' ? answerOptions : null,
        };
        onCreateNextQuestion(questionData);
        // Reset the form for the next question
       
        setTitle('');
        setQuestionType('single-choice');
        setAnswerOptions(['', '', '', '']);
    };

    const handleCompleteSurvey = () => {
        // Save the current question and complete the survey
        const questionData = {
            title,
            question_type: questionType,
            answer_option: questionType === 'single-choice' || questionType === 'multiple-choice' ? answerOptions : null,
        };
        onCompleteSurvey(questionData);
    };

    return (
      
        <div>
            <h4>Create a New Question</h4>
            <div style={{margin:"2px"}}>
                <label><strong>Question Title:</strong></label>
                <input type="text" value={title} onChange={handleTitleChange} style={{marginLeft: "8px"}} />
            </div>
            <div style={{margin:"2px"}}>
                <label><strong>Question Type:</strong> </label>
                <span>
                    <label>
                        <input
                            type="radio"
                            value="single-choice"
                            checked={questionType === 'single-choice'}
                            onChange={handleQuestionTypeChange}
                        />
                        Single-choice
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="multiple-choice"
                            checked={questionType === 'multiple-choice'}
                            onChange={handleQuestionTypeChange}
                        />
                        Multiple-choice
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="text"
                            checked={questionType === 'text'}
                            onChange={handleQuestionTypeChange}
                        />
                        Text
                    </label>
                </span>
            </div>
            {(questionType === 'single-choice' || questionType === 'multiple-choice') && (
                <div>
                    <h4>Answer Options:</h4>
                    {answerOptions.map((option, index) => (
                        <div key={index} style={{margin:"2px"}}>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            )}
            <div>
                <Button onClick={handleCreateNextQuestion} style={{margin:"2px"}} rightIcon="arrow-right" intent="success" text="Add Question" />
                <Button onClick={handleCompleteSurvey} style={{margin:"2px"}} intent="success">Complete Survey</Button>
            </div>
        </div>
    );
};

export default CreateQuestionForm;