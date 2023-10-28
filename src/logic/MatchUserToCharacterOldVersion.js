import React, {useEffect,useContext} from 'react';
import animeCharacters from '../data/anime-characters-and-traits.json';
import { SelectedOptionsContext } from '../managing-context/SelectedOptionsContext';

export const MatchUserToCharacterOldVersion=()=>{

  const {selectedOptions} = useContext(SelectedOptionsContext);
  //Converting user-seelcted options into character traits.
  const getUserSelectedTraits = (userSelectedOptions)=>{
    const userSelectedTraits = new Set();
    userSelectedOptions.forEach(option=>{
      option.traits.forEach( trait=>userSelectedTraits.add(trait.toLowerCase()) );
    });
    return userSelectedTraits;
  };
  //Scoring each anime character based on level of compatibality to user's answers.
  const getCharacterMatchScore = (animeCharacters,userSelectedTraits)=>{
    const characterMatchScore = {};
    animeCharacters.forEach(character=>{
      let count=0;
      character.traits.forEach(trait=>{ 
        if(userSelectedTraits.has(trait.toLowerCase)) count++; 
      });
      characterMatchScore[character.id]=count;
    });
    return characterMatchScore;
  };
  //
  useEffect(()=>{
    if(selectedOptions){
      const userSelectedTraits = getUserSelectedTraits(selectedOptions);
      const characterMatchScore=getCharacterMatchScore(animeCharacters,userSelectedTraits);
      const sortedCharacters = Object.entries(characterMatchScore).sort((a,b)=>b[1]-a[1]);
      const bestMatch = sortedCharacters[0];
      const bestMatchCharacter = animeCharacters.find(character=>character.id === bestMatch[0]);
      console.log(`The best match for you is the character with ID=${bestMatch[0]} and score=${bestMatch[1]}. The character's name is: ${bestMatchCharacter.name}`);
    }
  },[selectedOptions]);

};

// //reading the anime characters json file
// const fs = require('fs');
// const readJSONFile = (filePath)=>{
//   return new Promise((resolve,reject)=>{
//     fs.readFile(filePath,'utf8',(err,data)=>{
//       if(err){ reject(err); return; } 
//       resolve(JSON.parse(data));
//     });
//   });
// };

// const getUserSelectedTraits =(userSelectedOptions)=>{
//   const userSelectedTraits = new Set();
//   userSelectedOptions.forEach(option=>{
//     option.traits.forEach(trait=>userSelectedTraits.add(trait.toLowerCase()));
//   });
//   return userSelectedTraits;
// };

// //scoring characters by number trait-matches
// const getCharacterMatchScore = (animeCharacters,userSelectedTraits)=>{
//   const characterMatchScore={};
//   animeCharacters.forEach(character=>{
//     let count=0;
//     character.traits.forEach(trait=>{ if(userSelectedTraits.has(trait.toLowerCase())) count++; });
//     characterMatchScore[character.id] = count;
//   });
//   return characterMatchScore;
// };

// //Main function
// const main = async()=>{
//   const userSelectedOptions=[
//     {option:'A', traits:["Self-sacrificing","Compassionate","Sadistic","Manipulative","Altruistic","Intuitive"]}
//   ];
//   const userSelectedTraits = getUserSelectedTraits(userSelectedOptions);
//   try{
//     const { anime_characters } = await readJSONFile('anime-characters-and-traits.json');
//     const characterMatchScore = getCharacterMatchScore(anime_characters,userSelectedTraits);
//     const sortedCharacters = Object.entries(characterMatchScore).sort( (a,b)=>b[1]-a[1] );
//     const bestMatch = sortedCharacters[0];
//     const bestMatchCharacter = anime_characters.find(character=>character.id == bestMatch[0]);
//     console.log(`the best match for your is character with ID= ${bestMatch[0]} and score=${bestMatch[1]} is named: ${bestMatchCharacter.name}.`)    
//   } 
//   catch(err){ console.error('Error:',err); }
// };

// main();