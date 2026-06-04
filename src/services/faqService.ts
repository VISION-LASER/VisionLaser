import { API_BASE_URL, API_URL } from '../config/api.config';

export interface FAQ {
  id: number;
  question: string;
  reponse_faq: string[];  // ← IMPORTANT: Tableau de strings
  admin_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface FAQFormData {
  question: string;
  reponse_faq: string[];  // ← IMPORTANT: Tableau de strings
  admin_id?: number;
}

type FaqApiResponse = Omit<Partial<FAQ>, 'reponse_faq'> & {
  reponse_faq?: unknown;
};

const normalizeFaqAnswers = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((answer): answer is string => typeof answer === 'string' && answer.trim() !== '');
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((answer): answer is string => typeof answer === 'string' && answer.trim() !== '');
      }
    } catch {
      return value.trim() ? [value] : [];
    }
  }

  return [];
};

const mapFaqResponse = (faqs: unknown): FAQ[] =>
  (Array.isArray(faqs) ? faqs : []).map((faq: FaqApiResponse) => ({
    ...faq,
    reponse_faq: normalizeFaqAnswers(faq.reponse_faq)
  } as FAQ));

export const faqService = {
    //  NOUVELLE MÉTHODE : Récupérer les FAQ publiques (sans authentification)
  getPublicAll: async (): Promise<FAQ[]> => {
    try {
      const response = await fetch(`${API_URL}/faq`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des FAQ');
      }
      
      const result = await response.json();
      const faqs = result.data || result;
      
      return (Array.isArray(faqs) ? faqs : []).map((faq: any) => ({
        ...faq,
        reponse_faq: Array.isArray(faq.reponse_faq) ? faq.reponse_faq : []
      }));
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  getAll: async (): Promise<FAQ[]> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/faq`, {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des FAQ');
      }
      
      const result = await response.json();
      const faqs = result.data || result;
      
      return mapFaqResponse(faqs);
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  getById: async (id: number): Promise<FAQ> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/faq/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de la FAQ');
      }
      
      const result = await response.json();
      const faq = result.data || result;
      
      return {
        ...faq,
        reponse_faq: normalizeFaqAnswers(faq.reponse_faq)
      };
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  create: async (data: Omit<FAQFormData, 'id'>): Promise<FAQ> => {
    try {
      const token = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      const validAnswers = (data.reponse_faq || []).filter(answer => answer && answer.trim() !== '');
      
      const payload = {
        question: data.question,
        reponse_faq: validAnswers,
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
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la création');
      }
      
      const result = await response.json();
      const newFaq = result.data || result;
      
      return {
        ...newFaq,
        reponse_faq: normalizeFaqAnswers(newFaq.reponse_faq)
      };
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  update: async (id: number, data: Partial<FAQFormData>): Promise<FAQ> => {
    try {
      const token = localStorage.getItem('accessToken');
      
      const payload: Partial<FAQFormData> = {};
      if (data.question !== undefined) payload.question = data.question;
      if (data.reponse_faq !== undefined) {
        payload.reponse_faq = data.reponse_faq.filter(answer => answer && answer.trim() !== '');
      }
      if (data.admin_id !== undefined) payload.admin_id = data.admin_id;
      
      const response = await fetch(`${API_URL}/faq/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la mise à jour');
      }
      
      const result = await response.json();
      const updatedFaq = result.data || result;
      
      return {
        ...updatedFaq,
        reponse_faq: normalizeFaqAnswers(updatedFaq.reponse_faq)
      };
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

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
