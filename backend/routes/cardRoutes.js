const express = require('express');
const router = express.Router();

// Importation des contrôleurs
const { getCardsByDeck, addCardToDeck } = require('../controllers/cardController');

// GET /api/decks/:id/cards -> Récupère les cartes d'un paquet
router.get('/:id/cards', getCardsByDeck) 

// POST /api/decks/:id/cards -> Ajoute une carte au paquet
router.post('/:id/cards', addCardToDeck); 

module.exports = router;