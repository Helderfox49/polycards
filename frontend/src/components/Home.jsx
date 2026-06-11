import React, { useState, useEffect } from 'react';
function Home({ onSelectDeck }) {
    // 1. Déclaration de l'état pour stocker les paquets de la BDD
    const  [decks, setDecks] = useState([]);
    // 2. Fonction asynchrone qui interroge l'API Express
    const fetchDecks = async () => {
        try {
            // Appel HTTP vers le serveur backend
            const response = await fetch('http://localhost:5000/api/decks');
            const data = await response.json();
            setDecks(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des paquets :', error);
        }
    };
    // 3. Déclenchement automatique de la fonction au chargement de la page
    useEffect(() => {
        fetchDecks();
    }, []);
    return (
        <div className='container'>
            <h1> Mes Paquets de Révision (Decks)</ 📚 h1>
            {decks.length === 0 ? (
                <p>Aucun paquet trouvé. Utilisez le script de peuplement (seed) ou l'interface pour en 
ajouter.</p>
            ) : (
                <div className='deck-grid'>
                    {decks.map(deck => (
                        <div key={deck._id} className='deck-card'>
                            <h3>{deck.title}</h3>
                            <p>{deck.description}</p>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                <button onClick={() => onSelectDeck(deck, 'manage')}> Gérer les cartes</ ➕ button>
                                <button style={{ backgroundColor: '#28a745' }} onClick={() => onSelectDeck(deck, 
'study')}> Réviser</ 🚀 button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Home;