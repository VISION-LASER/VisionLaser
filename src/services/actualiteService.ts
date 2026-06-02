import { API_URL, API_URL_ROOT } from '../config/api.config';

export interface Actualite {
  id: number;
  titre: string;
  description: string;
  image_actualite: string | null;
  video_actualite: string | null;
  date_publication: string;
  admin_id: number | null;
  created_at: string;
  updated_at: string;
  reactions_count?: number;
  commentaires_count?: number;
}

export interface ActualiteFormData {
  titre: string;
  description: string;
  image_actualite?: string | null;
  video_actualite?: string | null;
  date_publication?: string;
  admin_id?: number;
}

// export interface Reaction {
//   id: number;
//   type_reaction: string;
//   date_reaction: string;
//   actualite_id: number;
//   patient_id: number;
//   patient_nom?: string;
// }
export interface Reaction {
  id: number;
  type_reaction: string;
  date_reaction: string;
  actualite_id: number;
  patient_id: number;
  patient_nom?: string;
  patient_prenoms?: string;
}

// export interface Commentaire {
//   id: number;
//   commentaire: string;
//   date_commentaire: string;
//   actualite_id: number;
//   patient_id: number;
//   patient_nom?: string;
//   created_at: string;
//   updated_at: string;
// }
export interface Commentaire {
  id: number;
  commentaire: string;
  date_commentaire: string;
  actualite_id: number;
  patient_id: number;
  patient_nom?: string;
  patient_prenoms?: string;
  created_at: string;
  updated_at: string;
}

export const actualiteService = {
  // Récupérer toutes les actualités avec leurs compteurs
// getAll: async (): Promise<Actualite[]> => {
//   try {
//     const token = localStorage.getItem('accessToken');
//     const response = await fetch(`${API_URL}/actualites`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });
    
//     if (!response.ok) {
//       throw new Error('Erreur lors de la récupération des actualités');
//     }
    
//     const data = await response.json();
//     const actualites = data.data || data;
    
//     // Pour chaque actualité, récupérer les compteurs
//     const actualitesWithCounts = await Promise.all(
//       actualites.map(async (actualite: Actualite) => {
//         const [reactionsCount, commentsCount] = await Promise.all([
//           actualiteService.getReactionsCount(actualite.id),
//           actualiteService.getCommentairesCount(actualite.id)
//         ]);
//         return {
//           ...actualite,
//           reactions_count: reactionsCount,
//           commentaires_count: commentsCount
//         };
//       })
//     );
    
//     return actualitesWithCounts;
//   } catch (error) {
//     console.error('Erreur:', error);
//     throw error;
//   }
// },

// Récupérer toutes les actualités (route publique - pas besoin de token)
getAll: async (): Promise<Actualite[]> => {
  try {
    // Pas besoin de token pour les routes publiques
    const response = await fetch(`${API_URL}/actualites`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des actualités');
    }
    
    const data = await response.json();
    const actualites = data.data || data;
    
    // Pour chaque actualité, récupérer les compteurs (routes publiques aussi)
    const actualitesWithCounts = await Promise.all(
      actualites.map(async (actualite: Actualite) => {
        const [reactionsCount, commentsCount] = await Promise.all([
          actualiteService.getReactionsCount(actualite.id),
          actualiteService.getCommentairesCount(actualite.id)
        ]);
        return {
          ...actualite,
          reactions_count: reactionsCount,
          commentaires_count: commentsCount
        };
      })
    );
    
    return actualitesWithCounts;
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
},

    // Récupérer le nombre de réactions pour une actualité
  getReactionsCount: async (actualiteId: number): Promise<number> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/reactions/count?actualite_id=${actualiteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        return 0;
      }
      
      const data = await response.json();
      return data.count || 0;
    } catch (error) {
      console.error('Erreur:', error);
      return 0;
    }
  },

  // Récupérer le nombre de commentaires pour une actualité
  getCommentairesCount: async (actualiteId: number): Promise<number> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/commentaires/count?actualite_id=${actualiteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        return 0;
      }
      
      const data = await response.json();
      return data.count || 0;
    } catch (error) {
      console.error('Erreur:', error);
      return 0;
    }
  },

  // Récupérer une actualité avec ses réactions et commentaires
  getById: async (id: number): Promise<Actualite> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/actualites/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'actualité');
      }
      
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Créer une actualité
  create: async (data: ActualiteFormData): Promise<Actualite> => {
    try {
      const token = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      const payload = {
        ...data,
        admin_id: user?.id || null,
        date_publication: data.date_publication || new Date().toISOString().split('T')[0]
      };
      
      const response = await fetch(`${API_URL}/actualites`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'actualité');
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Mettre à jour une actualité
  update: async (id: number, data: Partial<ActualiteFormData>): Promise<Actualite> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/actualites/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'actualité');
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Supprimer une actualité
  delete: async (id: number): Promise<boolean> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/actualites/${id}`, {
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

  // Upload d'image pour actualité
  uploadImage: async (file: File): Promise<string> => {
    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch(`${API_URL}/upload/actualite/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de l\'upload de l\'image');
      }
      
      const result = await response.json();
      return `${API_URL_ROOT}${result.imageUrl}`;
    } catch (error) {
      console.error('Erreur upload image:', error);
      throw error;
    }
  },

  // Upload de vidéo pour actualité
  uploadVideo: async (file: File): Promise<string> => {
    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('video', file);
      
      const response = await fetch(`${API_URL}/upload/actualite/video`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de l\'upload de la vidéo');
      }
      
      const result = await response.json();
      return `${API_URL_ROOT}${result.videoUrl}`;
    } catch (error) {
      console.error('Erreur upload vidéo:', error);
      throw error;
    }
  },

  // Récupérer les réactions d'une actualité avec les infos patient
  getReactions: async (actualiteId: number): Promise<Reaction[]> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/reactions?actualite_id=${actualiteId}&withPatient=true`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des réactions');
      }
      
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Erreur:', error);
      return [];
    }
  },

  // Récupérer les commentaires d'une actualité avec les infos patient
  getCommentaires: async (actualiteId: number): Promise<Commentaire[]> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/commentaires?actualite_id=${actualiteId}&withPatient=true`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des commentaires');
      }
      
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Erreur:', error);
      return [];
    }
  },
};