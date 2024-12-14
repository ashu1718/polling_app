// Dashboard Component
import React, { useState, useEffect } from "react";
import axios from "axios";
import SurveyCard from "./surveyCard";
import "../App.css";
import '@blueprintjs/core/lib/css/blueprint.css';
import { Button } from "@blueprintjs/core";
const Dashboard = ({setFormVisible, formVisible, setSurveyJson, surveyJSON}) => {
  const [surveys, setSurveys] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:8000/api/surveys")
      .then(response => {
        console.log(response);
        setSurveys(response.data);
      })
      .catch(error => console.error("Error fetching surveys:", error));
  }, [formVisible]);
  
  const handleSurveyDelete = (id) => {
    axios.delete(`http://localhost:8000/api/surveys/delete/${id}`)
      .then(() => {
        setSurveys(surveys.filter(survey => survey.id !== id));
      })
      .catch(error => console.error("Error deleting survey:", error));
  };
  const handleSurveyClose =(id)=>{
    axios.put( `http://localhost:8000/api/surveys/close/${id}`)
    .then(()=>{
      // Update the surveys state to reflect the closed survey
      setSurveys(surveys.map(survey => 
        survey.id === id ? { ...survey, status: 'closed' } : survey
      ));
    })
    .catch(e => console.log("error in closing survey",e));
  };
  const handleCreateSurvey=()=>{
    setFormVisible(true)
  }
  return (
    <div className="dashoard-container">
        <div className="dashboard-header">
          <h2>Survey Dashboard</h2> 
          <Button onClick={handleCreateSurvey} text="Create New Survey" minimal={true} intent="primary" />
          
        </div>
      <div className= {`survey-container ${(formVisible===true || surveyJSON !== null) ? "blur-background" : ""}`}>
        {surveys.map(survey => (
          <SurveyCard 
            key={survey.id} 
            survey={survey} 
            onDelete={handleSurveyDelete} 
            onClose={handleSurveyClose}
            setSurveyJson={setSurveyJson}
          />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;