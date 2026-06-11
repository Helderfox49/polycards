const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données MongoDB Atlas
connectDB();


const app = express();

// Middlewares de base
app.use(cors());
app.use(express.json()); // Permet à Express de lire le format JSON envoyé par le client

// Route de test pour vérifier que le serveur tourne
app.get('/', (req, res) => {
    res.send("L'API de PolyCards fonctionne correctement !");
});

// Définition du port d'écoute
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT} en mode développement.`);
});