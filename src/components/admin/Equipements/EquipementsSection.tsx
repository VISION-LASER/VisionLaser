// import React, { useState } from "react";
// import { Plus, Trash2, Edit2 } from "lucide-react";

// const EquipementsSection: React.FC = () => {
//   const [equipements, setEquipements] = useState([
//     { nom: "Laser AMARIS 1050 RS", description: "Laser excimer haute précision", image: "amariss.jpg" },
//     { nom: "Laser femtoseconde Ziemer", description: "Création du volet cornéen", image: "ziemer.jpg" },
//     { nom: "Topographe SIRIUS", description: "Analyse de la cornée", image: "sirius.jpg" },
//     { nom: "Aberromètre OWA", description: "Mesure des aberrations", image: "owa.jpg" },
//   ]);

//   return (
//     <div className="space-y-6">
//       <div className="mb-6">
//         <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
//           Gestion des équipements
//         </h2>
//         <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
//         <p className="text-gray-500 mt-2">Ajoutez ou modifiez les équipements présentés sur le site</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {equipements.map((equip, index) => (
//           <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//             <div className="flex justify-between items-start">
//               <div className="flex-1">
//                 <h3 className="text-xl font-semibold" style={{ color: "#0C2340" }}>{equip.nom}</h3>
//                 <p className="text-gray-500 mt-2">{equip.description}</p>
//                 <p className="text-sm mt-2 text-gray-400">Image: {equip.image}</p>
//               </div>
//               <div className="flex gap-2">
//                 <button className="p-2 rounded-lg hover:bg-gray-100">
//                   <Edit2 size={18} style={{ color: "#C9A84C" }} />
//                 </button>
//                 <button className="p-2 rounded-lg hover:bg-gray-100">
//                   <Trash2 size={18} className="text-red-500" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button 
//         className="w-full py-4 rounded-xl border-2 border-dashed transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
//         style={{ borderColor: "#C9A84C", color: "#C9A84C" }}
//       >
//         <Plus size={20} />
//         Ajouter un équipement
//       </button>
//     </div>
//   );
// };

// export default EquipementsSection;

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X, Image as ImageIcon, RefreshCw } from "lucide-react";

// Nouvel import (corrigé)
import { equipementService } from "../../../services/equipementService";
import type { Equipement, EquipementFormData } from "../../../services/equipementService";

