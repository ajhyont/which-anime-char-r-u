import React from "react";
import { useNavigate } from 'react-router-dom';

export const LandingPage=()=>{
  console.log("Landing page is rendering");
  const navigate=useNavigate();
  const goToQuizPage=()=>{ navigate('/quiz'); };
  return(    
    <>      
      <h1>Welcome to the Anime Character Quiz!</h1>
      <p>Find out which anime character you are most like!</p>
      <button onClick={goToQuizPage}>Start Quiz</button>
    </>
  );
};