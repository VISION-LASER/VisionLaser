import React, { useState, useEffect } from "react";
import { Eye, CheckCircle, Trash2, RefreshCw, Mail, Phone, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";

interface ContactPatient {
  id: number;
  Nom: string;
  Prenom: string;
  Telephone: string;
  Email: string;
  Message: string;
  faq: string | null;
  is_read: number;
  created_at: string;
  updated_at: string;
}

interface FaqAnswer {
  question: string;
  answer: string;
}

const DemandesSection: React.FC = () => {
  const [demandes, setDemandes] = useState<ContactPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [selectedDemande, setSelectedDemande] = useState<ContactPatient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [faqData, setFaqData] = useState<FaqAnswer[]>([]);

  const getToken = () => localStorage.getItem('accessToken');

  // Charger les demandes
  const loadDemandes = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        setError("Non authentifié. Veuillez vous reconnecter.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact-patient`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('accessToken');
          setError("Session expirée. Veuillez vous reconnecter.");
        } else {
          throw new Error(`Erreur ${response.status}`);
        }
        setLoading(false);
        return;
      }

      const result = await response.json();
      let demandesList: ContactPatient[] = [];
      if (Array.isArray(result)) {
        demandesList = result;
      } else if (result && typeof result === "object" && Array.isArray(result.data)) {
        demandesList = result.data;
      }
      setDemandes(demandesList);
    } catch (err) {
      setError("Impossible de charger les demandes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDemandes();
  }, []);

  // Marquer comme lu / non lu
  const handleMarkAsRead = async (id: number, currentIsRead: number) => {
    setUpdatingId(id);
    try {
      const token = getToken();
      const newIsRead = currentIsRead === 1 ? 0 : 1;
      
      if (newIsRead === 0) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contact-patient/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ is_read: newIsRead })
        });
        
        if (!response.ok) throw new Error('Erreur');
      } else {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contact-patient/${id}/read`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Erreur');
      }
      
      toast.success(newIsRead === 1 ? "Marqué comme lu" : "Marqué comme non lu");
      await loadDemandes();
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setUpdatingId(null);
    }
  };

  // Supprimer une demande
  const handleDelete = async (id: number, nom: string, prenom: string) => {
    if (window.confirm(`Supprimer la demande de ${prenom} ${nom} ?`)) {
      setUpdatingId(id);
      try {
        const token = getToken();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contact-patient/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          toast.success("Demande supprimée avec succès");
          await loadDemandes();
        } else {
          throw new Error('Erreur');
        }
      } catch (err) {
        console.error("Erreur lors de la suppression:", err);
        toast.error("Erreur lors de la suppression");
      } finally {
        setUpdatingId(null);
      }
    }
  };

  // Récupérer et parser les réponses FAQ
  const parseFaqData = (faq: string | null): FaqAnswer[] => {
    if (!faq) return [];
    try {
      // Si c'est déjà un objet
      if (typeof faq === 'object') return faq as FaqAnswer[];
      // Si c'est une string JSON
      const parsed = JSON.parse(faq);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (e) {
      console.error('Erreur de parsing FAQ:', e);
      return [];
    }
  };

  // Obtenir un résumé des réponses pour le tableau
  const getFaqSummary = (faq: string | null): string => {
    const answers = parseFaqData(faq);
    if (answers.length === 0) return "Aucune réponse";
    const summaries = answers.map(a => `${a.question.split(' ').slice(0, 3).join(' ')}... : ${a.answer || 'Non répondue'}`);
    return summaries.join(' | ');
  };

  const handleViewDetails = (demande: ContactPatient) => {
    setSelectedDemande(demande);
    const parsedFaq = parseFaqData(demande.faq);
    setFaqData(parsedFaq);
    setModalOpen(true);
    if (!demande.is_read) {
      handleMarkAsRead(demande.id, demande.is_read);
    }
  };

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

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatutBadge = (isRead: number) => {
    if (isRead === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
          <CheckCircle size={12} /> Lu
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
        <Eye size={12} /> Non lu
      </span>
    );
  };

  const getStatusBgColor = (isRead: number) => {
    if (isRead === 1) {
      return "bg-green-50 border-green-200";
    }
    return "bg-yellow-50 border-yellow-200";
  };

  // Carte mobile
  const MobileCard = ({ demande }: { demande: ContactPatient }) => {
    const isExpanded = expandedRow === demande.id;
    const faqAnswers = parseFaqData(demande.faq);
    
    return (
      <div className={`bg-white rounded-xl shadow-md border p-4 mb-3 ${getStatusBgColor(demande.is_read || 0)}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3 className="font-semibold text-base" style={{ color: "#0C2340" }}>
                {demande.Prenom} {demande.Nom}
              </h3>
              {getStatutBadge(demande.is_read || 0)}
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={14} style={{ color: "#C9A84C" }} />
                <a href={`mailto:${demande.Email}`} className="hover:underline truncate" style={{ color: "#C9A84C" }}>
                  {demande.Email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={14} style={{ color: "#C9A84C" }} />
                <a href={`tel:${demande.Telephone}`} className="hover:underline">
                  {demande.Telephone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={14} style={{ color: "#C9A84C" }} />
                <span>{formatDateShort(demande.created_at)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleViewDetails(demande)}
              disabled={updatingId === demande.id}
              className="p-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
              style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}
              title="Voir les détails"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleMarkAsRead(demande.id, demande.is_read || 0)}
              disabled={updatingId === demande.id}
              className="p-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
              style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}
              title={demande.is_read === 1 ? "Marquer comme non lu" : "Marquer comme lu"}
            >
              <CheckCircle size={16} />
            </button>
            <button
              onClick={() => handleDelete(demande.id, demande.Nom, demande.Prenom)}
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
        
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            {/* Affichage des réponses FAQ dans la carte étendue */}
            {faqAnswers.length > 0 && (
              <div className="mb-3">
                <span className="text-xs font-medium text-gray-500">Réponses au questionnaire :</span>
                <div className="mt-2 space-y-2">
                  {faqAnswers.map((item, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="font-medium" style={{ color: "#0C2340" }}>{item.question}</span>
                      <p className="text-gray-600 text-xs mt-0.5">{item.answer || "Non répondue"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-xs text-gray-500">Date complète</span>
                <p className="text-sm" style={{ color: "#0C2340" }}>{formatDate(demande.created_at)}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">ID</span>
                <p className="text-sm" style={{ color: "#0C2340" }}>#{demande.id}</p>
              </div>
            </div>
            {demande.Message && (
              <div className="mt-2">
                <span className="text-xs text-gray-500">Message</span>
                <p className="text-sm text-gray-600 mt-1">{demande.Message}</p>
              </div>
            )}
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
            Demandes des patients
          </h2>
          <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Consultez les demandes de contact et les réponses au questionnaire
            {!loading && demandes.length > 0 && (
              <span className="ml-2 text-xs">
                ({demandes.length} demande{demandes.length > 1 ? 's' : ''})
              </span>
            )}
          </p>
        </div>

        <button
          onClick={loadDemandes}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg transition-all hover:scale-105 disabled:opacity-50"
          style={{ backgroundColor: "#E5E7EB", color: "#0C2340" }}
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Rafraîchir
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: "#C9A84C" }} />
          <p className="mt-3 text-gray-500">Chargement des demandes...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertCircle size={20} className="text-red-500 shrink-0" />
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={loadDemandes} className="ml-auto text-sm underline" style={{ color: "#C9A84C" }}>
            Réessayer
          </button>
        </div>
      )}

      {/* Aucune donnée */}
      {!loading && !error && demandes.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-500">Aucune demande pour le moment</p>
        </div>
      )}

      {/* Version Desktop - Tableau */}
      {!loading && !error && demandes.length > 0 && (
        <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead style={{ backgroundColor: "#C9A84C20" }}>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#0C2340" }}>Patient</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#0C2340" }}>Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#0C2340" }}>Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#0C2340" }}>Statut</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#0C2340" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {demandes.map((demande) => (
                  <tr key={demande.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${!demande.is_read ? 'bg-yellow-50/30' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-sm" style={{ color: "#0C2340" }}>
                        {demande.Prenom} {demande.Nom}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">#{demande.id}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <a href={`mailto:${demande.Email}`} className="hover:underline block truncate max-w-[200px]" style={{ color: "#C9A84C" }}>
                          {demande.Email}
                        </a>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        <a href={`tel:${demande.Telephone}`} className="hover:underline">
                          {demande.Telephone}
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {formatDateShort(demande.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      {getStatutBadge(demande.is_read || 0)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(demande)}
                          className="p-1.5 rounded-lg transition hover:scale-105"
                          style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}
                          title="Voir les détails"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleMarkAsRead(demande.id, demande.is_read || 0)}
                          className="p-1.5 rounded-lg transition hover:scale-105"
                          style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}
                          title={demande.is_read === 1 ? "Marquer comme non lu" : "Marquer comme lu"}
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(demande.id, demande.Nom, demande.Prenom)}
                          className="p-1.5 rounded-lg transition hover:scale-105"
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
      )}

      {/* Version Mobile - Cartes */}
      {!loading && !error && demandes.length > 0 && (
        <div className="lg:hidden">
          {demandes.map((demande) => (
            <MobileCard key={demande.id} demande={demande} />
          ))}
        </div>
      )}

      {/* Modal des détails - CORRIGÉ pour afficher toutes les questions et réponses */}
      {modalOpen && selectedDemande && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold" style={{ color: "#0C2340" }}>
                Détails de la demande
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Statut */}
              <div className={`p-3 rounded-xl border ${getStatusBgColor(selectedDemande.is_read || 0)}`}>
                <p className="text-sm font-medium mb-1">Statut</p>
                {getStatutBadge(selectedDemande.is_read || 0)}
              </div>

              {/* Informations patient */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Informations personnelles</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400">Nom complet</p>
                    <p className="text-sm font-medium" style={{ color: "#0C2340" }}>
                      {selectedDemande.Prenom} {selectedDemande.Nom}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Téléphone</p>
                    <a href={`tel:${selectedDemande.Telephone}`} className="text-sm text-blue-600 hover:underline">
                      {selectedDemande.Telephone}
                    </a>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">Email</p>
                    <a href={`mailto:${selectedDemande.Email}`} className="text-sm text-blue-600 hover:underline break-all">
                      {selectedDemande.Email}
                    </a>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">Date de création</p>
                    <p className="text-sm text-gray-600">{formatDate(selectedDemande.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {selectedDemande.Message && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Message</h4>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                    {selectedDemande.Message}
                  </div>
                </div>
              )}

              {/* Réponses FAQ - AFFICHAGE COMPLET */}
              {faqData.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Réponses au questionnaire d'éligibilité
                  </h4>
                  <div className="space-y-4">
                    {faqData.map((item, index) => (
                      <div key={index} className="border-l-4 border-[#C9A84C] pl-4 py-2 bg-gray-50 rounded-r-lg">
                        <p className="text-sm font-semibold" style={{ color: "#0C2340" }}>
                          {item.question}
                        </p>
                        <p className="text-base text-gray-700 mt-1 font-medium">
                          {item.answer && item.answer.trim() !== "" ? item.answer : "❌ Non répondue"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Si pas de réponses FAQ */}
              {faqData.length === 0 && selectedDemande.faq === null && (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Aucune réponse au questionnaire</p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 flex justify-end rounded-b-xl">
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2 rounded-lg text-white transition hover:scale-105"
                style={{ backgroundColor: "#C9A84C" }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant AlertCircle
const AlertCircle = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default DemandesSection;