import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../config/api.config";

import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  AlertCircle,
  RefreshCw,
  Filter,
  Eye,
  Trash2,
  FileText,
} from "lucide-react";

interface Devis {
  id: number;
  civilite: string;
  nomPrenom: string;
  email: string;
  telephone: string;
  status: "pending" | "treated" | "cancelled";
  created_at: string;
  updated_at: string;
}

export function DevisSection() {
  const [devisList, setDevisList] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDevis, setSelectedDevis] = useState<Devis | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Formater la date de création en français
  const displayFrenchDateTime = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Charger les devis
  const loadDevis = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_BASE_URL}/devis`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des devis");
      }

      const data = await response.json();
      const list = data.data || data;
      setDevisList(list);
    } catch (err) {
      setError("Impossible de charger les devis");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevis();
  }, []);

  // Mettre à jour le statut
  const updateDevisStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_BASE_URL}/devis/${id}/status`, {
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

      setDevisList((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: status as any } : d))
      );

      if (selectedDevis?.id === id) {
        setSelectedDevis({ ...selectedDevis, status: status as any });
      }
    } catch (err) {
      console.error("Erreur:", err);
      setError("Impossible de mettre à jour le devis");
    }
  };

  // Supprimer un devis
  const deleteDevis = async (id: number) => {
    if (!confirm("Supprimer ce devis ?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_BASE_URL}/devis/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      await loadDevis();
      setShowModal(false);
      setSelectedDevis(null);
    } catch (err) {
      console.error("Erreur:", err);
      setError("Impossible de supprimer le devis");
    }
  };

  // Couleurs selon le statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "treated":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "treated":
        return "✓ Traité";
      case "cancelled":
        return "Annulé";
      default:
        return "⏳ En attente";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "treated":
        return "bg-green-50 border-green-200";
      case "cancelled":
        return "bg-gray-50 border-gray-200";
      default:
        return "bg-yellow-50 border-yellow-200";
    }
  };

  const filteredDevis = devisList.filter(
    (d) => filterStatus === "all" || d.status === filterStatus
  );

  // Modal des détails
  const DevisModal = () => {
    if (!selectedDevis) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold" style={{ color: "#0C2340" }}>
              Détails de la demande de devis
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
            <div className={`p-3 rounded-xl border ${getStatusBgColor(selectedDevis.status)}`}>
              <p className="text-sm font-medium mb-1">Statut actuel</p>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  selectedDevis.status
                )}`}
              >
                {getStatusText(selectedDevis.status)}
              </span>
            </div>

            {/* Infos demandeur */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User size={18} style={{ color: "#C9A84C" }} />
                <span className="font-medium" style={{ color: "#0C2340" }}>
                  {selectedDevis.civilite} {selectedDevis.nomPrenom}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} style={{ color: "#C9A84C" }} />
                <span className="text-gray-600">{selectedDevis.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} style={{ color: "#C9A84C" }} />
                <span className="text-gray-600">{selectedDevis.telephone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} style={{ color: "#C9A84C" }} />
                <span className="text-gray-600">
                  Reçu le {displayFrenchDateTime(selectedDevis.created_at)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={() => updateDevisStatus(selectedDevis.id, "treated")}
                  disabled={selectedDevis.status === "treated"}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${
                    selectedDevis.status === "treated"
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  <CheckCircle size={16} />
                  Marquer traité
                </button>

                <button
                  onClick={() => updateDevisStatus(selectedDevis.id, "cancelled")}
                  disabled={selectedDevis.status === "cancelled"}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${
                    selectedDevis.status === "cancelled"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gray-600 hover:bg-gray-700 text-white"
                  }`}
                >
                  Annuler
                </button>
              </div>

              <a
                href={`mailto:${selectedDevis.email}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition"
                style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}
              >
                <Mail size={16} />
                Répondre par e-mail
              </a>

              <button
                onClick={() => deleteDevis(selectedDevis.id)}
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
            Gestion des demandes de devis
          </h2>
          <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Gérez les demandes de devis reçues via le site
            {!loading && devisList.length > 0 && (
              <span className="ml-2 text-xs">
                ({devisList.length} demande{devisList.length > 1 ? "s" : ""} au total)
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadDevis}
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
          {["all", "pending", "treated", "cancelled"].map((status) => (
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

      {/* Loading / Error */}
      {loading && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div
            className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2"
            style={{ borderColor: "#C9A84C" }}
          />
          <p className="mt-3 text-gray-500">Chargement des devis...</p>
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertCircle size={20} className="text-red-500 shrink-0" />
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={loadDevis} className="ml-auto text-sm underline" style={{ color: "#C9A84C" }}>
            Réessayer
          </button>
        </div>
      )}

      {/* Liste des devis (table desktop) */}
      {!loading && !error && (
        <>
          <div className="hidden lg:block bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {filteredDevis.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <FileText size={32} className="mx-auto mb-2 text-gray-300" />
                Aucune demande de devis pour ce filtre.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100" style={{ backgroundColor: "#C9A84C10" }}>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: "#0C2340" }}>
                      Demandeur
                    </th>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: "#0C2340" }}>
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: "#0C2340" }}>
                      Téléphone
                    </th>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: "#0C2340" }}>
                      Reçu le
                    </th>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: "#0C2340" }}>
                      Statut
                    </th>
                    <th className="text-right py-3 px-4 font-medium" style={{ color: "#0C2340" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDevis.map((d) => (
                    <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="py-3 px-4 font-medium" style={{ color: "#0C2340" }}>
                        {d.civilite} {d.nomPrenom}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{d.email}</td>
                      <td className="py-3 px-4 text-gray-600">{d.telephone}</td>
                      <td className="py-3 px-4 text-gray-500 text-xs">
                        {displayFrenchDateTime(d.created_at)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(d.status)}`}>
                          {getStatusText(d.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedDevis(d);
                            setShowModal(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition"
                          style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}
                        >
                          <Eye size={14} />
                          Voir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Liste mobile */}
          <div className="lg:hidden space-y-3">
            <h3 className="font-semibold text-lg" style={{ color: "#0C2340" }}>
              Liste des demandes de devis
            </h3>
            {filteredDevis.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
                <FileText size={32} className="mx-auto mb-2 text-gray-300" />
                Aucune demande de devis pour ce filtre.
              </div>
            ) : (
              filteredDevis.map((d) => (
                <div
                  key={d.id}
                  className={`bg-white rounded-xl shadow-md border p-4 ${getStatusBgColor(d.status)}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold" style={{ color: "#0C2340" }}>
                        {d.civilite} {d.nomPrenom}
                      </p>
                      <p className="text-xs text-gray-500">{d.email}</p>
                      <p className="text-xs text-gray-500">{d.telephone}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(d.status)}`}>
                      {getStatusText(d.status)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">
                    Reçu le {displayFrenchDateTime(d.created_at)}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedDevis(d);
                      setShowModal(true);
                    }}
                    className="w-full py-2 rounded-lg text-sm font-medium transition"
                    style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}
                  >
                    <Eye size={14} className="inline mr-1" />
                    Voir les détails
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {showModal && <DevisModal />}
    </div>
  );
}

export default DevisSection;
