import React, { useState, useEffect } from "react";
import { API_URL } from "../../../config/api.config";

import {
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  AlertCircle,
  RefreshCw,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";

interface RendezVous {
  id: number;
  Nom: string;
  Prenom: string;
  Email: string;
  Telephone: string;
  Date_naissance: string | null;
  Motif_consultation: string;
  info_supplementaire: string | null;
  date_creneau: string;
  heure_creneau: string;
  status: "pending" | "confirmed" | "refused" | "cancelled";
  created_at: string;
  updated_at: string;
}

const RendezvousSection: React.FC = () => {
  const [appointments, setAppointments] = useState<RendezVous[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<RendezVous | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Fonction utilitaire pour normaliser les dates sans conversion UTC
  const normalizeDate = (dateString: string): string => {
    if (!dateString) return "";
    // Extraire uniquement la partie YYYY-MM-DD
    if (dateString.includes('T')) {
      return dateString.split('T')[0];
    }
    if (dateString.includes(' ')) {
      return dateString.split(' ')[0];
    }
    return dateString;
  };

  // Fonction pour afficher la date au format français
  const displayFrenchDate = (dateString: string): string => {
    const normalizedDate = normalizeDate(dateString);
    const [year, month, day] = normalizedDate.split('-');
    return `${day}/${month}/${year}`;
  };

  // Charger les rendez-vous
  const loadAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/rendez-vous`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des rendez-vous");
      }

      const data = await response.json();
      const rdvs = data.data || data;
      setAppointments(rdvs);
    } catch (err) {
      setError("Impossible de charger les rendez-vous");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // Mettre à jour le statut
  const updateAppointmentStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/rendez-vous/${id}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      // Mettre à jour localement
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: status as any } : app))
      );
      
      if (selectedAppointment?.id === id) {
        setSelectedAppointment({ ...selectedAppointment, status: status as any });
      }
    } catch (err) {
      console.error("Erreur:", err);
      setError("Impossible de mettre à jour le rendez-vous");
    }
  };

  // Supprimer un rendez-vous
  const deleteAppointment = async (id: number) => {
    if (!confirm("Supprimer ce rendez-vous ?")) return;
    
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/rendez-vous/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      await loadAppointments();
      setShowModal(false);
      setSelectedAppointment(null);
    } catch (err) {
      console.error("Erreur:", err);
      setError("Impossible de supprimer le rendez-vous");
    }
  };

  // Couleurs selon le statut
const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-700 border-green-200";
    case "refused":
      return "bg-red-100 text-red-700 border-red-200";
    case "cancelled":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
  }
};

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "✓ Accepté";
      case "refused":
        return "✗ Refusé";
      case "cancelled":
        return "Annulé";
      default:
        return "⏳ En attente";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 border-green-200";
      case "refused":
        return "bg-red-50 border-red-200";
      case "cancelled":
        return "bg-gray-50 border-gray-200";
      default:
        return "bg-yellow-50 border-yellow-200";
    }
  };

  // Filtrer les rendez-vous par date et statut
  const getAppointmentsForDate = (date: Date) => {
    // Créer une date locale sans heure
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    return appointments.filter((app) => {
      const appDateNormalized = normalizeDate(app.date_creneau);
      const matchDate = appDateNormalized === dateStr;
      const matchStatus = filterStatus === "all" || app.status === filterStatus;
      return matchDate && matchStatus;
    });
  };

  // Obtenir les jours du mois - CORRIGÉ pour que Lundi soit le premier jour
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const days = [];
    
    // CORRECTION: getDay() retourne 0 pour Dimanche, 1 pour Lundi, etc.
    // Pour avoir Lundi comme premier jour, on convertit: 
    // Si getDay() = 0 (Dimanche) -> 6 (car Dimanche devient le dernier jour)
    // Sinon on décale de 1 (Lundi=0, Mardi=1, etc.)
    let startDayOffset = firstDayOfMonth.getDay();
    if (startDayOffset === 0) {
      startDayOffset = 7; // Dimanche devient le 7ème jour
    }
    startDayOffset = startDayOffset - 1; // Pour que Lundi soit l'index 0
    
    // Ajouter les jours du mois précédent
    for (let i = startDayOffset - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Ajouter les jours du mois courant
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    // Compléter pour avoir 6 lignes complètes (42 jours)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

 // Modal des détails
const AppointmentModal = () => {
  if (!selectedAppointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold" style={{ color: "#0C2340" }}>
            Détails du rendez-vous
          </h3>
          <button
            onClick={() => setShowModal(false)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <XCircle size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Statut */}
          <div className={`p-3 rounded-xl border ${getStatusBgColor(selectedAppointment.status)}`}>
            <p className="text-sm font-medium mb-1">Statut actuel</p>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAppointment.status)}`}>
              {getStatusText(selectedAppointment.status)}
            </span>
          </div>

          {/* Patient info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User size={18} style={{ color: "#C9A84C" }} />
              <span className="font-medium" style={{ color: "#0C2340" }}>
                {selectedAppointment.Prenom} {selectedAppointment.Nom}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} style={{ color: "#C9A84C" }} />
              <span className="text-gray-600">{selectedAppointment.Email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} style={{ color: "#C9A84C" }} />
              <span className="text-gray-600">{selectedAppointment.Telephone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} style={{ color: "#C9A84C" }} />
              <span className="text-gray-600">
                {displayFrenchDate(selectedAppointment.date_creneau)} à {selectedAppointment.heure_creneau}
              </span>
            </div>
          </div>

          {/* Motif */}
          <div className="border-t border-gray-100 pt-3">
            <p className="text-sm font-medium mb-1" style={{ color: "#0C2340" }}>
              Motif de consultation
            </p>
            <p className="text-sm text-gray-600">{selectedAppointment.Motif_consultation}</p>
          </div>

          {/* Notes */}
          {selectedAppointment.info_supplementaire && (
            <div className="border-t border-gray-100 pt-3">
              <p className="text-sm font-medium mb-1" style={{ color: "#0C2340" }}>
                Informations supplémentaires
              </p>
              <p className="text-sm text-gray-600">{selectedAppointment.info_supplementaire}</p>
            </div>
          )}

          {/* Actions - CORRIGÉ : Toujours visible avec boutons désactivés selon le statut */}
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <div className="flex gap-3">
              {/* Bouton Accepter */}
              <button
                onClick={() => updateAppointmentStatus(selectedAppointment.id, "confirmed")}
                disabled={selectedAppointment.status === "confirmed"}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${
                  selectedAppointment.status === "confirmed"
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                <CheckCircle size={16} />
                Accepter
              </button>

              {/* Bouton Refuser */}
              <button
                onClick={() => updateAppointmentStatus(selectedAppointment.id, "refused")}
                disabled={selectedAppointment.status === "refused"}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${
                  selectedAppointment.status === "refused"
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                <XCircle size={16} />
                Refuser
              </button>

              {/* Bouton Annuler */}
              <button
                onClick={() => updateAppointmentStatus(selectedAppointment.id, "cancelled")}
                disabled={selectedAppointment.status === "cancelled"}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${
                  selectedAppointment.status === "cancelled"
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-600 hover:bg-gray-700 text-white"
                }`}
              >
                Annuler
              </button>
            </div>

            {/* Bouton Supprimer - toujours disponible */}
            <button
              onClick={() => deleteAppointment(selectedAppointment.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              <Trash2 size={16} />
              Supprimer définitivement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
            Gestion des rendez-vous
          </h2>
          <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Gérez les rendez-vous des patients
            {!loading && appointments.length > 0 && (
              <span className="ml-2 text-xs">
                ({appointments.length} rendez-vous au total)
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadAppointments}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg transition-all hover:scale-105 disabled:opacity-50"
            style={{ backgroundColor: "#E5E7EB", color: "#0C2340" }}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Rafraîchir
          </button>
        </div>
      </div>

      {/* Filtre par statut */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={18} style={{ color: "#C9A84C" }} />
          <span className="text-sm font-medium" style={{ color: "#0C2340" }}>
            Filtrer par statut
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "pending", "confirmed", "refused", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                filterStatus === status
                  ? "bg-[#C9A84C] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status === "all" ? "Tous" : getStatusText(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Loading / Error / Calendar */}
      {loading && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: "#C9A84C" }} />
          <p className="mt-3 text-gray-500">Chargement des rendez-vous...</p>
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertCircle size={20} className="text-red-500 shrink-0" />
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={loadAppointments} className="ml-auto text-sm underline" style={{ color: "#C9A84C" }}>
            Réessayer
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Calendrier */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <button onClick={previousMonth} className="p-2 rounded-lg hover:bg-gray-100 transition">
                <ChevronLeft size={20} style={{ color: "#0C2340" }} />
              </button>
              <h3 className="text-lg font-semibold" style={{ color: "#0C2340" }}>
                {currentMonth.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
              </h3>
              <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100 transition">
                <ChevronRight size={20} style={{ color: "#0C2340" }} />
              </button>
            </div>

            <div className="grid grid-cols-7 border-b border-gray-100">
              {weekDays.map((day) => (
                <div key={day} className="py-3 text-center text-sm font-medium" style={{ color: "#0C2340", backgroundColor: "#C9A84C10" }}>
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 auto-rows-fr">
              {days.map(({ date, isCurrentMonth }, index) => {
                const appointmentsForDay = getAppointmentsForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();

                return (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border-b border-r border-gray-100 transition ${
                      !isCurrentMonth ? "bg-gray-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={`text-sm font-medium ${
                          isToday ? "text-white bg-[#C9A84C] w-7 h-7 rounded-full flex items-center justify-center" : ""
                        } ${!isCurrentMonth ? "text-gray-400" : "text-gray-700"}`}
                        style={isToday ? {} : { color: "#0C2340" }}
                      >
                        {date.getDate()}
                      </span>
                      {appointmentsForDay.length > 0 && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#C9A84C] text-white">
                          {appointmentsForDay.length}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 space-y-1">
                      {appointmentsForDay.slice(0, 2).map((app) => (
                        <button
                          key={app.id}
                          onClick={() => {
                            setSelectedAppointment(app);
                            setShowModal(true);
                          }}
                          className={`w-full text-left text-xs p-1 rounded truncate transition hover:opacity-80 ${getStatusColor(app.status)}`}
                        >
                          {app.heure_creneau} - {app.Prenom} {app.Nom.substring(0, 15)}
                        </button>
                      ))}
                      {appointmentsForDay.length > 2 && (
                        <button
                          onClick={() => setSelectedDate(date)}
                          className="w-full text-xs text-center text-[#C9A84C] hover:underline"
                        >
                          +{appointmentsForDay.length - 2} autres
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Liste mobile */}
          <div className="lg:hidden space-y-3">
            <h3 className="font-semibold text-lg" style={{ color: "#0C2340" }}>
              Liste des rendez-vous
            </h3>
            {appointments
              .filter((app) => filterStatus === "all" || app.status === filterStatus)
              .map((app) => (
                <div
                  key={app.id}
                  className={`bg-white rounded-xl shadow-md border p-4 ${getStatusBgColor(app.status)}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold" style={{ color: "#0C2340" }}>
                        {app.Prenom} {app.Nom}
                      </p>
                      <p className="text-xs text-gray-500">
                        {displayFrenchDate(app.date_creneau)} à {app.heure_creneau}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(app.status)}`}>
                      {getStatusText(app.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{app.Motif_consultation}</p>
                  <button
                    onClick={() => {
                      setSelectedAppointment(app);
                      setShowModal(true);
                    }}
                    className="w-full py-2 rounded-lg text-sm font-medium transition"
                    style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}
                  >
                    <Eye size={14} className="inline mr-1" />
                    Voir les détails
                  </button>
                </div>
              ))}
          </div>
        </>
      )}

      {showModal && <AppointmentModal />}
    </div>
  );
};

export default RendezvousSection;