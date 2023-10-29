import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../data/list-of-mcqs-and-traits.json';
import { SelectedOptionsContext } from '../managing-context/SelectedOptionsContext';
import MatchUserToCharacter from '../logic/MatchUserToCharacter';
import '../styles/global.css';
import '../styles/QuizPage.css';

export const QuizPage=()=>{    

  const [localSelectedOptions,setLocalSelectedOptions]=useState({});
  const [currentQueIndex,setCurrentQueIndex]=useState(0);
  const { selectedOptions,setSelectedOptions,setMatchedCharacter,matchedCharacter } = useContext(SelectedOptionsContext);
  const navigate = useNavigate();
  const handleOptionChange=(e,questionId)=>{
    setLocalSelectedOptions({ ...localSelectedOptions, [questionId]: e.target.value, });
  };
  const handleSubmit=(e)=>{ 
    e.preventDefault(); 
    setSelectedOptions(localSelectedOptions);     
    setTimeout( ()=>{ navigate('../ResultsPage');}, 1500);
  };
  useEffect( ()=>{    
    console.log("Selected options:",selectedOptions);
    console.log("Type of selectedOptions=");console.log(typeof selectedOptions);
    const bestMatchCharacter = MatchUserToCharacter(selectedOptions);
    setMatchedCharacter(bestMatchCharacter);
    },[selectedOptions] 
  );
  useEffect( ()=>{
    console.log("Best Match character is:",matchedCharacter);
    }, [matchedCharacter]
  );    
  useEffect(()=>{
    document.body.classList.add('quiz-page-body');
    return()=>{ document.body.classList.remove('results-page-body'); };
  },[]);
  return(
    <form onSubmit={handleSubmit} className='quiz-form'>
      <div className='slider-container' style={{ transform: `translateX(-${currentQueIndex*100}%)` }}>
        {questionsData.questions.map((question)=>(
          <div key={question.id} className='question-container'>
            <h2>{question.id}: {question.que}</h2>                    
            {question.optionsAndTraits.map((option,i)=>(
              <div key={i} className='option-container'>
                <input 
                  type='radio'
                  id={`option-${question.id}-${i}`}
                  name={`question-${question.id}`}
                  value={option.traits}
                  required
                  onChange={(e)=>handleOptionChange(e,question.id)}
                  className='hidden-radio'
                />
                <label className='label-container' htmlFor={`option-${question.id}-${i}`}>
                  {option.ans}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <hr />
      <button type="submit" className='submit-btn'>Submit</button>
    </form>
  );

};