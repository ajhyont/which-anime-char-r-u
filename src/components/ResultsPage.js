import React, {useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { SelectedOptionsContext } from '../managing-context/SelectedOptionsContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import '../styles/ResultsPage.css';

export const ResultsPage=()=>{  

  const { matchedCharacter,resetSelectedOptions,setMatchedCharacter }  = useContext(SelectedOptionsContext);
  const characterName = matchedCharacter.name;
  const [characterInfo,setCharacterInfo] = useState(null);
  const navigate = useNavigate();
  const fetchData = async()=>{
    const variables = { search: characterName.trim().toLowerCase() };
    const query=`
      query($search:String){
        Character(search: $search){
          id
          name{ first last }
          description
          image{ large }
        }
      }
    `;
    try{
      const resp = await axios.post('https://graphql.anilist.co',{query,variables} );
      setCharacterInfo(resp.data.data.Character);
    }catch(error){ console.error('Error fetching data:',error); }
  };
  useEffect(()=>{
    const timerId = setTimeout(()=>{ if(characterName) fetchData(); },100);
    return ()=> clearTimeout(timerId);
  },[characterName]);
  const handleReset=()=>{
    resetSelectedOptions();
    navigate('/');
    setMatchedCharacter(null);
  };
  useEffect(()=>{
    document.body.classList.add('results-page-body');
    return()=>{ document.body.classList.remove('results-page-body'); };
  },[]);
  return(
    <div className='results-page container'>       
      <div className='row align-items-center'>
        {characterInfo && (
          <div className='character-info col-12 row'>
            <h2 className='text-center'>{`${characterInfo.name.first} ${characterInfo.name.last}`}</h2>
            <img 
              className='character-large col-md-4 img-fluid rounded-circle'
              src={characterInfo.image.large} alt={characterInfo.name.first}
            />    
            <div className='col-md-6'>
              <p className='character-description border border-primary rounded p-3'>
                {characterInfo.description}                
              </p>
            </div>
          </div>
        )}
      </div>
      <button onClick={handleReset} className='reset-btn btn btn-primary mt-5'>🔁 Start another Quiz!</button>
    </div>    
  );

};