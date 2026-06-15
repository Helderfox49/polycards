import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import Flashcard from './FlashCard';

function StudySession({ deck, onBack }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/decks/${deck._id}/cards`);
        const res = await response.json();

        setCards(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur récuperation cartes", error);
        setLoading(false);
      }
    };

    fetchCards();
  }, [deck._id]);

  if (loading) return <div className="container"><h3>Chargement du mode révision...</h3></div>;
    
    // Si le paquet est vide
    if (cards.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '5px' }}>
                <h2>Ce paquet ne contient pas encore de cartes.</h2>
                <button 
                    onClick={onBack} 
                    style={{ backgroundColor: '#6c757d' }}>
                        Retour à l'accueil
                </button>
            </div>
        );
    }

    const currentCard = cards[currentIndex];

    // Passer à la carte suivante (Règle d'ingénierie stricte)
    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setIsFlipped(false); // REGLE EXIGÉE : Réinitialiser impérativement le retournement à false
            setCurrentIndex(currentIndex + 1); // Incrémentation de l'index
        }
    };

    // Revenir à la carte précédente
    const handlePrevious = () => {
        if (currentIndex > 0) {
            setIsFlipped(false); // Réinitialiser aussi ici pour éviter les bugs visuels
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <button onClick={onBack} style={{ backgroundColor: '#6c757d' }}>⬅️  Retour </button>
                <span><strong>Progression :</strong> {currentIndex + 1} / {cards.length}</span>
            </div>

            <h2>Session d'étude : {deck.title}</h2>
            <p style={{ color: '#664' }}>Mémorisez les notions à votre rythme.</p>

            {/* Insertion du composant visuel Flashcard */}
            <Flashcard 
                front={currentCard.front} 
                back={currentCard.back} 
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped(!isFlipped)} 
            />

            {/* Boutons de contrôle de la machine à état */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button 
                    onClick={handlePrevious} 
                    disabled={currentIndex === 0}
                    style={{ backgroundColor: currentIndex === 0 ? '#cccccc' : '#007bff', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer' }}
                >
                    ◀ Précédent
                </button>

                {currentIndex < cards.length - 1 ? (
                    <button onClick={handleNext} style={{ backgroundColor: '#007bff' }}>
                        Suivant ▶
                    </button>
                ) : (
                    <button onClick={onBack} style={{ backgroundColor: '#28a745' }}>
                        Session terminée ! Retour
                    </button>
                )}
            </div>
        </div>
    );
}

export default StudySession;