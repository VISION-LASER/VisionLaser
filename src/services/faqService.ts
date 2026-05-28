const API_URL = 'http://localhost:3000/api/users';

export interface FAQ {
  id: number;
  question: string;
  reponse_faq: string;
  admin_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface FAQFormData {
  question: string;
  reponse_faq: string;
  admin_id?: number;
}

export const faqService = {
  // Récupérer toutes les FAQ
  getAll: async (): Promise<FAQ[]> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/faq`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des FAQ');
      }
      
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Créer une FAQ
  create: async (data: Omit<FAQFormData, 'id'>): Promise<FAQ> => {
    try {
      const token = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      const payload = {
        ...data,
        admin_id: user?.id || null
      };
      
      const response = await fetch(`${API_URL}/faq`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la création de la FAQ');
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Mettre à jour une FAQ
  update: async (id: number, data: Partial<FAQFormData>): Promise<FAQ> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/faq/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la FAQ');
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Supprimer une FAQ
  delete: async (id: number): Promise<boolean> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/faq/${id}`, {
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