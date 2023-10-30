import animeCharactersData from '../data/anime-characters-and-traits.json';
const animeCharacters = animeCharactersData.anime_characters;

const getUserSelectedTraits= (selectedOptions)=>{
  const userSelectedTraits = new Set();
  for(const key in selectedOptions){
    const traitsArray = selectedOptions[key].split(',');
    traitsArray.forEach(trait=>userSelectedTraits.add(trait.toLowerCase()));
  }
  return userSelectedTraits;
};

const getCharacterMatchScore= (animeCharacters,userSelectedTraits)=>{
  const characterMatchScore={};
  animeCharacters.forEach(character=>{
    let count=0;
    character.traits.forEach(trait=>{
      if(userSelectedTraits.has(trait.toLowerCase())) count++;
    });
    characterMatchScore[character.id]=count;
  });
  return characterMatchScore;
};

const MatchUserToCharacter= (selectedOptions)=>{
  console.log("Type of animeCharacters=");console.log(typeof animeCharacters);
  const userSelectedTraits = getUserSelectedTraits(selectedOptions);
  const animeCharactersArray = Object.values(animeCharacters);
  const characterMatchScore=getCharacterMatchScore(animeCharactersArray,userSelectedTraits);
  const sortedCharacters= Object.entries(characterMatchScore).sort((a,b)=>b[1]-a[1]);
  const randomIndex = Math.floor(Math.random()*Math.min(3,sortedCharacters.length));  
  const bestMatch = sortedCharacters[randomIndex];
  const bestMatchCharacter = animeCharactersArray.find(character=>character.id===parseInt(bestMatch[0]));
  return bestMatchCharacter;
};

export default MatchUserToCharacter;