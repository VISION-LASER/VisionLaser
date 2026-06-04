import React, { useState, useEffect } from "react";
import { Bell, CheckCircle, Eye, RefreshCw, User, Mail, Phone, Calendar as CalendarIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ContactDemande {
  id: number;
  Nom: string;
  Prenom: string;
  Telephone: string;
  Email: string;
  Message: string;
  faq: string | null;
  is_read: number;
  created_at: string;
}

const NotificationSection: React.FC = () => {
  const [demandes, setDemandes] = useState<ContactDemande[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"unread" | "all" | "read">("unread");
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('accessToken');

  // Charger les demandes depuis contact_patient
  const loadDemandes = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact-patient`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Erreur de chargement');

      const result = await response.json();
      let demandesList: ContactDemande[] = [];
      if (Array.isArray(result)) {
        demandesList = result;
      } else if (result && typeof result === "object" && Array.isArray(result.data)) {
        demandesList = result.data;
      }
      setDemandes(demandesList);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  // Obtenir le nombre de demandes non lues
  const getUnreadCount = () => {
    return demandes.filter(d => d.is_read === 0).length;
  };

  // Marquer comme lu
  const markAsRead = async (id: number) => {
    try {
      const token = getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact-patient/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setDemandes(prev =>
          prev.map(demande =>
            demande.id === id ? { ...demande, is_read: 1 } : demande
          )
        );
        toast.success("Demande marquée comme lue");
        
        // Mettre à jour le compteur dans le sidebar
        window.dispatchEvent(new Event('notifications-updated'));
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du marquage');
    }
  };

  // Marquer toutes comme lues
  const markAllAsRead = async () => {
    const unreadIds = demandes.filter(d => d.is_read === 0).map(d => d.id);
    if (unreadIds.length === 0) return;

    try {
      const token = getToken();
      const promises = unreadIds.map(id =>
        fetch(`${import.meta.env.VITE_API_URL}/contact-patient/${id}/read`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
      );
      
      await Promise.all(promises);
      
      setDemandes(prev =>
        prev.map(demande => ({ ...demande, is_read: 1 }))
      );
      
      toast.success("Toutes les demandes ont été marquées comme lues");
      window.dispatchEvent(new Event('notifications-updated'));
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du marquage');
    }
  };

  // Aller à la demande dans l'admin
  const goToDemande = (demande: ContactDemande) => {
    navigate('/admin/demandes');
  };

  // Rafraîchir les données
  const refreshData = () => {
    loadDemandes();
    window.dispatchEvent(new Event('notifications-updated'));
  };

  useEffect(() => {
    loadDemandes();
    
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(loadDemandes, 30000);
    
    // Écouter les mises à jour
    const handleUpdate = () => {
      loadDemandes();
    };
    
    window.addEventListener('contact-updated', handleUpdate);
    window.addEventListener('notifications-updated', handleUpdate);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('contact-updated', handleUpdate);
      window.removeEventListener('notifications-updated', handleUpdate);
    };
  }, []);

  // Filtrer les notifications
  const filteredDemandes = demandes.filter(d => {
    if (filter === "unread") return d.is_read === 0;
    if (filter === "read") return d.is_read === 1;
    return true;
  });

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours} h`;
    return `Il y a ${diffDays} j`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: "#C9A84C" }} />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
            Notifications
          </h2>
          <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Nouvelles demandes des patients
            <span className="ml-2 text-xs font-semibold" style={{ color: "#C9A84C" }}>
              ({getUnreadCount()} non lue{getUnreadCount() > 1 ? 's' : ''})
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={markAllAsRead}
            disabled={getUnreadCount() === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all hover:scale-105 disabled:opacity-50"
            style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}
          >
            <Eye size={16} />
            Tout marquer comme lu
          </button>
          <button
            onClick={refreshData}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: "#E5E7EB", color: "#0C2340" }}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Rafraîchir
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {["unread", "all", "read"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
              filter === f
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={filter === f ? { backgroundColor: "#C9A84C" } : {}}
          >
            {f === "all" && "Toutes"}
            {f === "unread" && `Non lues (${getUnreadCount()})`}
            {f === "read" && `Lues (${demandes.length - getUnreadCount()})`}
          </button>
        ))}
      </div>

      {/* Liste des notifications */}
      {filteredDemandes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Bell size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">
            {filter === "unread" ? "Aucune nouvelle notification" : "Aucune notification"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDemandes.map((demande) => (
            <div
              key={demande.id}
              className={`bg-white rounded-xl shadow-md border p-4 transition-all hover:shadow-lg cursor-pointer ${
                demande.is_read === 0 ? "border-l-4" : "opacity-75"
              }`}
              style={demande.is_read === 0 ? { borderLeftColor: "#C9A84C", borderLeftWidth: "4px" } : {}}
              onClick={() => goToDemande(demande)}
            >
              <div className="flex items-start gap-3">
                {/* Icône */}
                <div className="flex-shrink-0">
                  {demande.is_read === 0 ? (
                    <Bell size={18} className="text-[#C9A84C]" />
                  ) : (
                    <CheckCircle size={18} className="text-green-500" />
                  )}
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className={`text-sm font-semibold ${demande.is_read === 0 ? "text-[#0C2340]" : "text-gray-600"}`}>
                      Nouvelle demande de contact
                    </h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {formatDate(demande.created_at)}
                    </span>
                  </div>
                  
                  {/* Nom du patient */}
                  <div className="flex items-center gap-2 mt-2">
                    <User size={14} className="text-gray-400" />
                    <span className="text-sm font-medium" style={{ color: "#0C2340" }}>
                      {demande.Prenom} {demande.Nom}
                    </span>
                  </div>
                  
                  {/* Contact */}
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mail size={12} /> {demande.Email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={12} /> {demande.Telephone}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon size={12} /> {formatDate(demande.created_at)}
                    </span>
                  </div>
                  
                  {/* Message */}
                  {demande.Message && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 bg-gray-50 p-2 rounded">
                      "{demande.Message}"
                    </p>
                  )}
                </div>

                {/* Action - seulement marquer comme lu, pas de suppression */}
                {demande.is_read === 0 && (
                  <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => markAsRead(demande.id)}
                      className="p-1.5 rounded-lg transition hover:scale-105"
                      style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}
                      title="Marquer comme lu"
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationSection;