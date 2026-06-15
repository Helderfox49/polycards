// Définition automatique de l'URL selon l'environnement
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://polycards.onrender.com' 
  : 'http://localhost:5000';