import './App.css';
import Dashboard from './components/dashboard';
import SurveyCreator from './components/surveyCreator';
import { useState } from 'react';
import QuestionFormComp from './components/questionForm';
import FirstPage from './components/start';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('access_token')
  );
  const [formVisible, setFormVisible]= useState(false);
  const [surveyJSON,setSurveyJson]= useState(null);

  const token = localStorage.getItem('access_token');
  
  if (token) {
    const decoded = jwtDecode(token); 
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('access_token');
      setIsAuthenticated(false);
    }
  }
  return (
    <div className="App">
        {!isAuthenticated ? (
        <>
        <FirstPage setAuth={setIsAuthenticated} ></FirstPage>
        </>
      ) : (
        <>
        <Dashboard setFormVisible={setFormVisible} formVisible={formVisible} setSurveyJson={setSurveyJson} surveyJSON={surveyJSON} setAuth={setIsAuthenticated}></Dashboard>
        {formVisible && <SurveyCreator setFormVisible={setFormVisible}  ></SurveyCreator>}
        {surveyJSON && <QuestionFormComp surveyJSON={surveyJSON} setSurveyJson={setSurveyJson}></QuestionFormComp>}
        </>
      )}
        <ToastContainer />
    </div>
  );
}

export default App;
