import React, {useState, useContext} from 'react';
import questionsData from '../data/list-of-mcqs-and-traits.json';
import {SelectedOptionsContext} from '../managing-context/SelectedOptionsContext'

export const QuizPage=()=>{  
  const [localSelectedOptions,setLocalSelectedOptions]=useState({});
  const { setSelectedOptions } = useContext(SelectedOptionsContext);
  const handleOptionChange=(e,questionId)=>{
    setLocalSelectedOptions({
      ...localSelectedOptions,
      [questionId]: e.target.value,
    });
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Selectd options:",localSelectedOptions);
    setSelectedOptions(localSelectedOptions);
  };
  return(    
    <form onSubmit={handleSubmit}>
      {questionsData.questions.map((question)=>(
        <div key={question.id}>
          <h2>{question.id}: {question.que}</h2>                    
          {question.optionsAndTraits.map((option,i)=>(
            <div key={i}>
              <input 
                type='radio'
                id={`option-${question.id}-${i}`}
                name={`question-${question.id}`}
                value={option.traits}
                required
                onChange={(e)=>handleOptionChange(e,question.id)}
              />
              <label htmlFor={`option-${question.id}-${i}`}>
                {option.ans}
              </label>
            </div>
          ))}
        </div>
      ))}
      <hr />
      <button type="submit">Submit</button>          
      <h1>sample</h1>
    </form>
  );

};