const express = require('express');
const router = express.Router();

// Importation des contrôleurs
const { getDecks, createDeck } = require('../controllers/deckController');
const { getCardsByDeck, addCardToDeck } = require('../controllers/cardController');

// Routes pour la gestion globale des Decks
router.route('/')
    .get(getDecks) // GET /api/decks -> Récupère tous les paquets
    .post(createDeck); // POST /api/decks -> Crée un nouveau paquet

// Routes pour la gestion des cartes liées à un Deck spécifique
router.route('/:id/cards')
    .get(getCardsByDeck) // GET /api/decks/:id/cards -> Récupère les cartes d'un paquet
    .post(addCardToDeck); // POST /api/decks/:id/cards -> Ajoute une carte au paquet

module.exports = router;