import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

function Home({ onSelectDeck }) {
    const [decks, setDecks] = useState([]);
    // Nouveaux états pour le formulaire de création
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const fetchDecks = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/decks`);
            const res = await response.json();
            setDecks(res.data); 
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
            const response = await fetch(`${API_BASE_URL}/api/decks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            });

            const res = await response.json();

            if (res.success) {
                setTitle("");
                setDescription("");
                fetchDecks();
            } else {
                alert(res.message || "Erreur création deck");
            }
        } catch (error) {
            console.error("Erreur lors de la création du paquet :", error);
        }
    };

    return (
        <div className="container">
            <h1> Mes Paquets de Révision (Decks)</h1>
            
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
            {!Array.isArray(decks) || decks.length === 0 ? ( //Protection du render pour éviter le crash au cas ou on ne charge pas decks dans le tableau
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