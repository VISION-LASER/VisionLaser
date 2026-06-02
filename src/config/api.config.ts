// Configuration des URLs API
// export const API_CONFIG = {
//   baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/users',
//   webhookUrl: import.meta.env.VITE_SHEET_WEBHOOK_URL || '',
// };

// Export pour faciliter l'utilisation
// export const API_URL = API_CONFIG.baseUrl;

// Configuration des URLs API
export const API_CONFIG = {
  // URL de base pour les appels API (avec /users)
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/users',
  
  // URL pour l'API sans /users (pour les routes publiques ou autres)
  baseApiUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  
  // URL racine du serveur (pour les fichiers uploadés)
  baseUrlRoot: import.meta.env.VITE_API_URL_ROOT || 'http://localhost:3000',
  
  webhookUrl: import.meta.env.VITE_SHEET_WEBHOOK_URL || '',
};

// Export pour faciliter l'utilisation
export const API_URL = API_CONFIG.baseUrl;           // http://localhost:3000/api/users
export const API_BASE_URL = API_CONFIG.baseApiUrl;   // http://localhost:3000/api
export const API_URL_ROOT = API_CONFIG.baseUrlRoot;  // http://localhost:3000