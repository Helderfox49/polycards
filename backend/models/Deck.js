const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: [true, 'L\'identifiant utilisateur Clerk est requis'] 
    },
    title: {
        type: String,
        required: [true, "Le titre du paquet est obligatoire"]
    },
    description: {  
        type: String,
        required: false
    },
        createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Deck', DeckSchema);