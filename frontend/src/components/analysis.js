// Analytics Component
import React, { useState, useEffect } from "react";
import axios from "axios";

const AnalyticsView = ({ surveyId }) => {
  const [responses, setResponses] = useState([]);
  
  useEffect(() => {
    axios.get(`/api/responses/${surveyId}`)
      .then(response => {
        setResponses(response.data);
      })
      .catch(error => console.error("Error fetching responses:", error));
  }, [surveyId]);

  return (
    <div>
      <h2>Survey Analytics</h2>
      <div>Total Responses: {responses.length}</div>
      {/* Display pie charts or word cloud here */}
    </div>
  );
};
