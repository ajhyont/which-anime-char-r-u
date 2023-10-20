import React, {useState, useContext, useEffect} from 'react';
import questionsData from '../data/list-of-mcqs-and-traits.json';
import {SelectedOptionsContext} from '../managing-context/SelectedOptionsContext'

export const QuizPage=()=>{    
  const [localSelectedOptions,setLocalSelectedOptions]=useState({});
  const { selectedOptions, setSelectedOptions, resetSelectedOptions } = useContext(SelectedOptionsContext);
  const handleOptionChange=(e,questionId)=>{
    setLocalSelectedOptions({ ...localSelectedOptions, [questionId]: e.target.value, });
  };
  useEffect(()=>{ console.log("Selected options:",selectedOptions); }, 
    [selectedOptions]
  );

  const handleSubmit=(e)=>{
    e.preventDefault();
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
      <button type="button" onClick={()=>{resetSelectedOptions(); setLocalSelectedOptions([]);} }>Reset</button>
      <h1>sample</h1>
    </form>
  );

};