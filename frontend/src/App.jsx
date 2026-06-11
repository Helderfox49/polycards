import React, { useState } from 'react';
import Home from './components/Home';
import ManageDeck from './components/ManageDeck';

function App() {
  const [currentDeck, setCurrentDeck] = useState(null);
  const [view, setView] = useState('home'); // 'home' ou 'manage'

  const handleSelectDeck = (deck, targetView) => {
    setCurrentDeck(deck);
    setView(targetView);
  };

  return (
    <div>
      {view === 'home' && (
        <Home onSelectDeck={handleSelectDeck} />
      )}

      {view === 'manage' && (
        <ManageDeck
          deck={currentDeck}
          onBack={() => setView('home')}
        />
      )}
    </div>
  );
}

export default App;