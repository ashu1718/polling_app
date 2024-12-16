// Dashboard Component
import React, { useState, useEffect } from "react";
import axios from "axios";
import SurveyCard from "./surveyCard";
import "../App.css";
import '@blueprintjs/core/lib/css/blueprint.css';
import { Button } from "@blueprintjs/core";
import axiosInstance from "./axiosInstance";
const Dashboard = ({setFormVisible, formVisible, setSurveyJson, surveyJSON, setAuth}) => {
  const [surveys, setSurveys] = useState([]);
  const accessToken = localStorage.getItem('access_token');
  useEffect(() => {
    axiosInstance.get("http://localhost:8000/api/surveys",
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,  // Attach the access token here
        },
      }
    )
      .then(response => {
        setSurveys(response.data);
      })
      .catch(error => console.error("Error fetching surveys:", error));
  }, [formVisible]);
  
  const handleSurveyDelete = (id) => {
    axiosInstance.delete(`http://localhost:8000/api/surveys/delete/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,  // Attach the access token here
        },
      }
    )
      .then(() => {
        setSurveys(surveys.filter(survey => survey.id !== id));
      })
      .catch(error => console.error("Error deleting survey:", error));
  };
  const handleSurveyClose =(id)=>{
    axiosInstance.put( `http://localhost:8000/api/surveys/close/${id}`,{},
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,  // Attach the access token here
        },
      }
    )
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
  const handleLogOut=()=>{
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAuth(false);
  }
  return (
    <div className="dashoard-container">
        <div className="dashboard-header">
          <h2>Survey Dashboard</h2> 
          <div>
            <Button onClick={handleCreateSurvey} text="Create New Survey" minimal={true} intent="primary" />
            <Button onClick={handleLogOut} text="Log Out" minimal={true} intent="primary" />
          </div>
          
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