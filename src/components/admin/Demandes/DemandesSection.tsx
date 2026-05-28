// import React from "react";

// const DemandesSection: React.FC = () => {
//   const demandes = [
//     { nom: "Sophie Martin", email: "sophie@email.com", telephone: "06 12 34 56 78", date: "2025-05-20", vu: false },
//     { nom: "Marc Dubois", email: "marc@email.com", telephone: "06 23 45 67 89", date: "2025-05-19", vu: true },
//     { nom: "Emma Leroy", email: "emma@email.com", telephone: "06 34 56 78 90", date: "2025-05-18", vu: false },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="mb-6">
//         <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
//           Demandes de bilan
//         </h2>
//         <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
//         <p className="text-gray-500 mt-2">Consultez les demandes de bilan visuel</p>
//       </div>

//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead style={{ backgroundColor: "#C9A84C20" }}>
//               <tr>
//                 <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Nom</th>
//                 <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Email</th>
//                 <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Téléphone</th>
//                 <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Date</th>
//                 <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Statut</th>
//               </tr>
//             </thead>
//             <tbody>
//               {demandes.map((demande, index) => (
//                 <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="px-6 py-4" style={{ color: "#0C2340" }}>{demande.nom}</td>
//                   <td className="px-6 py-4 text-gray-600">{demande.email}</td>
//                   <td className="px-6 py-4 text-gray-600">{demande.telephone}</td>
//                   <td className="px-6 py-4 text-gray-500">{demande.date}</td>
//                   <td className="px-6 py-4">
//                     {!demande.vu && (
//                       <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}>
//                         Non lu
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DemandesSection;

