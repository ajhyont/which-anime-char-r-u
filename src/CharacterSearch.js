import React, { useState } from "react";
import axios from "axios";

export const CharacterSearch=()=>{

  const [characterName,setCharacterName] = useState('');
  const [characterInfo,setCharacterInfo] = useState(null);
  const variables = { search:characterName.trim().toLowerCase() };
//test commit
  const fetchData=async()=>{
    const query=`
      query($search: String){
        Character(search: $search){
          id
          name{ first last }
          description
          image{ large }
        }
      }
    `;
    try{ 
      const resp = await axios.post( 'https://graphql.anilist.co',{query,variables,} );
      setCharacterInfo( resp.data.data.Character );
    } catch(error){ console.error('Err fetching data:',error); }
  };

  return(
    <>
      <input 
        type="text"
        value={characterName}
        onChange={ (e)=>setCharacterName(e.target.value) }
        placeholder="Enter Character name"
      />
      <button onClick={fetchData}>Fetch</button>
      { characterInfo && (
        <div>
          <h2>{`${characterInfo.name.first} ${characterInfo.name.last}`}</h2>
          <img src={characterInfo.image.large} alt={characterInfo.name.first} />
          <p>{characterInfo.description}</p>
        </div>
      )}
    </>
  );

};