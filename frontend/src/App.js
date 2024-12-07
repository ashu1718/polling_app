import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import SurveyCreator from './components/surveyCreator';
import { useState } from 'react';

function App() {
  const [formVisible, setFormVisible]= useState(false);
  return (
    <div className="App">
      <header className="App-header">
         <Dashboard setFormVisible={setFormVisible} formVisible={formVisible}></Dashboard>
        {formVisible && <SurveyCreator setFormVisible={setFormVisible} ></SurveyCreator>}
      </header>
    </div>
  );
}

export default App;
