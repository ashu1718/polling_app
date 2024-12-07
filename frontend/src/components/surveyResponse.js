// SurveyResponse Component
import React, { useState, useEffect } from "react";
import axios from "axios";

const SurveyResponse = ({ surveyId }) => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  useEffect(() => {
    axios.get(`/api/surveys/${surveyId}`)
      .then(response => {
        setQuestions(response.data.questions);
      })
      .catch(error => console.error("Error fetching survey:", error));
  }, [surveyId]);
  
  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleBack = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmit = () => {
    axios.post("/api/responses", { surveyId, responses })
      .then(() => {
        alert("Thank you for completing the survey!");
      })
      .catch(error => console.error("Error submitting responses:", error));
  };

  if (currentQuestionIndex >= questions.length) {
    return <div>Thank you for completing the survey!</div>;
  }

  return (
    <div>
      <h2>{questions[currentQuestionIndex].title}</h2>
      {/* Render question options based on type */}
      {/* Navigation */}
      <button onClick={handleBack}>Back</button>
      <button onClick={handleNext}>Next</button>
      {currentQuestionIndex === questions.length - 1 && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};