import React, { useState, useEffect } from "react";
import { Eye, CheckCircle, Trash2, RefreshCw, Mail, Phone, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { bilanService } from "../../../services/bilanService";
import type { Bilan } from "../../../services/bilanService";

const DemandesSection: React.FC = () => {
  const [demandes, setDemandes] = useState<Bilan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Charger les données
    const loadDemandes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await bilanService.getAll();
        // Défensive : gérer les deux formes possibles de retour (array direct ou { data: [...] })
        let demandesList: Bilan[] = [];
        if (Array.isArray(data)) {
          demandesList = data;
        } else if (data && typeof data === "object" && Array.isArray((data as any).data)) {
          demandesList = (data as any).data;
        } else {
          // si la forme est inattendue, on essaie de ne rien casser et on garde la liste vide
          demandesList = [];
        }
        setDemandes(demandesList);
      } catch (err) {
        setError("Impossible de charger les demandes de bilan");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  // Charger au montage du composant
  useEffect(() => {
    loadDemandes();
  }, []);

  // Marquer comme "lu" (changer statut)
  const handleMarkAsRead = async (id: number, currentStatut: string) => {
    setUpdatingId(id);
    try {
      const newStatut = currentStatut === "lu" ? "non_lu" : "lu";
      await bilanService.updateStatut(id, newStatut);
      await loadDemandes();
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
      setError("Erreur lors de la mise à jour du statut");
    } finally {
      setUpdatingId(null);
    }
  };

  // Supprimer une demande
  const handleDelete = async (id: number, nom: string) => {
    if (window.confirm(`Supprimer la demande de ${nom} ?`)) {
      setUpdatingId(id);
      try {
        const success = await bilanService.delete(id);
        if (success) {
          await loadDemandes();
        } else {
          setError("Erreur lors de la suppression");
        }
      } catch (err) {
        console.error("Erreur lors de la suppression:", err);
        setError("Erreur lors de la suppression");
      } finally {
        setUpdatingId(null);
      }
    }
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Formater la date courte pour mobile
  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Obtenir le badge de statut
  const getStatutBadge = (statut: string) => {
    if (statut === "lu") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle size={12} /> Lu
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}>
        <Eye size={12} /> Non lu
      </span>
    );
  };

  // Version carte pour mobile
  const MobileCard = ({ demande }: { demande: Bilan }) => {
    const isExpanded = expandedRow === demande.id;
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-3">
        {/* En-tête de la carte */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-base" style={{ color: "#0C2340" }}>
                {demande.nom}
              </h3>
              {getStatutBadge(demande.statut || 'non_lu')}
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={14} style={{ color: "#C9A84C" }} />
                <a href={`mailto:${demande.email}`} className="hover:underline truncate" style={{ color: "#C9A84C" }}>
                  {demande.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={14} style={{ color: "#C9A84C" }} />
                <a href={`tel:${demande.telephone}`} className="hover:underline">
                  {demande.telephone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={14} style={{ color: "#C9A84C" }} />
                <span>{formatDateShort(demande.date_demande || demande.created_at)}</span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleMarkAsRead(demande.id, demande.statut || 'non_lu')}
              disabled={updatingId === demande.id}
              className="p-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
              style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}
              title={demande.statut === "lu" ? "Marquer comme non lu" : "Marquer comme lu"}
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleDelete(demande.id, demande.nom)}
              disabled={updatingId === demande.id}
              className="p-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
              style={{ backgroundColor: "#FFE5E5", color: "#DC2626" }}
              title="Supprimer"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={() => setExpandedRow(isExpanded ? null : demande.id)}
              className="p-2 rounded-lg transition-all hover:bg-gray-100 lg:hidden"
              style={{ color: "#C9A84C" }}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
        
        {/* Contenu étendu (détails supplémentaires) */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-xs text-gray-500">Date complète</span>
                <p className="text-sm" style={{ color: "#0C2340" }}>{formatDate(demande.date_demande || demande.created_at)}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">ID</span>
                <p className="text-sm" style={{ color: "#0C2340" }}>#{demande.id}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
            Demandes de bilan
          </h2>
          <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Consultez les demandes de bilan visuel
            {!loading && demandes.length > 0 && (
              <span className="ml-2 text-xs sm:text-sm">
                ({demandes.length} demande{demandes.length > 1 ? 's' : ''})
              </span>
            )}
          </p>
        </div>
        
        {/* Bouton rafraîchir */}
        <button
          onClick={loadDemandes}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg transition-all hover:scale-105 disabled:opacity-50 w-full sm:w-auto"
          style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Rafraîchir
        </button>
      </div>

      {/* État de chargement */}
      {loading && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: "#C9A84C" }} />
          <p className="mt-3 text-gray-500">Chargement des demandes...</p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={loadDemandes}
            className="mt-2 text-sm underline"
            style={{ color: "#C9A84C" }}
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Aucune donnée */}
      {!loading && !error && demandes.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-500">Aucune demande de bilan pour le moment</p>
        </div>
      )}

      {/* Version Desktop : Tableau (caché sur mobile) */}
      {!loading && !error && demandes.length > 0 && (
        <>
          <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead style={{ backgroundColor: "#C9A84C20" }}>
                  <tr>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold" style={{ color: "#0C2340" }}>Nom</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold" style={{ color: "#0C2340" }}>Email</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold" style={{ color: "#0C2340" }}>Téléphone</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold" style={{ color: "#0C2340" }}>Date</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold" style={{ color: "#0C2340" }}>Statut</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold" style={{ color: "#0C2340" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {demandes.map((demande) => (
                    <tr key={demande.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 md:px-6 py-3 md:py-4 text-sm" style={{ color: "#0C2340" }}>
                        {demande.nom}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-sm">
                        <a href={`mailto:${demande.email}`} className="hover:underline break-all" style={{ color: "#C9A84C" }}>
                          {demande.email}
                        </a>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-600">
                        <a href={`tel:${demande.telephone}`} className="hover:underline">
                          {demande.telephone}
                        </a>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-500">
                        {formatDate(demande.date_demande || demande.created_at)}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        {getStatutBadge(demande.statut || 'non_lu')}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleMarkAsRead(demande.id, demande.statut || 'non_lu')}
                            disabled={updatingId === demande.id}
                            className="p-1.5 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
                            style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}
                            title={demande.statut === "lu" ? "Marquer comme non lu" : "Marquer comme lu"}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(demande.id, demande.nom)}
                            disabled={updatingId === demande.id}
                            className="p-1.5 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
                            style={{ backgroundColor: "#FFE5E5", color: "#DC2626" }}
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Version Mobile : Cartes (visible uniquement sur mobile/tablette) */}
          <div className="lg:hidden">
            {demandes.map((demande) => (
              <MobileCard key={demande.id} demande={demande} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DemandesSection;