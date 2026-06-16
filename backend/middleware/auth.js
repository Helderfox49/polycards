const { verifyToken } = require('@clerk/backend');

const requireAuth = async (req, res, next) => {
    try {
        // 1. Extraction de l'en-tête Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Accès refusé. Jeton d'authentification manquant."
            });
        }

        // On isole la chaîne du jeton cryptographique
        const token = authHeader.split(' ')[1];

        // 2. Utilisation de la fonction globale verifyToken en lui passant le jeton et la clé secrète
        const decodedToken = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY
        });

        if (!decodedToken || !decodedToken.sub) {
            return res.status(401).json({
                success: false,
                message: "Session expirée ou jeton non valide."
            });
        }

        // 3. Extraction réussie du userId unique de l'étudiant connecté
        req.auth = { userId: decodedToken.sub };
        
        next(); // Autorisation accordée, on passe au contrôleur Mongoose
    } catch (error) {
        // Renvoie le détail précis en cas d'échec de signature du jeton
        return res.status(401).json({
            success: false,
            message: "Erreur lors de la vérification des droits d'accès.",
            error: error.message
        });
    }
};

module.exports = requireAuth;