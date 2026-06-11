const Card = require('../models/Card');
const Deck = require('../models/Deck');

// @desc Récupérer toutes les cartes d'un paquet spécifique
// @route GET /api/decks/:id/cards
exports.getCardsByDeck = async (req, res) => {
    try {
        const deckId = req.params.id;

        // Vérifier d'abord si le paquet existe
        const deckExists = await Deck.findById(deckId);
        if (!deckExists) {
            return res.status(404).json({ message: "Paquet non trouvé" });
        }

        // Trouver toutes les cartes qui possèdent ce deckId
        const cards = await Card.find({ deckId: deckId });
        
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la récupération des cartes",
            error: error.message 
        });
    }
};

// @desc Ajouter une carte à un paquet cible
// @route POST /api/decks/:id/cards
exports.addCardToDeck = async (req, res) => {
    try {
        const deckId = req.params.id;
        const { front, back } = req.body;
    
        // Vérifier si le paquet cible existe
        const deckExists = await Deck.findById(deckId);
        
        if (!deckExists) {
            return res.status(404).json({ 
                message: "Paquet cible non trouvé" 
            });
        }

        // Validation des champs requis
        if (!front || !back) {
            return res.status(400).json({ 
                message: "Les champs Recto (front) et Verso (back) sont obligatoires" 
            });
        }

        // Création de la carte liée au paquet
        const newCard = new Card({
            deckId: deckId,
            front,
            back
        });

        const savedCard = await newCard.save();
        res.status(201).json(savedCard);
    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de l'ajout de la carte", 
            error: error.message 
        });
    }
};