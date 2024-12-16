import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import SurveyCreator from './components/surveyCreator';
import { useState } from 'react';
import QuestionFormComp from './components/questionForm';
import Demo from './components/start';
import { jwtDecode } from 'jwt-decode';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('access_token')
  );
  const [formVisible, setFormVisible]= useState(false);
  const [surveyJSON,setSurveyJson]= useState(null);

  const token = localStorage.getItem('access_token');
  if (token) {
    const decoded = jwtDecode(token); // Use a JWT decoder to check expiry
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('access_token');
      setIsAuthenticated(false);
    }
  }
  return (
    <div className="App">
        {!isAuthenticated ? (
        <>
        <Demo setAuth={setIsAuthenticated}></Demo>
        </>
      ) : (
        <>
        <Dashboard setFormVisible={setFormVisible} formVisible={formVisible} setSurveyJson={setSurveyJson} surveyJSON={surveyJSON} setAuth={setIsAuthenticated}></Dashboard>
        {formVisible && <SurveyCreator setFormVisible={setFormVisible} ></SurveyCreator>}
        {surveyJSON && <QuestionFormComp surveyJSON={surveyJSON} setSurveyJson={setSurveyJson}></QuestionFormComp>}
        </>
      )}
        
    </div>
  );
}

export default App;
