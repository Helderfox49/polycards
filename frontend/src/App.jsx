import React, { useState } from 'react';
import Home from './components/Home';
import DeckManager from './components/DeckManager';

// Zone de transition (un composant temporaire pour le mode étude en attendant l'Étudiant 3)
function EmptyStudyPlaceholder({ deck, onBack }) {
    return (
        <div className="container">
            <button onClick={onBack} style={{ backgroundColor: '#6c757d', marginBottom: '20px' }}>⬅ Retour</button>
            <h2>🚀 Mode Révision pour "{deck.title}"</h2>
            <p>Le moteur d'étude 3D est en cours de finalisation par l'Étudiant 3...</p>
        </div>
    );
}

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
        return <EmptyStudyPlaceholder deck={currentDeck} onBack={handleNavigateHome} />;
    }

    return <Home onSelectDeck={handleSelectDeck} />;
}

export default App;