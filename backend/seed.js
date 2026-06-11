const mongoose = require('mongoose');
const dotenv = require('dotenv');


const Deck = require('./models/Deck');
const Card = require('./models/Card');

dotenv.config();


const sampleDecks = [
    {
        title: "Les Bases de React",
        description: "Apprendre les fondamentaux de React"
    },
    {
        title: "Angular JS",
        description: "Apprendre les bases d'angular JS"
    },
    {
        title: "Node JS",
        description: "Apprendre Node JS Javscript côté Serveur"
    },
    {
        title: "Commandes Docker",
        description: "Les commandes fondamentales pour gérer les conteneurs et les images."
    }
]

const seedDatabase = async () =>{
    try{
        //Connexion à la base de données
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "polycards"
        });
        console.log(`Connexion reussie à la base de données Atlas ${conn.connection.db.namespace}`);

        //Purge complète de la base de données
        console.log("Nettoyage de la base de données (purge)...");
        await Deck.deleteMany();
        await Card.deleteMany();
        console.log("Base de données vidée avec succès.");

        //Insertion des paquets dans la base de données
        console.log("Insertion des paquets thématiques...");
        const createdDecks = await Deck.insertMany(sampleDecks);
        console.log(`${createdDecks.length} paquets insérés.`);

        //Récupérations des IDs générés pour faire l'association
        reactDeckId = createdDecks[0]._id;
        dockerDeckId = createdDecks[3]._id;

        // Étape D : Définition et insertion des cartes associées aux bons paquets
        console.log("Préparation des cartes mémoire (Flashcards)...");
        const sampleCards = [
            // Cartes pour le paquet Docker
            {
                deckId: dockerDeckId,
                front: "Quelle commande permet de lister tous les conteneurs (actifs et arrêtés) ?",
                back: "docker ps -a"
            },
            {
                deckId: dockerDeckId,
                front: "Comment construire une image à partir d'un Dockerfile dans le dossier courant ?",
                back: "docker build -t nom_de_image ."
            },
            {
                deckId: dockerDeckId,
                front: "Que fait la commande suivante :\n\ndocker run -p 8080:80 nginx",
                back: "Elle lance un conteneur Nginx en redirigeant le port 8080 de la machine hôte vers le port 80 du conteneur."
            },

            // Cartes pour le paquet React
            {
                deckId: reactDeckId,
                front: "Comment initialiser une variable d'état nommée 'compteur' à 0 avec un Hook ?",
                back: "const [compteur, setCompteur] = useState(0);"
            },
            {
                deckId: reactDeckId,
                front: "Dans un useEffect, comment faire pour que l'effet ne s'exécute qu'UNE SEULE FOIS au chargement du composant ?",
                back: "Il faut passer un tableau de dépendances vide [] en deuxième argument :\n\nuseEffect(() => {\n  // code\n}, []);"
            },
            {
                deckId: reactDeckId,
                front: "Qu'est ce que React JS?",
                back: "Une bibliothèque JavaScript pour construire des interfaces utilisateur"
            },
            {
                deckId: reactDeckId,
                front: "Qu'est ce que JSX",
                back: "Une syntaxe qui permet d'écrire du HTML dans du JavaScript"
            }
        ];

        // Insertion des cartes en base de données
        const createdCards = await Card.insertMany(sampleCards);
        console.log(`${createdCards.length} cartes mémoire insérées avec succès !`);

        console.log("--- PEUPLEMENT TERMINÉ AVEC SUCCÈS ---");
        
        // Étape E : Fermeture propre du script
        mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        // En cas d'erreur durant le processus
        console.error("Erreur critique lors du peuplement :", error.message);
        mongoose.connection.close();
        process.exit(1); // Quitte le script avec un code d'erreur
    }
};

// 5. Exécution de la fonction
seedDatabase();
