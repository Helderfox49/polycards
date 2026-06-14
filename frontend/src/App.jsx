import React, { useState } from 'react';
import Home from './components/Home';
import DeckManager from './components/DeckManager';
import StudySession from './components/StudySession';
function App() {
  const [currentDeck, setCurrentDeck] = useState(null);
  const [view, setView] = useState('home');
  if (view === 'manage') return <DeckManager deck={currentDeck} onBack={() =>setView('home')} />;
  if (view === 'study') return <StudySession deck={currentDeck} onBack={() => setView('home')} />;
  return <Home onSelectDeck={(deck, v) => { setCurrentDeck(deck); setView(v); }} />;
}
export default App;