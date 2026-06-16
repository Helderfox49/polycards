const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Fallback automatique vers localhost si process.env.MONGO_URI est indéfini ou vide
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/polycards';
        
        await mongoose.connect(uri);
        console.log(`Base de données connectée sur : ${uri.includes('127.0.0.1') ? 'LOCAL' : 'PRODUCTION (Atlas)'}`);
    } catch (error) {
        console.error(` Erreur de connexion MongoDB : ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;