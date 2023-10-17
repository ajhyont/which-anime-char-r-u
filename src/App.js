import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { QuizPage } from './components/QuizPage';
import { SelectedOptionsProvider } from './managing-context/SelectedOptionsContext';

export default function App() {
  return (    
    <SelectedOptionsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>    
      </Router>
    </SelectedOptionsProvider>
  );
}
