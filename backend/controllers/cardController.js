const Card = require('../models/Card');
const Deck = require('../models/Deck');

// 1. GET /api/decks/:deckId/cards
const getCardsByDeck = async (req, res) => {
    try {
        const { deckId } = req.params; // Extrait de l'URL imbriquée
        const userId = req.auth.userId;

        const destinationDeck = await Deck.findOne({ _id: deckId, userId });
        if (!destinationDeck) {
            return res.status(403).json({ success: false, message: "Accès refusé. Ce paquet ne vous appartient pas." });
        }

        const cards = await Card.find({ deckId });
        return res.status(200).json({ success: true, data: cards, message: "Cartes récupérées avec succès." });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Erreur serveur.", error: error.message });
    }
};

// 2. POST /api/decks/:deckId/cards
const createCard = async (req, res) => {
    try {
        const { deckId } = req.params; // Extrait directement de l'URL
        const { front, back } = req.body;
        const userId = req.auth.userId;

        const destinationDeck = await Deck.findOne({ _id: deckId, userId });
        if (!destinationDeck) {
            return res.status(403).json({ success: false, message: "Action non autorisée." });
        }

        const newCard = await Card.create({ deckId, front, back });
        return res.status(201).json({ success: true, data: newCard, message: "Carte ajoutée avec succès." });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Erreur serveur.", error: error.message });
    }
};

// 3. PUT /api/decks/:deckId/cards/:cardId
const updateCard = async (req, res) => {
    try {
        const { deckId, cardId } = req.params; // Double vérification des IDs de la route
        const { front, back } = req.body;
        const userId = req.auth.userId;

        const ownershipCheck = await Deck.findOne({ _id: deckId, userId });
        if (!ownershipCheck) {
            return res.status(403).json({ success: false, message: "Action non autorisée." });
        }

        const updatedCard = await Card.findOneAndUpdate(
            { _id: cardId, deckId },
            { front, back },
            { new: true }
        );

        return res.status(200).json({ success: true, data: updatedCard, message: "Carte modifiée." });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// 4. DELETE /api/decks/:deckId/cards/:cardId
const deleteCard = async (req, res) => {
    try {
        const { deckId, cardId } = req.params;
        const userId = req.auth.userId;

        const ownershipCheck = await Deck.findOne({ _id: deckId, userId });
        if (!ownershipCheck) {
            return res.status(403).json({ success: false, message: "Action non autorisée." });
        }

        await Card.findOneAndDelete({ _id: cardId, deckId });
        return res.status(200).json({ success: true, data: null, message: "Carte supprimée." });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getCardsByDeck, createCard, updateCard, deleteCard };