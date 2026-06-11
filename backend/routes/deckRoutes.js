const express = require('express');
const router = express.Router();

// Importation des contrôleurs
const { getDecks, createDeck } = require('../controllers/deckController');

// GET /api/decks -> Récupère tous les paquets
router.get('/', getDecks)

// POST /api/decks -> Crée un nouveau paquet
router.post('/', createDeck); 

module.exports = router;