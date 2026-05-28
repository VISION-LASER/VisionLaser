import { API_URL } from '../config/api.config';

export interface Bilan {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  date_demande: string;
  statut: string;
  patient_id: number | null;
  created_at: string;
  updated_at: string;
}

export const bilanService = {
  // Récupérer toutes les demandes de bilan
  getAll: async (): Promise<Bilan[]> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/bilans`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des bilans');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Récupérer une demande par ID
  getById: async (id: number): Promise<Bilan> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/bilans/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du bilan');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Créer une nouvelle demande de bilan
  create: async (data: Omit<Bilan, 'id' | 'created_at' | 'updated_at'>): Promise<Bilan> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/bilans`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la création du bilan');
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Mettre à jour le statut ou les données d'une demande
  update: async (id: number, data: Partial<Bilan>): Promise<Bilan> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/bilans/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du bilan');
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Mettre à jour uniquement le statut
  updateStatut: async (id: number, statut: string): Promise<Bilan> => {
    return bilanService.update(id, { statut });
  },

  // Supprimer une demande
  delete: async (id: number): Promise<boolean> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/bilans/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      return response.ok;
    } catch (error) {
      console.error('Erreur:', error);
      return false;
    }
  }
};