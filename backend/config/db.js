const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Vérifie que la variable d'environnement existe
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI manquante dans les variables d’environnement');
        }

        const isProd = process.env.NODE_ENV === 'production';
        const uri = process.env.MONGO_URI;

        await mongoose.connect(uri);

        console.log(
            `Base de données connectée sur : ${
                isProd ? 'PRODUCTION (MongoDB Atlas)' : 'LOCAL'
            }`
        );

    } catch (error) {
        console.error(`Erreur de connexion MongoDB : ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;