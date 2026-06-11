const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    deckId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
        required: true // Réference avec la table Deck
    },
    front: {
        type: String,
        required: [true, "Le texte de la question (Recto) est obligatoire"]
    },
    back: {
        type: String,   
        required: [true, "Le texte de la réponse (Verso) est obligatoire"]
    }
});

module.exports = mongoose.model('Card', CardSchema);