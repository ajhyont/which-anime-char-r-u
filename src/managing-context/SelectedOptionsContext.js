import React, {createContext,useState,useContext} from "react";

export const SelectedOptionsContext = createContext();
export const SelectedOptionsProvider = ({children})=>{
  const[selectedOptions,setSelectedOptions]=useState([]);
  const [matchedCharacter, setMatchedCharacter] = useState(null);  
  const resetSelectedOptions=()=>{ 
    setSelectedOptions([]); 
    setMatchedCharacter(null);
  };
  
  return(
    <SelectedOptionsContext.Provider 
      value={{ 
        selectedOptions,
        setSelectedOptions,
        resetSelectedOptions,
        matchedCharacter,
        setMatchedCharacter
      }}
    >
      {children}
    </SelectedOptionsContext.Provider>
  );
};

export const useSelectedOptions=()=>{
  const context=useContext(SelectedOptionsContext);
  if(!context) throw new Error('useQuiz must be used within SelectedOptionsProvider'); 
  return context;
};