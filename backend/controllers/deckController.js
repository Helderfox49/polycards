const Deck = require('../models/Deck');

// @desc Récupérer tous les paquets
// @route GET /api/decks
exports.getDecks = async (req, res) => {
    try {
        const decks = await Deck.find(); // Récupère tous les paquets
        res.status(200).json({
            success: true,
            data: decks
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Erreur lors de la récupération des paquets", 
            error: error.message 
        });
    }
};

// @desc Créer un nouveau paquet
// @route POST /api/decks
exports.createDeck = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validation minimale requise par le cahier des charges
        if (!title) {
            return res.status(400).json({ 
                message: "Le titre du paquet est obligatoire" });
            }
        
        const newDeck = new Deck({ title, description });
        const savedDeck = await newDeck.save(); // Enregistrement en BDD
        
        res.status(201).json({
            success: true,
            data: savedDeck});
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Erreur lors de la création du paquet", 
            error: error.message 
        });
    }
};