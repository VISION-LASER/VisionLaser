// import React, { useState } from "react";
// import { Share2, Video, Camera, Globe } from "lucide-react";

// const ActualiteSection: React.FC = () => {
//   const [actualite, setActualite] = useState({
//     titre: "Notre centre vous accompagne",
//     description: "Découvrez la chirurgie laser pour vous libérer de vos lunettes",
//     instagram: "@centre.vision.las",
//     tiktok: "@centre.vision.las",
//     facebook: "CentreVisionLaser"
//   });

//   return (
//     <div className="space-y-6">
//       <div className="mb-6">
//         <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
//           Gestion des actualités
//         </h2>
//         <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
//         <p className="text-gray-500 mt-2">Modifiez le contenu des réseaux sociaux et la description</p>
//       </div>

//       <div className="grid grid-cols-1 gap-6">
//         <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//           <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
//             Titre
//           </label>
//           <input 
//             type="text" 
//             value={actualite.titre}
//             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
//             style={{ borderColor: "#E2E8F0" }}
//           />
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//           <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
//             Description
//           </label>
//           <textarea 
//             rows={4}
//             value={actualite.description}
//             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
//             style={{ borderColor: "#E2E8F0" }}
//           />
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//           <label className="block text-sm font-medium mb-2 flex items-center gap-2" style={{ color: "#0C2340" }}>
//             <Camera size={20} style={{ color: "#C9A84C" }} />
//             Instagram
//           </label>
//           <input 
//             type="text" 
//             value={actualite.instagram}
//             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
//             style={{ borderColor: "#E2E8F0" }}
//           />
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//           <label className="block text-sm font-medium mb-2 flex items-center gap-2" style={{ color: "#0C2340" }}>
//             <Video size={20} style={{ color: "#C9A84C" }} />
//             TikTok
//           </label>
//           <input 
//             type="text" 
//             value={actualite.tiktok}
//             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
//             style={{ borderColor: "#E2E8F0" }}
//           />
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//           <label className="block text-sm font-medium mb-2 flex items-center gap-2" style={{ color: "#0C2340" }}>
//             <Globe size={20} style={{ color: "#C9A84C" }} />
//             Facebook
//           </label>
//           <input 
//             type="text" 
//             value={actualite.facebook}
//             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
//             style={{ borderColor: "#E2E8F0" }}
//           />
//         </div>

//         <div className="flex justify-end">
//           <button 
//             className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
//             style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
//           >
//             Enregistrer les modifications
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActualiteSection;

import React, { useState, useEffect } from "react";
import { 
  Plus, Trash2, Edit2, RefreshCw, X, Image as ImageIcon, 
  Video, Heart, MessageCircle, Calendar, User, ThumbsUp, Play, Upload,
  PlayCircle
} from "lucide-react";
import { actualiteService } from "../../../services/actualiteService";
import type { Actualite, ActualiteFormData, Reaction, Commentaire } from "../../../services/actualiteService";

