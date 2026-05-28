// import React, { useState } from "react";

// const TarifsSection: React.FC = () => {
//   const [tarifs, setTarifs] = useState([
//     { technique: "FemtoLASIK", prix: "1 500 €", oeil: "1 800 €", note: "Par œil" },
//     { technique: "TPRK", prix: "1 400 €", oeil: "1 700 €", note: "Par œil" },
//   ]);

//   return (
//     <div className="space-y-6">
//       <div className="mb-6">
//         <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
//           Gestion des tarifs
//         </h2>
//         <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
//         <p className="text-gray-500 mt-2">Modifiez les tarifs affichés sur le site</p>
//       </div>

//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
//         <table className="w-full">
//           <thead style={{ backgroundColor: "#C9A84C20" }}>
//             <tr>
//               <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Technique</th>
//               <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Prix (1 œil)</th>
//               <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Prix (2 yeux)</th>
//               <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Note</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tarifs.map((tarif, index) => (
//               <tr key={index} className="border-b border-gray-100">
//                 <td className="px-6 py-4" style={{ color: "#0C2340" }}>{tarif.technique}</td>
//                 <td className="px-6 py-4">
//                   <input 
//                     type="text" 
//                     value={tarif.prix} 
//                     className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
//                     style={{ borderColor: "#E2E8F0" }}
//                   />
//                 </td>
//                 <td className="px-6 py-4">
//                   <input 
//                     type="text" 
//                     value={tarif.oeil} 
//                     className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
//                     style={{ borderColor: "#E2E8F0" }}
//                   />
//                 </td>
//                 <td className="px-6 py-4 text-gray-500">{tarif.note}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-end">
//         <button 
//           className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
//           style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
//         >
//           Enregistrer les modifications
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TarifsSection;

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, RefreshCw, X, Save } from "lucide-react";
import { tarifService } from "../../../services/tarifService";
import type { Tarif, TarifFormData } from "../../../services/tarifService";
import type { Tarif as TarifType } from "../../../services/tarifService";

const TarifsSection: React.FC = () => {
  const [tarifs, setTarifs] = useState<TarifType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTarif, setEditingTarif] = useState<TarifType | null>(null);
  const [formData, setFormData] = useState<TarifFormData>({
    technique: "",
    prix: "",
    note: ""
  });
  const [submitting, setSubmitting] = useState(false);

  // Charger les tarifs
  const loadTarifs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tarifService.getAll();
      setTarifs(data);
    } catch (err) {
      setError("Impossible de charger les tarifs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTarifs();
  }, []);

  // Ouvrir le modal d'ajout
  const handleAdd = () => {
    setEditingTarif(null);
    setFormData({ technique: "", prix: "", note: "" });
    setIsModalOpen(true);
  };

  // Ouvrir le modal de modification
  const handleEdit = (tarif: TarifType) => {
    setEditingTarif(tarif);
    setFormData({
      technique: tarif.technique,
      prix: tarif.prix,
      note: tarif.note || ""
    });
    setIsModalOpen(true);
  };

  // Supprimer un tarif
  const handleDelete = async (id: number, technique: string) => {
    if (window.confirm(`Supprimer le tarif "${technique}" ?`)) {
      try {
        const success = await tarifService.delete(id);
        if (success) {
          await loadTarifs();
        } else {
          setError("Erreur lors de la suppression");
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError("Erreur lors de la suppression");
      }
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.technique.trim()) {
      setError("La technique est requise");
      return;
    }
    if (!formData.prix.trim()) {
      setError("Le prix est requis");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (editingTarif) {
        await tarifService.update(editingTarif.id, formData);
      } else {
        await tarifService.create(formData);
      }
      setIsModalOpen(false);
      await loadTarifs();
    } catch (err) {
      console.error("Erreur:", err);
      setError("Erreur lors de l'enregistrement");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
            Gestion des tarifs
          </h2>
          <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Modifiez les tarifs affichés sur le site
            {!loading && tarifs.length > 0 && (
              <span className="ml-2 text-xs sm:text-sm">
                ({tarifs.length} tarif{tarifs.length > 1 ? 's' : ''})
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadTarifs}
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
          <p className="mt-3 text-gray-500">Chargement des tarifs...</p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={loadTarifs}
            className="mt-2 text-sm underline"
            style={{ color: "#C9A84C" }}
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Aucune donnée */}
      {!loading && !error && tarifs.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-500">Aucun tarif pour le moment</p>
          <button
            onClick={handleAdd}
            className="mt-4 flex items-center justify-center gap-2 mx-auto px-4 py-2 text-sm rounded-lg"
            style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
          >
            <Plus size={16} />
            Ajouter votre premier tarif
          </button>
        </div>
      )}

      {/* Version Desktop: Tableau */}
      {!loading && !error && tarifs.length > 0 && (
        <>
          <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead style={{ backgroundColor: "#C9A84C20" }}>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0C2340" }}>Technique</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0C2340" }}>Prix</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0C2340" }}>Note</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0C2340" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tarifs.map((tarif) => (
                    <tr key={tarif.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm" style={{ color: "#0C2340" }}>
                        {tarif.technique}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold" style={{ color: "#C9A84C" }}>
                        {tarif.prix}
                       </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {tarif.note || "-"}
                       </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(tarif)}
                            className="p-1.5 rounded-lg transition-all hover:scale-105 hover:bg-gray-100"
                            title="Modifier"
                          >
                            <Edit2 size={16} style={{ color: "#C9A84C" }} />
                          </button>
                          <button
                            onClick={() => handleDelete(tarif.id, tarif.technique)}
                            className="p-1.5 rounded-lg transition-all hover:scale-105 hover:bg-red-50"
                            title="Supprimer"
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </button>
                        </div>
                       </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Version Mobile: Cartes */}
          <div className="lg:hidden space-y-3">
            {tarifs.map((tarif) => (
              <div key={tarif.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base" style={{ color: "#0C2340" }}>
                      {tarif.technique}
                    </h3>
                    <p className="text-lg font-bold mt-1" style={{ color: "#C9A84C" }}>
                      {tarif.prix}
                    </p>
                    {tarif.note && (
                      <p className="text-xs text-gray-400 mt-1">{tarif.note}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(tarif)}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <Edit2 size={16} style={{ color: "#C9A84C" }} />
                    </button>
                    <button
                      onClick={() => handleDelete(tarif.id, tarif.technique)}
                      className="p-2 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal d'ajout/modification */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold" style={{ color: "#0C2340" }}>
                {editingTarif ? "Modifier le tarif" : "Ajouter un tarif"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                  Technique *
                </label>
                <input
                  type="text"
                  value={formData.technique}
                  onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                  placeholder="Ex: FemtoLASIK"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                  Prix *
                </label>
                <input
                  type="text"
                  value={formData.prix}
                  onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                  placeholder="Ex: 1 500 €"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                  Note (optionnelle)
                </label>
                <input
                  type="text"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                  placeholder="Ex: Par œil"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-[1.02] disabled:opacity-50"
                  style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
                >
                  {submitting ? "Enregistrement..." : (editingTarif ? "Modifier" : "Ajouter")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TarifsSection;