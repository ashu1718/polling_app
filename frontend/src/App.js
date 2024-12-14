import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import SurveyCreator from './components/surveyCreator';
import { useState } from 'react';
import QuestionFormComp from './components/questionForm';

function App() {
  const [formVisible, setFormVisible]= useState(false);
  const [surveyJSON,setSurveyJson]= useState(null);
  return (
    <div className="App">
         <Dashboard setFormVisible={setFormVisible} formVisible={formVisible} setSurveyJson={setSurveyJson} surveyJSON={surveyJSON}></Dashboard>
        {formVisible && <SurveyCreator setFormVisible={setFormVisible} ></SurveyCreator>}
        {surveyJSON && <QuestionFormComp surveyJSON={surveyJSON} setSurveyJson={setSurveyJson}></QuestionFormComp>}
    </div>
  );
}

export default App;