// ============================================
// FONCTION UTILITAIRE (en dehors du composant)
// ============================================
const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?#]+)/,
    /youtube\.com\/embed\/([^/?]+)/,
    /youtube\.com\/v\/([^/?]+)/,
    /youtube\.com\/shorts\/([^/?]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
const ActualiteSection: React.FC = () => {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActualite, setEditingActualite] = useState<Actualite | null>(null);
  const [formData, setFormData] = useState<ActualiteFormData>({
    titre: "",
    description: "",
    image_actualite: null,
    video_actualite: null
  });
  const [mediaType, setMediaType] = useState<"image" | "video" | "youtube" | "none">("none");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [selectedActualite, setSelectedActualite] = useState<Actualite | null>(null);
  const [showReactions, setShowReactions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [reactionsCounts, setReactionsCounts] = useState<{ [key: number]: number }>({});
  const [commentsCounts, setCommentsCounts] = useState<{ [key: number]: number }>({});

  // Charger les actualités
  const loadActualites = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await actualiteService.getAll();
      setActualites(data);
      
      // Mettre à jour les compteurs
      const newReactionsCounts: { [key: number]: number } = {};
      const newCommentsCounts: { [key: number]: number } = {};
      
      for (const actualite of data) {
        const reactionsCount = await actualiteService.getReactionsCount(actualite.id);
        const commentsCount = await actualiteService.getCommentairesCount(actualite.id);
        newReactionsCounts[actualite.id] = reactionsCount;
        newCommentsCounts[actualite.id] = commentsCount;
      }
      
      setReactionsCounts(newReactionsCounts);
      setCommentsCounts(newCommentsCounts);
    } catch (err) {
      setError("Impossible de charger les actualités");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActualites();
  }, []);

  const handleAdd = () => {
    setEditingActualite(null);
    setFormData({ titre: "", description: "", image_actualite: null, video_actualite: null });
    setMediaType("none");
    setYoutubeUrl("");
    setIsModalOpen(true);
  };

  const handleEdit = (actualite: Actualite) => {
    setEditingActualite(actualite);
    setFormData({
      titre: actualite.titre,
      description: actualite.description,
      image_actualite: actualite.image_actualite,
      video_actualite: actualite.video_actualite
    });
    
    if (actualite.video_actualite && (actualite.video_actualite.includes('youtube.com') || actualite.video_actualite.includes('youtu.be'))) {
      setMediaType("youtube");
      setYoutubeUrl(actualite.video_actualite);
    } else if (actualite.image_actualite) {
      setMediaType("image");
      setYoutubeUrl("");
    } else if (actualite.video_actualite) {
      setMediaType("video");
      setYoutubeUrl("");
    } else {
      setMediaType("none");
      setYoutubeUrl("");
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number, titre: string) => {
    if (window.confirm(`Supprimer l'actualité "${titre}" ?`)) {
      try {
        const success = await actualiteService.delete(id);
        if (success) {
          await loadActualites();
        } else {
          setError("Erreur lors de la suppression");
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError("Erreur lors de la suppression");
      }
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    
    if (type === "image" && !validImageTypes.includes(file.type)) {
      setError("Format d'image non supporté (JPG, PNG, GIF, WEBP)");
      return;
    }
    if (type === "video" && !validVideoTypes.includes(file.type)) {
      setError("Format vidéo non supporté (MP4, WEBM, OGG)");
      return;
    }
    
    if (file.size > 50 * 1024 * 1024) {
      setError("Le fichier ne doit pas dépasser 50MB");
      return;
    }

    setUploading(true);
    try {
      let url: string;
      if (type === "image") {
        url = await actualiteService.uploadImage(file);
        setFormData(prev => ({
          ...prev,
          image_actualite: url,
          video_actualite: null
        }));
      } else {
        url = await actualiteService.uploadVideo(file);
        setFormData(prev => ({
          ...prev,
          image_actualite: null,
          video_actualite: url
        }));
      }
      setMediaType(type);
      setYoutubeUrl("");
    } catch (err) {
      console.error("Erreur upload:", err);
      setError("Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  const handleYoutubeUrlChange = (url: string) => {
    setYoutubeUrl(url);
    if (url.trim()) {
      setFormData(prev => ({
        ...prev,
        image_actualite: null,
        video_actualite: url.trim()
      }));
      setMediaType("youtube");
    } else {
      setFormData(prev => ({
        ...prev,
        video_actualite: null
      }));
      setMediaType("none");
    }
  };

  const removeMedia = () => {
    setFormData(prev => ({
      ...prev,
      image_actualite: null,
      video_actualite: null
    }));
    setMediaType("none");
    setYoutubeUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titre.trim()) {
      setError("Le titre est requis");
      return;
    }
    if (!formData.description.trim()) {
      setError("La description est requise");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (editingActualite) {
        await actualiteService.update(editingActualite.id, formData);
      } else {
        await actualiteService.create(formData);
      }
      setIsModalOpen(false);
      await loadActualites();
    } catch (err) {
      console.error("Erreur:", err);
      setError("Erreur lors de l'enregistrement");
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewReactions = async (actualite: Actualite) => {
    setSelectedActualite(actualite);
    setLoadingDetails(true);
    setShowReactions(true);
    try {
      const data = await actualiteService.getReactions(actualite.id);
      setReactions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleViewComments = async (actualite: Actualite) => {
    setSelectedActualite(actualite);
    setLoadingDetails(true);
    setShowComments(true);
    try {
      const data = await actualiteService.getCommentaires(actualite.id);
      setCommentaires(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetails(false);
    }
  };

  // ============================================
  // COMPOSANT INTERNE MediaRenderer
  // ============================================
  const MediaRenderer = ({ actualite }: { actualite: Actualite }) => {
    if (actualite.image_actualite) {
      return (
        <img
          src={actualite.image_actualite}
          alt={actualite.titre}
          className="w-full object-cover max-h-[400px]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Image+non+disponible';
          }}
        />
      );
    }
    
    if (actualite.video_actualite) {
      // Vérifier si c'est une URL YouTube
      if (actualite.video_actualite.includes('youtube.com') || actualite.video_actualite.includes('youtu.be')) {
        let embedUrl = actualite.video_actualite;
        const videoId = getYouTubeId(actualite.video_actualite);
        if (videoId) {
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
        
        return (
          <div className="relative pb-[56.25%] h-0 overflow-hidden">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={embedUrl}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
      
      // Vidéo locale
      return (
        <div className="relative bg-gray-900">
          <video 
            className="w-full max-h-[400px] object-cover"
            controls
          >
            <source src={actualite.video_actualite} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Play size={48} className="text-white opacity-50" />
          </div>
        </div>
      );
    }
    
    return null;
  };

  // ============================================
  // COMPOSANT INTERNE ActualiteCard
  // ============================================
  const ActualiteCard = ({ actualite }: { actualite: Actualite }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C9A84C] to-[#D4B86A] flex items-center justify-center">
          <span className="text-white text-sm font-bold">CVL</span>
        </div>
        <div>
          <h3 className="font-semibold text-sm" style={{ color: "#0C2340" }}>Centre Vision Laser</h3>
          <p className="text-xs text-gray-400">
            {new Date(actualite.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <MediaRenderer actualite={actualite} />

      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={() => handleViewReactions(actualite)}
            className="flex items-center gap-1.5 text-sm transition-all hover:scale-110"
            style={{ color: "#C9A84C" }}
          >
            <Heart size={22} fill="currentColor" className="text-[#C9A84C]" />
            <span className="text-sm font-medium" style={{ color: "#0C2340" }}>
              {reactionsCounts[actualite.id] || 0}
            </span>
          </button>
          <button
            onClick={() => handleViewComments(actualite)}
            className="flex items-center gap-1.5 text-sm transition-all hover:scale-110"
            style={{ color: "#C9A84C" }}
          >
            <MessageCircle size={22} />
            <span className="text-sm font-medium" style={{ color: "#0C2340" }}>
              {commentsCounts[actualite.id] || 0}
            </span>
          </button>
        </div>

        <h3 className="font-semibold text-base mb-1" style={{ color: "#0C2340" }}>
          {actualite.titre}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {actualite.description}
        </p>
      </div>

      <div className="flex border-t border-gray-100">
        <button
          onClick={() => handleEdit(actualite)}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all hover:bg-gray-50"
          style={{ color: "#C9A84C" }}
        >
          <Edit2 size={16} />
          Modifier
        </button>
        <button
          onClick={() => handleDelete(actualite.id, actualite.titre)}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all hover:bg-red-50"
          style={{ color: "#DC2626" }}
        >
          <Trash2 size={16} />
          Supprimer
        </button>
      </div>
    </div>
  );

  // ============================================
  // MODALS
  // ============================================
  const ReactionsModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: "#0C2340" }}>
            <Heart size={20} style={{ color: "#C9A84C" }} />
            Réactions ({reactions.length})
          </h3>
          <button onClick={() => setShowReactions(false)} className="p-1 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          {loadingDetails ? (
            <div className="text-center py-8">Chargement...</div>
          ) : reactions.length === 0 ? (
            <div className="text-center py-8 text-gray-400">Aucune réaction pour le moment</div>
          ) : (
            <div className="space-y-3">
              {reactions.map((reaction) => (
                <div key={reaction.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-[#C9A84C20] flex items-center justify-center">
                    <ThumbsUp size={14} style={{ color: "#C9A84C" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: "#0C2340" }}>
                      {reaction.patient_prenoms} {reaction.patient_nom}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(reaction.date_reaction).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const CommentsModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: "#0C2340" }}>
            <MessageCircle size={20} style={{ color: "#C9A84C" }} />
            Commentaires ({commentaires.length})
          </h3>
          <button onClick={() => setShowComments(false)} className="p-1 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {loadingDetails ? (
            <div className="text-center py-8">Chargement...</div>
          ) : commentaires.length === 0 ? (
            <div className="text-center py-8 text-gray-400">Aucun commentaire pour le moment</div>
          ) : (
            <div className="space-y-4">
              {commentaires.map((commentaire) => (
                <div key={commentaire.id} className="border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#C9A84C20] flex items-center justify-center">
                      <User size={12} style={{ color: "#C9A84C" }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: "#0C2340" }}>
                      {commentaire.patient_prenoms} {commentaire.patient_nom}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(commentaire.date_commentaire).toLocaleString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">{commentaire.commentaire}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ============================================
  // RENDU PRINCIPAL
  // ============================================
  return (
    <div className="space-y-6 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
            Actualités
          </h2>
          <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Publiez et gérez vos actualités
            {!loading && actualites.length > 0 && (
              <span className="ml-2 text-xs sm:text-sm">
                ({actualites.length} publication{actualites.length > 1 ? 's' : ''})
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadActualites}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg transition-all hover:scale-105 disabled:opacity-50"
            style={{ backgroundColor: "#E5E7EB", color: "#0C2340" }}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Rafraîchir
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
          >
            <Plus size={16} />
            Nouvelle publication
          </button>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: "#C9A84C" }} />
          <p className="mt-3 text-gray-500">Chargement des actualités...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={loadActualites} className="mt-2 text-sm underline" style={{ color: "#C9A84C" }}>
            Réessayer
          </button>
        </div>
      )}

      {!loading && !error && actualites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actualites.map((actualite) => (
            <ActualiteCard key={actualite.id} actualite={actualite} />
          ))}
        </div>
      )}

      {!loading && !error && actualites.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-500">Aucune actualité pour le moment</p>
          <button
            onClick={handleAdd}
            className="mt-4 flex items-center justify-center gap-2 mx-auto px-4 py-2 text-sm rounded-lg"
            style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
          >
            <Plus size={16} />
            Créer votre première publication
          </button>
        </div>
      )}

      {/* Modal d'ajout/modification - identique à votre code existant */}
      {isModalOpen && (
        // ... votre modal existant
        <div>...</div>
      )}

      {showReactions && <ReactionsModal />}
      {showComments && <CommentsModal />}
    </div>
  );
};

export default ActualiteSection;