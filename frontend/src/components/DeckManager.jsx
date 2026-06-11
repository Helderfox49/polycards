// frontend/src/components/DeckManager.jsx
import React, { useState, useEffect } from 'react';

function DeckManager({ deck, onBack }) {
    const [cards, setCards] = useState([]);
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    // Charger uniquement les cartes liées au paquet actuel
    const fetchCards = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/decks/${deck._id}/cards`);
            const data = await response.json();
            setCards(data);
        } catch (error) {
            console.error("Erreur lors du chargement des cartes :", error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, [deck._id]);

    // Ajouter une nouvelle carte (Requête POST)
    const handleAddCard = async (e) => {
        e.preventDefault();
        if (!front || !back) return alert("Les deux faces de la carte doivent être remplies !");

        try {
            const response = await fetch(`http://localhost:5000/api/decks/${deck._id}/cards`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ front, back })
            });

            if (response.ok) {
                setFront(''); // Réinitialise le champ Recto
                setBack('');  // Réinitialise le champ Verso
                fetchCards(); // Recharge instantanément la liste des cartes
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la carte :", error);
        }
    };

    return (
        <div className="container">
            <button onClick={onBack} style={{ backgroundColor: '#6c757d', marginBottom: '20px' }}>⬅ Retour à l'accueil</button>
            
            <h2>Paquet sélectionné : <span style={{ color: '#007bff' }}>{deck.title}</span></h2>
            <p style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}><em>{deck.description || "Aucune description fournie."}</em></p>

            {/* Formulaire de création de cartes */}
            <form onSubmit={handleAddCard} style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px dashed #007bff' }}>
                <h3>➕ Ajouter une carte mémoire (Flashcard)</h3>
                <div className="form-group">
                    <label>Question / Recto (Front) :</label>
                    <textarea value={front} onChange={(e) => setFront(e.target.value)} rows="3" placeholder="Insérez la question ou le bloc de code..." />
                </div>
                <div className="form-group">
                    <label>Réponse / Verso (Back) :</label>
                    <textarea value={back} onChange={(e) => setBack(e.target.value)} rows="3" placeholder="Insérez la réponse attendue..." />
                </div>
                <button type="submit" style={{ backgroundColor: '#28a745' }}>Enregistrer la carte</button>
            </form>

            {/* Affichage des cartes sous forme de liste technique */}
            <h3>Cartes actuellement enregistrées ({cards.length})</h3>
            {cards.length === 0 ? (
                <p style={{ color: '#888' }}>Ce paquet ne contient aucune carte pour le moment.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {cards.map((card, index) => (
                        <div key={card._id} style={{ background: 'white', padding: '15px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <span style={{ fontWeight: 'bold', color: '#007bff' }}>Carte #{index + 1}</span>
                            <div style={{ marginTop: '5px' }}><strong>R:</strong> {card.front}</div>
                            <div style={{ marginTop: '5px', color: '#28a745' }}><strong>V:</strong> <code style={{ background: '#f1f1f1', padding: '2px 6px', borderRadius: '4px' }}>{card.back}</code></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DeckManager;