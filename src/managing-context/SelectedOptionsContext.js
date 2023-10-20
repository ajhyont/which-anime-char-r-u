import React, {createContext,useState,useContext} from "react";

export const SelectedOptionsContext = createContext();
export const SelectedOptionsProvider = ({children})=>{
  const[selectedOptions,setSelectedOptions]=useState([]);
  const resetSelectedOptions=()=>{ setSelectedOptions({}); };
  return(
    <SelectedOptionsContext.Provider 
      value={{ selectedOptions,setSelectedOptions,resetSelectedOptions }}>
      {children}
    </SelectedOptionsContext.Provider>
  );
};

export const useSelectedOptions=()=>{
  const context=useContext(SelectedOptionsContext);
  if(!context){ throw new Error('useQuiz must be used within SelectedOptionsProvider'); }
  return context;
};