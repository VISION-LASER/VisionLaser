const API_URL = 'http://localhost:3000/api/users';

export interface Tarif {
  id: number;
  technique: string;
  prix: string;
  note: string;
  admin_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface TarifFormData {
  technique: string;
  prix: string;
  note: string;
  admin_id?: number;
}

export const tarifService = {
  // Récupérer tous les tarifs
  getAll: async (): Promise<Tarif[]> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/tarifs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des tarifs');
      }
      
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Créer un tarif
  create: async (data: Omit<TarifFormData, 'id'>): Promise<Tarif> => {
    try {
      const token = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      const payload = {
        ...data,
        admin_id: user?.id || null
      };
      
      const response = await fetch(`${API_URL}/tarifs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la création du tarif');
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Mettre à jour un tarif
  update: async (id: number, data: Partial<TarifFormData>): Promise<Tarif> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/tarifs/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du tarif');
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Supprimer un tarif
  delete: async (id: number): Promise<boolean> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/tarifs/${id}`, {
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