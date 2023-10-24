import React, { useState, useContext, useEffect } from 'react';
import questionsData from '../data/list-of-mcqs-and-traits.json';
import { SelectedOptionsContext } from '../managing-context/SelectedOptionsContext'
import '../styles/global.css';
import '../styles/QuizPage.css';
import { MatchUserToCharacter } from '../logic/user-matched-to-character';

export const QuizPage=()=>{    

  const [localSelectedOptions,setLocalSelectedOptions]=useState({});
  const { selectedOptions, setSelectedOptions, resetSelectedOptions } = useContext(SelectedOptionsContext);
  const [currentQueIndex,setCurrentQueIndex]=useState(0);
  const handleOptionChange=(e,questionId)=>{
    setLocalSelectedOptions({ ...localSelectedOptions, [questionId]: e.target.value, });
  };
  useEffect( ()=>{console.log("Selected options:",selectedOptions);},[selectedOptions] );
  const handleSubmit=(e)=>{ e.preventDefault(); setSelectedOptions(localSelectedOptions); };
  const handleNext=()=>{
    if(currentQueIndex<questionsData.questions.length-1){ setCurrentQueIndex(currentQueIndex+1); }
  };
  
  const handlePrev=()=>{
    if(currentQueIndex>0){ setCurrentQueIndex(currentQueIndex-1); }
  };
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
      <button type='button' onClick={handlePrev} className='arrow-btn left'>←</button>
      <button type='button' onClick={handleNext} className='arrow-btn right'>→</button>
      <hr />
      <button type="submit" className='submit-btn'>Submit</button>          
      <button type="button" className='reset-btn' onClick={()=>{resetSelectedOptions(); setLocalSelectedOptions([]);} }>
        Reset
      </button>
      <h1>sample</h1>
    </form>
  );

};