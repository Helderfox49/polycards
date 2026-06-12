import React, { useState, useEffect } from 'react';

function Home({ onSelectDeck }) {
    const [decks, setDecks] = useState([]);
    // Nouveaux états pour le formulaire de création
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const fetchDecks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/decks');
            const data = await response.json();
            setDecks(data); 
        } catch (error) {
            console.error("Erreur lors de la récupération des paquets :", error);
        }
    };

    useEffect(() => {
        fetchDecks();
    }, []);

    // Gestion de la soumission du formulaire
    const handleCreateDeck = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        if (!title) return alert("Le titre du paquet est obligatoire !");

        try {
            const response = await fetch('http://localhost:5000/api/decks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            });

            if (response.ok) {
                setTitle(''); // Vide le champ titre
                setDescription(''); // Vide le champ description
                fetchDecks(); // Rafraîchit immédiatement la liste des paquets à l'écran
            }
        } catch (error) {
            console.error("Erreur lors de la création du paquet :", error);
        }
    };

    return (
        <div className="container">
            <h1>📚 Mes Paquets de Révision (Decks)</h1>
            
            {/* BLOC FORMULAIRE D'AJOUT */}
            <form onSubmit={handleCreateDeck} style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h3>Créer un nouveau paquet de cartes</h3>
                <div className="form-group">
                    <label>Titre du paquet :</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Syntaxe Kotlin" />
                </div>
                <div className="form-group">
                    <label>Description :</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ex: Formules fondamentales pour l'examen" />
                </div>
                <button type="submit">Créer le paquet</button>
            </form>

            {/* GRILLE D'AFFICHAGE */}
            {decks.length === 0 ? (
                <p>Aucun paquet disponible.</p>
            ) : (
                <div className="deck-grid">
                    {decks.map(deck => (
                        <div key={deck._id} className="deck-card">
                            <h3>{deck.title}</h3>
                            <p>{deck.description}</p>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                <button onClick={() => onSelectDeck(deck, 'manage')}>➕ Gérer les cartes</button>
                                <button style={{ backgroundColor: '#28a745' }} onClick={() => onSelectDeck(deck, 'study')}>🚀 Réviser</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;