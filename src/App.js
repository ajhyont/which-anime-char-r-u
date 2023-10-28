import './styles/global.css';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { QuizPage } from './components/QuizPage';
import { SelectedOptionsProvider } from './managing-context/SelectedOptionsContext';
import { CharacterSearch } from './logic/CharacterSearch';
import { ResultsPage } from './components/ResultsPage';

export default function App() {
  return (    
    <SelectedOptionsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path='/search' element={<CharacterSearch />} />
          <Route path='/resultsPage' element={<ResultsPage />} />
        </Routes>    
      </Router>
    </SelectedOptionsProvider>
  );
}
