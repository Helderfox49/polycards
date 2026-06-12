import React, { useState, useEffect } from 'react';

function DeckManager({ deck, onBack }) {

  const [cards, setCards] = useState([]);

  // États locaux pour contrôler les champs du formulaire réactif
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Fonction de récupération des cartes réelles associées à ce paquet
  const fetchCards = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/decks/${deck._id}/cards`
      );

      const data = await res.json();

      setCards(data);

    } catch (err) {
      console.error("Erreur API cards :", err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [deck._id]);

  // Gestion de la soumission asynchrone du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/decks/${deck._id}/cards`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            question,
            answer
          })
        }
      );

      if (response.ok) {
        setQuestion("");
        setAnswer("");

        // Rechargement de la liste
        fetchCards();
      }

    } catch (err) {
      console.error("Erreur insertion carte :", err);
    }
  };

  return (
    <div className="container">

      <button
        onClick={onBack}
        style={{
          marginBottom: '20px',
          backgroundColor: '#6c757d'
        }}
      >
        ⬅️ Retour
      </button>

      <h2>⚙️ Gestion : {deck.title}</h2>

      {/* Formulaire contrôlé réactif */}
      <form
        onSubmit={handleSubmit}
        className="deck-card"
        style={{ marginBottom: '30px' }}
      >

        <h3>➕ Ajouter une nouvelle carte</h3>

        <div className="form-group">
          <label>Question (Recto) :</label>

          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Réponse (Verso) :</label>

          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          Enregistrer la carte
        </button>

      </form>

      <h3>📂 Cartes du paquet ({cards.length})</h3>

      <div className="deck-grid">

        {cards.map(card => (
          <div key={card._id} className="deck-card">

            <p>
              <strong>Q :</strong> {card.question}
            </p>

            <p>
              <strong>R :</strong> {card.answer}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default DeckManager;