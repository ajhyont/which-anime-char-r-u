import React from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

export const LandingPage=()=>{
  console.log("Landing page is rendering");
  const navigate=useNavigate();  
  return(    
    <div className="bg-dark text-white text-center d-flex align-items-start justify-content-center vh-100">      
      <div className="overlay">
        <div>
          <h1 className="display-2 mb-4">Welcome to the Anime Character Quiz!</h1>
          <p className="display-6">Find out which anime character you are most like!</p>
          <button className="start-button" onClick={()=>{navigate('/quiz');}}>Start Quiz</button>
        </div>
      </div>
    </div>
  );
};