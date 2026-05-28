// Configuration des URLs API
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/users',
  webhookUrl: import.meta.env.VITE_SHEET_WEBHOOK_URL || '',
};

// Export pour faciliter l'utilisation
export const API_URL = API_CONFIG.baseUrl;