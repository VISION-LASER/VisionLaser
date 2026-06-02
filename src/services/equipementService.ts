import { API_URL, API_URL_ROOT } from '../config/api.config';

export interface Equipement {
  id: number;
  nom: string;
  desc_equipement: string;
  image_equipement: string;
  admin_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface EquipementFormData {
  nom: string;
  desc_equipement: string;
  image_equipement: string;
  admin_id?: number;
}

export const equipementService = {
  // Récupérer tous les équipements
  getAll: async (): Promise<Equipement[]> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/equipements`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des équipements');
      }
      
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Créer un équipement
  create: async (data: Omit<EquipementFormData, 'id'>): Promise<Equipement> => {
    try {
      const token = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      const payload = {
        ...data,
        admin_id: user?.id || null
      };
      
      const response = await fetch(`${API_URL}/equipements`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'équipement');
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Mettre à jour un équipement
  update: async (id: number, data: Partial<EquipementFormData>): Promise<Equipement> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/equipements/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'équipement');
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Supprimer un équipement
  delete: async (id: number): Promise<boolean> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/equipements/${id}`, {
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
  },

  // Upload d'image pour équipement
  uploadImage: async (file: File): Promise<string> => {
    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch(`${API_URL}/upload/equipement`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de l\'upload');
      }
      
      const result = await response.json();
      return `${API_URL_ROOT}${result.imageUrl}`;
    } catch (error) {
      console.error('Erreur upload:', error);
      throw error;
    }
  }
};