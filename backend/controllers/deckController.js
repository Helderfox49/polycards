const Deck = require('../models/Deck');
const Card = require('../models/Card');

// 1. Récupérer uniquement les paquets de l'utilisateur connecté
const getMyDecks = async (req, res) => {
    try {
        const userId = req.auth.userId; // Extrait en toute sécurité par le middleware

        // Filtrage strict par userId
        const decks = await Deck.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: decks, // Ce tableau sera intercepté et contrôlé sur le Front-end (.length > 0)
            message: "Paquets récupérés avec succès."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Impossible de récupérer vos paquets.",
            error: error.message
        });
    }
};

// 2. Création d'un paquet rattaché à l'utilisateur connecté
const createDeck = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Le titre du paquet est obligatoire."
            });
        }

        const newDeck = await Deck.create({
            userId,
            title,
            description
        });

        return res.status(201).json({
            success: true,
            data: newDeck,
            message: "Nouveau paquet créé avec succès."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Échec de la création du paquet.",
            error: error.message
        });
    }
};

const updateDeck = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const userId = req.auth.userId;

        const updatedDeck = await Deck.findOneAndUpdate(
            { _id: id, userId }, // Sécurité : on vérifie que le deck appartient bien à l'utilisateur
            { title, description },
            { new: true }
        );

        if (!updatedDeck) {
            return res.status(404).json({ success: false, message: "Paquet introuvable ou accès refusé." });
        }

        return res.status(200).json({
            success: true,
            data: updatedDeck,
            message: "Paquet mis à jour avec succès."
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Erreur de mise à jour.", error: error.message });
    }
};

const deleteDeck = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.auth.userId;

        const deckToDelete = await Deck.findOne({ _id: id, userId });
        
        if (!deckToDelete) {
            return res.status(404).json({ success: false, message: "Paquet introuvable ou accès refusé." });
        }

        // SUPPRESSION EN CASCADE : On supprime toutes les cartes liées à ce deck
        await Card.deleteMany({ deckId: id });
        
        // Suppression du deck lui-même
        await deckToDelete.deleteOne();

        return res.status(200).json({
            success: true,
            data: null,
            message: "Paquet et cartes associées supprimés définitivement."
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Erreur de suppression.", error: error.message });
    }
};

const getDeckById = async (req, res) => {
    try {
        const { deckId } = req.params;

        // 1. Recherche du paquet par son identifiant unique
        const deck = await Deck.findById(deckId);

        // 2. Si le paquet n'existe pas en base de données
        if (!deck) {
            return res.status(404).json({
                success: false,
                message: "Le paquet demandé est introuvable."
            });
        }

        // 3. Succès : Envoi des données au format attendu par le Frontend
        return res.status(200).json({
            success: true,
            data: deck
        });

    } catch (error) {
        // Gestion des IDs malformés par Mongoose (CastError) ou crash serveur
        console.error("Erreur dans getDeckById :", error.message);
        
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: "Format de l'identifiant du paquet invalide."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Erreur serveur lors de la récupération du paquet."
        });
    }
};
module.exports = { getMyDecks, createDeck, updateDeck, deleteDeck, getDeckById };