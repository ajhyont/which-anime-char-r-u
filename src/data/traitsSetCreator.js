const uniqueTraits = new Set();
const fs = require('fs');

fs.readFile('anime-characters-and-traits.json', 'utf8', (err, data) =>{
  if(err){ console.error('Error reading the file:',err); return; }
  const parsedData = JSON.parse(data);
  const characters = parsedData.anime_characters;
  if(Array.isArray(characters)){
    characters.forEach(character=>{
      if(character.traits){ character.traits.forEach(trait=>{ uniqueTraits.add(trait); }); }
    });
    const sortedUniqueTraits = Array.from(uniqueTraits).sort();
    fs.writeFile('uniqueTraits.json', JSON.stringify(sortedUniqueTraits,null,2),'utf8',(err) =>{
      if(err){ console.error('Error writing the file:',err); }
      else { console.log('Successfully wrote unique traits to uniqueTraits.json'); }
    });    
  }
  else{
    console.error('Parsed data is not an array');
  }

});
