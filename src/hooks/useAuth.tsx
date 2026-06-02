import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api.config';

interface User {
    id: number;
    nom: string;
    prenoms: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string, role: string) => Promise<{ success: boolean; error?: string }>;
    register: (userData: any) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API URLs


// Fonctions de gestion des tokens
const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};

const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
};

const getToken = () => localStorage.getItem('accessToken');

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Vérifier si l'utilisateur est déjà connecté au chargement
    useEffect(() => {
        const token = getToken();
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Fonction de connexion
    const login = async (email: string, password: string, role: string = 'admin') => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur de connexion');
            }

            setTokens(data.accessToken, data.refreshToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);

            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    };

    // Fonction d'inscription
    const register = async (userData: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur d\'inscription');
            }

            setTokens(data.accessToken, data.refreshToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);

            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    };

    // Déconnexion
    const logout = () => {
        clearTokens();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};