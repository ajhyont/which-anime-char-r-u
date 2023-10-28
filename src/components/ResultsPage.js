import React, {useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { SelectedOptionsContext } from '../managing-context/SelectedOptionsContext';
import '../styles/ResultsPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ResultsPage=()=>{
  const {matchedCharacter}  = useContext(SelectedOptionsContext);
  const characterName = matchedCharacter.name;
  const [characterInfo,setCharacterInfo] = useState(null);
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

  return(
    <div className='results-page'>
       <h1>Your Anime Character Match is:</h1>
       <h2>{matchedCharacter ? matchedCharacter.name : "No match found"}</h2>
       <div>
        {characterInfo && (
          <div className='character-info'>
            <h2>{`${characterInfo.name.first} ${characterInfo.name.last}`}</h2>
            <img 
              className='character-large'
              src={characterInfo.image.large} alt={characterInfo.name.first}
            />
            <p className='character-description'>{characterInfo.description}</p>
          </div>
        )}
       </div>
    </div>    
  );
};