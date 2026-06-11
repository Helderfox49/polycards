import React, { useState } from 'react';
import Home from './components/Home';
import DeckManager from './components/DeckManager';
import StudySession from './components/StudySession';


function App() {
    const [currentDeck, setCurrentDeck] = useState(null);
    const [view, setView] = useState('home'); // Les vues possibles : 'home', 'manage', 'study'

    // Fonction appelée quand on clique sur un bouton de l'accueil
    const handleSelectDeck = (deck, selectedView) => {
        setCurrentDeck(deck);
        setView(selectedView);
    };

    // Fonction pour revenir à la page d'accueil
    const handleNavigateHome = () => {
        setCurrentDeck(null);
        setView('home');
    };

    // Rendu conditionnel basé sur l'état "view"
    if (view === 'manage') {
        return <DeckManager deck={currentDeck} onBack={handleNavigateHome} />;
    }

    if (view === 'study') {
        return <StudySession deck={currentDeck} onBack={handleNavigateHome} />;;
    }

    return <Home onSelectDeck={handleSelectDeck} />;
}

export default App;