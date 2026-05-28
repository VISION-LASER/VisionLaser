// Configuration de base pour les appels API
const API_URL = 'http://localhost:3000/api';

// Fonction pour récupérer le token stocké
export const getToken = () => {
    return localStorage.getItem('accessToken');
};

// Fonction pour stocker les tokens après connexion
export const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};

// Fonction pour supprimer les tokens (déconnexion)
export const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

// Fonction pour les requêtes authentifiées
export const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = getToken();
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers
    });

    // Si token expiré (403), essayer de le rafraîchir
    if (response.status === 403) {
        const newToken = await refreshAccessToken();
        if (newToken) {
            // Réessayer avec le nouveau token
            const newHeaders = {
                ...headers,
                'Authorization': `Bearer ${newToken}`
            };
            return fetch(`${API_URL}${url}`, {
                ...options,
                headers: newHeaders
            });
        }
    }

    return response;
};

// Fonction pour rafraîchir le token
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    try {
        const response = await fetch(`${API_URL}/users/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            return data.accessToken;
        }
    } catch (error) {
        console.error('Erreur refresh token:', error);
    }
    return null;
};