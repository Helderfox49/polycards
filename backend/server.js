const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Importation des routes d'API
const deckRoutes = require('./routes/deckRoutes');
const cardRoutes = require('./routes/cardRoutes');

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données MongoDB Atlas
connectDB();

const app = express();


// Configuration dynamique des CORS pour autoriser uniquement Vercel (ou localhost)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json()); // Permet à Express de lire le format JSON envoyé par le client

// Déclaration de la route de base pour l'API PolyCards
app.use('/api/decks', deckRoutes);
// app.use('/api/decks', cardRoutes);

// Route de test pour vérifier que le serveur tourne
app.get('/', (req, res) => {
    res.send("L'API de PolyCards fonctionne correctement !");
});

// Définition du port d'écoute
// Port dynamique injecté par Render, ou 5000 en local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur actif sur le port ${PORT}`));