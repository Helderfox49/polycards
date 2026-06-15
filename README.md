
# 📚 PolyCards — Application Full-Stack de Flashcards de Révision

## 🎓 Cadre Académique

Projet d'ingénierie logicielle réalisé dans le cadre du cours **IDE & Frameworks** (Année Académique 2025-2026) au Département d'Informatique et des Télécommunications de l'École Nationale Supérieure Polytechnique de Maroua (**ENSPM**, Université de Maroua).

## 🎯 But de l'Application

PolyCards est une plateforme numérique d'apprentissage en ligne permettant de structurer ses révisions par paquets thématiques de cartes mémoires interactives dotées d'un système de retournement en 3D pour optimiser la mémorisation de concepts techniques.

----------

## 🏗️ Architecture & Technologies Utilisées

L'application repose sur une architecture découplée de type **MERN** (sans Node-sass ni routage externe lourd) :

-   **Base de Données :** MongoDB Atlas (Cloud NoSQL) pour le stockage des documents.
    
-   **ODM :** Mongoose pour la modélisation et la validation des schémas.
    
-   **Back-End :** Node.js & Express pour l'exposition d'une API RESTful standard.
    
-   **Front-End :** React.js & Vite pour une interface Single Page Application (SPA) réactive.
    
-   **Animations :** CSS 3D natif (`perspective`, `rotateY`) pour le retournement des fiches sans bibliothèque tierce.
    

----------

## 📁 Arborescence du Projet

```text
## 📁 Arborescence du Projet et Rôle des Répertoires

```text
polycards/
├── backend/                  # --- PARTIE SERVEUR & API ---
│   ├── config/               # Configuration des modules externes
│   │   └── db.js             # Script de connexion asynchrone à MongoDB Atlas
│   ├── controllers/          # Logique métier et manipulation des modèles
│   │   ├── cardController.js # Gestion des requêtes des cartes (GET, POST)
│   │   └── deckController.js # Gestion des requêtes des paquets (GET, POST)
│   ├── models/               # Schémas de données (Modèles Mongoose)
│   │   ├── Card.js           # Structure d'un document "Carte"
│   │   └── Deck.js           # Structure d'un document "Paquet"
│   ├── routes/               # Mappage des URL RESTful
│   │   └── deckRoutes.js     # Routes d'aiguillage pour /api/decks
│   ├── .env                  # Variables d'environnement secrètes (PORT, URI Atlas)
│   ├── seed.js               # Script d'automatisation du peuplement de test (Seeding)
│   └── server.js             # Point d'entrée principal de l'API Express
│
└── frontend/                 # --- PARTIE CLIENT INTERFACE ---
    ├── src/
    │   ├── components/       # Composants modulaires React
    │   │   ├── Home.jsx      # Page d'accueil (Grille des Decks & Formulaire)
    │   │   ├── DeckManager.jsx # Panneau d'administration et d'ajout de cartes
    │   │   ├── StudySession.jsx# Moteur algorithmique et machine à état du mode révision
    │   │   └── Flashcard.jsx # Composant graphique muet doté de la rotation 3D
    │   ├── App.jsx           # Orchestrateur central et navigation par état de l'application
    │   ├── index.css         # Styles globaux et animations de transition 3D en CSS pur
    │   └── main.jsx          # Point d'ancrage de React dans le DOM HTML
    └── vite.config.js        # Configuration de l'outillage Vite

```

## 🗃️ Modèle de la Base de Données

La persistance s'appuie sur deux collections liées par une référence d'identifiant unique.

### Collection `decks`

```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "createdAt": "date"
}

```

### Collection `cards`

```json
{
  "_id": "ObjectId",
  "deckId": "ObjectId",
  "front": "string",
  "back": "string"
}

```

`deckId` référence le paquet parent auquel appartient la carte.

----------

## 🧩 Rôle des Composants React

### App.jsx

Centralise la navigation globale de l'application via un état conditionnel déterminant l'affichage de l'écran actif.

### Home.jsx

Récupère tous les paquets depuis l'API pour les afficher sous forme de grille et intègre le formulaire de création de deck.

### DeckManager.jsx

Gère l'administration d'un paquet sélectionné en listant ses cartes et en permettant l'ajout de nouvelles fiches.

### StudySession.jsx

Pilote la machine à état de révision plein écran en contrôlant les index et en réinitialisant le sens de la carte lors du défilement.

### Flashcard.jsx
Reçoit les textes des faces et applique la classe CSS de rotation 3D au clic de l'utilisateur.

----------

## 🚀 Lancement Rapide

### 1. Back-End

```bash
cd backend
npm install

```

Créer un fichier `.env` :

```env
MONGO_URI=votre_uri_mongodb_atlas
PORT=5000

```

Initialiser la base :

```bash
npm run seed

```

Lancer le serveur :

```bash
npm run dev

```

Serveur disponible sur :

```text
http://localhost:5000

```

----------

### 2. Front-End

```bash
cd frontend
npm install
npm run dev

```

Application disponible sur :

```text
http://localhost:5173

```

----------

## ✅ Fonctionnalités Principales

-   Création de paquets de révision (Decks).
    
-   Consultation de tous les paquets disponibles.
    
-   Ajout de cartes mémoire dans un paquet.
    
-   Session de révision immersive plein écran.
    
-   Animation de retournement 3D des cartes.
    
-   Architecture Full-Stack MERN.
    
-   API RESTful découplée.
    
-   Base de données MongoDB Atlas.
    

----------

## 📄 Licence

Projet académique réalisé exclusivement dans le cadre du cours **IDE & Frameworks** à l'ENSPM (Université de Maroua) pour l'année académique **2025-2026**.