const EquipementsSection: React.FC = () => {
  const [equipements, setEquipements] = useState<Equipement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipement, setEditingEquipement] = useState<Equipement | null>(null);
  const [formData, setFormData] = useState<EquipementFormData>({
    nom: "",
    desc_equipement: "",
    image_equipement: ""
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Charger les équipements
  const loadEquipements = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await equipementService.getAll();
      setEquipements(data);
    } catch (err) {
      setError("Impossible de charger les équipements");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipements();
  }, []);

  // Ouvrir le modal d'ajout
  const handleAdd = () => {
    setEditingEquipement(null);
    setFormData({ nom: "", desc_equipement: "", image_equipement: "" });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  // Ouvrir le modal de modification
  const handleEdit = (equipement: Equipement) => {
    setEditingEquipement(equipement);
    setFormData({
      nom: equipement.nom,
      desc_equipement: equipement.desc_equipement,
      image_equipement: equipement.image_equipement
    });
    setImagePreview(equipement.image_equipement);
    setIsModalOpen(true);
  };

  // Supprimer un équipement
  const handleDelete = async (id: number, nom: string) => {
    if (window.confirm(`Supprimer l'équipement "${nom}" ?`)) {
      try {
        const success = await equipementService.delete(id);
        if (success) {
          await loadEquipements();
        } else {
          setError("Erreur lors de la suppression");
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError("Erreur lors de la suppression");
      }
    }
  };

  // Upload d'image
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError("Veuillez sélectionner une image valide");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5MB");
      return;
    }

    setUploadingImage(true);
    try {
      const imageUrl = await equipementService.uploadImage(file);
      setFormData(prev => ({ ...prev, image_equipement: imageUrl }));
      setImagePreview(imageUrl);
    } catch (err) {
      console.error("Erreur upload:", err);
      setError("Erreur lors de l'upload de l'image");
    } finally {
      setUploadingImage(false);
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom.trim()) {
      setError("Le nom est requis");
      return;
    }
    if (!formData.desc_equipement.trim()) {
      setError("La description est requise");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (editingEquipement) {
        await equipementService.update(editingEquipement.id, formData);
      } else {
        await equipementService.create(formData);
      }
      setIsModalOpen(false);
      await loadEquipements();
    } catch (err) {
      console.error("Erreur:", err);
      setError("Erreur lors de l'enregistrement");
    } finally {
      setSubmitting(false);
    }
  };

  // Carte équipement (responsive)
  const EquipementCard = ({ equipement }: { equipement: Equipement }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        {equipement.image_equipement ? (
          <img
            src={equipement.image_equipement}
            alt={equipement.nom}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+non+disponible';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={48} className="text-gray-300" />
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-semibold flex-1 line-clamp-2" style={{ color: "#0C2340" }}>
            {equipement.nom}
          </h3>
          <div className="flex gap-1 shrink-0">
            <button
              onClick={() => handleEdit(equipement)}
              className="p-2 rounded-lg transition-all hover:scale-105 hover:bg-gray-100"
              title="Modifier"
            >
              <Edit2 size={18} style={{ color: "#C9A84C" }} />
            </button>
            <button
              onClick={() => handleDelete(equipement.id, equipement.nom)}
              className="p-2 rounded-lg transition-all hover:scale-105 hover:bg-red-50"
              title="Supprimer"
            >
              <Trash2 size={18} className="text-red-500" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2 line-clamp-3">
          {equipement.desc_equipement}
        </p>
        <p className="text-xs text-gray-400 mt-3">
          Ajouté le {new Date(equipement.created_at).toLocaleDateString('fr-FR')}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
            Gestion des équipements
          </h2>
          <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Ajoutez ou modifiez les équipements présentés sur le site
            {!loading && equipements.length > 0 && (
              <span className="ml-2 text-xs sm:text-sm">
                ({equipements.length} équipement{equipements.length > 1 ? 's' : ''})
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadEquipements}
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
            Ajouter
          </button>
        </div>
      </div>

      {/* État de chargement */}
      {loading && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: "#C9A84C" }} />
          <p className="mt-3 text-gray-500">Chargement des équipements...</p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={loadEquipements}
            className="mt-2 text-sm underline"
            style={{ color: "#C9A84C" }}
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Aucune donnée */}
      {!loading && !error && equipements.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-500">Aucun équipement pour le moment</p>
          <button
            onClick={handleAdd}
            className="mt-4 flex items-center justify-center gap-2 mx-auto px-4 py-2 text-sm rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
          >
            <Plus size={16} />
            Ajouter votre premier équipement
          </button>
        </div>
      )}

      {/* Grille des équipements - RESPONSIVE */}
      {!loading && !error && equipements.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {equipements.map((equipement) => (
            <EquipementCard key={equipement.id} equipement={equipement} />
          ))}
        </div>
      )}

      {/* Modal d'ajout/modification */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold" style={{ color: "#0C2340" }}>
                {editingEquipement ? "Modifier l'équipement" : "Ajouter un équipement"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} style={{ color: "#0C2340" }} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                  Nom de l'équipement *
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                  placeholder="Ex: Laser AMARIS 1050 RS"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                  Description *
                </label>
                <textarea
                  value={formData.desc_equipement}
                  onChange={(e) => setFormData({ ...formData, desc_equipement: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent resize-none"
                  placeholder="Description détaillée de l'équipement..."
                  required
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                  Image
                </label>
                
                {/* Aperçu de l'image */}
                {imagePreview && (
                  <div className="relative mb-3 rounded-lg overflow-hidden h-32 bg-gray-100">
                    <img
                      src={imagePreview}
                      alt="Aperçu"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, image_equipement: "" });
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* Upload d'image */}
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-all hover:border-[#C9A84C] hover:bg-[#C9A84C]/5"
                      style={{ borderColor: "#C9A84C", color: "#C9A84C" }}>
                      <ImageIcon size={18} />
                      <span className="text-sm">
                        {uploadingImage ? "Upload en cours..." : "Choisir une image"}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                  {formData.image_equipement && (
                    <span className="text-xs text-green-600">✓ Image téléchargée</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Formats acceptés: JPG, PNG, GIF, WEBP. Max 5MB
                </p>
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="flex-1 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
                >
                  {submitting ? "Enregistrement..." : (editingEquipement ? "Modifier" : "Ajouter")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipementsSection;