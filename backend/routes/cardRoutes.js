const express = require('express');

// IMPORTANT : mergeParams permet de récupérer le :deckId défini dans le routeur parent
const router = express.Router({ mergeParams: true }); 

const { getCardsByDeck, createCard, updateCard, deleteCard } = require('../controllers/cardController');
const requireAuth = require('../middleware/auth');

// Relatif à /api/decks/:deckId/cards
router.route('/')
    .get(requireAuth, getCardsByDeck)   // Récupère toutes les cartes d'un paquet spécifique
    .post(requireAuth, createCard);     // Ajoute une carte au paquet cible

// Relatif à /api/decks/:deckId/cards/:cardId
router.route('/:cardId')
    .put(requireAuth, updateCard)       // Modifie une carte spécifique dans ce paquet
    .delete(requireAuth, deleteCard);   // Supprime une carte spécifique dans ce paquet

module.exports = router;