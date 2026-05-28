const API_URL = 'http://localhost:3000/api/users';

export interface Horaire {
  id: number;
  jour: string;
  ouverture: string;
  fermeture: string;
  ferme: boolean;
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
      return data.data || data;
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
        throw new Error('Erreur lors de la mise à jour de l\'horaire');
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }
};