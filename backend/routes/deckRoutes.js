const express = require('express');
const router = express.Router();
const { getMyDecks, createDeck, updateDeck, deleteDeck, getDeckById } = require('../controllers/deckController');
const requireAuth = require('../middleware/auth');

// Importation du routeur des cartes
const cardRouter = require('./cardRoutes');

// RÈGLE DE ROUTAGE IMBRIQUÉ : 
// Tout ce qui commence par /api/decks/:deckId/cards sera redirigé vers cardRouter
router.use('/:deckId/cards', cardRouter);

// Routes classiques pour les paquets
router.route('/')
    .get(requireAuth, getMyDecks)
    .post(requireAuth, createDeck);

router.route('/:id')
    .put(requireAuth, updateDeck)
    .delete(requireAuth, deleteDeck);

router.route('/:deckId')
    .get(requireAuth, getDeckById);

module.exports = router;