import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import Flashcard from './Flashcard';

function StudySession({ deck, onBack }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://l${API_BASE_URL}/api/decks/${deck._id}/cards`);
        const data = await response.json();

        setCards(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur récuperation cartes", error);
        setLoading(false);
      }
    };

    fetchCards();
  }, [deck._id]);

  if (loading) {
    return (
      <div className="container">
        <h3>Chargement...</h3>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Aucune carte dans ce paquet !</h2>
        <button onClick={onBack}>Retour</button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false); // EXIGENCE MACHINE A ÉTAT ⚠️
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      {/* Interface de controle de session omitted for space constraints in builder */}

      <Flashcard
        front={currentCard.front}
        back={currentCard.back}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
      />

      <button onClick={handlePrevious} disabled={currentIndex === 0}>
        Précédent
      </button>

      <button onClick={currentIndex < cards.length - 1 ? handleNext : onBack}>
        {currentIndex < cards.length - 1 ? 'Suivant' : 'Fin !'}
      </button>
    </div>
  );
}

export default StudySession;