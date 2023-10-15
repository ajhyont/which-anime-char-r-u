import React from 'react';
import './App.css';
import { CharacterSearch } from './logic/CharacterSearch';
import { LandingPage } from './react-related/components/LandingPage';

export default function App() {
  return (
    <div className="App,App-header">      
      <LandingPage />
      {/* <CharacterSearch /> */}
    </div>
  );
}
