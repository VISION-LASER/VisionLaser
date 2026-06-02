import { API_URL } from '../config/api.config';

export interface Horaire {
  id: number;
  jour: string;
  ouverture: string;
  fermeture: string;
  ferme: boolean | number; // Accepte les deux types (boolean de JS et tinyint de MySQL)
  admin_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface HoraireFormData {
  jour: string;
  ouverture: string;
  fermeture: string;
  ferme: boolean;
  admin_id?: number;
}

export const horaireService = {
  // Récupérer tous les horaires
  getAll: async (): Promise<Horaire[]> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/horaires`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des horaires');
      }
      
      const data = await response.json();
      // Gérer différents formats de réponse possibles
      const horaires = data.data || data;
      
      // Convertir les ferme de tinyint (0/1) à boolean si nécessaire
      if (Array.isArray(horaires)) {
        return horaires.map((horaire: any) => ({
          ...horaire,
          ferme: horaire.ferme === 1 || horaire.ferme === true
        }));
      }
      
      return horaires;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Récupérer un horaire par ID
  getById: async (id: number): Promise<Horaire> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/horaires/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'horaire');
      }
      
      const data = await response.json();
      const horaire = data.data || data;
      
      return {
        ...horaire,
        ferme: horaire.ferme === 1 || horaire.ferme === true
      };
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Créer un nouvel horaire
  create: async (data: HoraireFormData): Promise<Horaire> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/horaires`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erreur lors de la création de l\'horaire');
      }
      
      const result = await response.json();
      const horaire = result.data || result;
      
      return {
        ...horaire,
        ferme: horaire.ferme === 1 || horaire.ferme === true
      };
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Mettre à jour un horaire
  update: async (id: number, data: Partial<HoraireFormData>): Promise<Horaire> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/horaires/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erreur lors de la mise à jour de l\'horaire');
      }
      
      const result = await response.json();
      const horaire = result.data || result;
      
      return {
        ...horaire,
        ferme: horaire.ferme === 1 || horaire.ferme === true
      };
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Supprimer un horaire
  delete: async (id: number): Promise<boolean> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/horaires/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'horaire');
      }
      
      return true;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }
};