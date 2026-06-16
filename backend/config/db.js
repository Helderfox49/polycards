const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "test"
        });
        console.log(`MongoDB Connecté : ${conn.connection.host}`);
        // console.log(`MongoDB connecté sur la base de données : ${conn.connection.db.namespace}`);
    } catch (error) {
        console.error(`Erreur de connexion : ${error.message}`);
        process.exit(1); // Arrête le serveur en cas d'échec
    }
};

module.exports = connectDB;