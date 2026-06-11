import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';

function StudySession({ deck, onBack }) {
    // Machine à état exigée par le cahier des charges
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(true);

    // Chargement des cartes du paquet sélectionné
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/decks/${deck._id}/cards`);
                const data = await response.json();
                setCards(data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des cartes pour l'étude :", error);
                setLoading(false);
            }
        };
        fetchCards();
    }, [deck._id]);

    if (loading) return <div className="container"><h3>Chargement de la session d'étude...</h3></div>;

    // Gestion du cas où le paquet est vide
    if (cards.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
                <h2>Aucune carte dans ce paquet !</h2>
                <p>Ajoutez d'abord des cartes via le gestionnaire avant de lancer la révision.</p>
                <button onClick={onBack} style={{ backgroundColor: '#6c757d' }}>Retour à l'accueil</button>
            </div>
        );
    }

    const currentCard = cards[currentIndex];

    // Commande de passage à la carte suivante (Contrôle de l'état)
    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setIsFlipped(false); // ⚠️ EXIGENCE TECHNIQUE STRICTE : Réinitialisation immédiate du retournement
            setCurrentIndex(currentIndex + 1); // Progression de l'index
        }
    };

    // Commande de retour à la carte précédente
    const handlePrevious = () => {
        if (currentIndex > 0) {
            setIsFlipped(false); // Réinitialisation de sécurité
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <button onClick={onBack} style={{ backgroundColor: '#6c757d' }}>🚪 Quitter la session</button>
                <span style={{ fontWeight: 'bold' }}>Carte : {currentIndex + 1} / {cards.length}</span>
            </div>

            <h2 style={{ marginBottom: '5px' }}>Révision : {deck.title}</h2>
            <p style={{ color: '#666', marginTop: '0' }}>Cliquez sur la carte pour la retourner.</p>

            {/* Insertion de la carte animée en CSS pur */}
            <Flashcard 
                front={currentCard.front}
                back={currentCard.back}
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped(!isFlipped)}
            />

            {/* Panneau de contrôle d'avancement */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
                <button 
                    onClick={handlePrevious} 
                    disabled={currentIndex === 0}
                    style={{ backgroundColor: currentIndex === 0 ? '#ccc' : '#007bff', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer' }}
                >
                    ◀ Précédent
                </button>

                {currentIndex < cards.length - 1 ? (
                    <button onClick={handleNext} style={{ backgroundColor: '#007bff' }}>
                        Suivant ▶
                    </button>
                ) : (
                    <button onClick={onBack} style={{ backgroundColor: '#28a745' }}>
                        🎉 Fin de session ! Retourner à l'accueil
                    </button>
                )}
            </div>
        </div>
    );
}

export default StudySession;