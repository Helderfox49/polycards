const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Routes
const deckRoutes = require('./routes/deckRoutes');
const cardRoutes = require('./routes/cardRoutes');

// Charger les variables d'environnement
dotenv.config();

// Connexion DB (MongoDB Atlas ou local)
connectDB();

const app = express();

/* =======================
   CORS CONFIG PROPRE
======================= */
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
    })
);

/* =======================
   MIDDLEWARES
======================= */
app.use(express.json({ limit: '10mb' })); // utile pour gros textes / cartes

/* =======================
   ROUTES API
======================= */
app.use('/api/decks', deckRoutes);
// app.use('/api/cards', cardRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "API PolyCards opérationnelle 🚀",
    });
});

/* =======================
   ERROR HANDLER GLOBAL
======================= */
app.use((err, req, res, next) => {
    console.error('Erreur serveur :', err.message);

    res.status(500).json({
        success: false,
        message: 'Erreur serveur',
    });
});

/* =======================
   LANCEMENT SERVEUR
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur actif sur le port ${PORT}`);
});