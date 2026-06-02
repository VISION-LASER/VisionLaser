import React, { useState, useEffect } from "react";
import { RefreshCw, Save, Clock, AlertCircle } from "lucide-react";
import { horaireService } from "../../../services/horaireService";
import type { Horaire } from "../../../services/horaireService";

// Liste fixe des jours de la semaine
const JOURS_SEMAINE = [
  "Lundi",
  "Mardi", 
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche"
];

const HorairesSection: React.FC = () => {
  const [horaires, setHoraires] = useState<Horaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [modifiedJour, setModifiedJour] = useState<Set<string>>(new Set());

  // Charger les horaires
  const loadHoraires = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await horaireService.getAll();
      
      // S'assurer que tous les jours sont présents
      const horairesMap = new Map(data.map(h => [h.jour, h]));
      const completeHoraires = JOURS_SEMAINE.map(jour => {
        if (horairesMap.has(jour)) {
          return horairesMap.get(jour)!;
        }
        // Créer un horaire par défaut si le jour n'existe pas
        return {
          id: 0,
          jour: jour,
          ouverture: "09:00",
          fermeture: "19:00",
          ferme: jour === "Dimanche",
          admin_id: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as Horaire;
      });
      
      setHoraires(completeHoraires);
      setModifiedJour(new Set());
    } catch (err) {
      setError("Impossible de charger les horaires");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHoraires();
  }, []);

  // Mettre à jour un champ d'un horaire
  const updateHoraire = (jour: string, field: keyof Horaire, value: any) => {
    setHoraires(prev => prev.map(h => {
      if (h.jour === jour) {
        setModifiedJour(prevSet => new Set(prevSet).add(jour));
        return { ...h, [field]: value };
      }
      return h;
    }));
  };

  // Sauvegarder les modifications
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Filtrer les horaires modifiés
      const horairesToUpdate = horaires.filter(h => modifiedJour.has(h.jour));
      
      for (const horaire of horairesToUpdate) {
        const dataToSave = {
          jour: horaire.jour,
          ouverture: horaire.ferme ? "09:00" : horaire.ouverture,
          fermeture: horaire.ferme ? "19:00" : horaire.fermeture,
          ferme: horaire.ferme ? true : false
        };
        
        if (horaire.id === 0) {
          // Créer un nouvel enregistrement
          await horaireService.create(dataToSave);
        } else {
          // Mettre à jour l'enregistrement existant
          await horaireService.update(horaire.id, dataToSave);
        }
      }
      
      setSuccess("Horaires sauvegardés avec succès !");
      setModifiedJour(new Set());
      
      // Recharger pour avoir les IDs à jour
      setTimeout(() => {
        loadHoraires();
      }, 1000);
    } catch (err) {
      setError("Erreur lors de la sauvegarde des horaires");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Formater l'heure pour l'affichage
  const formatTimeForInput = (time: string) => {
    if (!time) return "09:00";
    return time;
  };

  // Version Desktop: Tableau
  const DesktopTable = () => (
    <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead style={{ backgroundColor: "#C9A84C20" }}>
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0C2340" }}>Jour</th>
              <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0C2340" }}>Ouverture</th>
              <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0C2340" }}>Fermeture</th>
              <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0C2340" }}>Fermé</th>
            </tr>
          </thead>
          <tbody>
            {horaires.map((horaire) => (
              <tr key={horaire.jour} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium" style={{ color: "#0C2340" }}>
                  {horaire.jour}
                </td>
                <td className="px-6 py-4">
                  {!horaire.ferme ? (
                    <input
                      type="time"
                      value={formatTimeForInput(horaire.ouverture)}
                      onChange={(e) => updateHoraire(horaire.jour, 'ouverture', e.target.value)}
                      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] transition-all"
                      style={{ borderColor: "#E2E8F0", backgroundColor: modifiedJour.has(horaire.jour) ? "#FEF3C7" : "white" }}
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {!horaire.ferme ? (
                    <input
                      type="time"
                      value={formatTimeForInput(horaire.fermeture)}
                      onChange={(e) => updateHoraire(horaire.jour, 'fermeture', e.target.value)}
                      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] transition-all"
                      style={{ borderColor: "#E2E8F0", backgroundColor: modifiedJour.has(horaire.jour) ? "#FEF3C7" : "white" }}
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={horaire.ferme === true}
                    onChange={(e) => {
                      updateHoraire(horaire.jour, 'ferme', e.target.checked);
                      if (e.target.checked) {
                        updateHoraire(horaire.jour, 'ouverture', '09:00');
                        updateHoraire(horaire.jour, 'fermeture', '19:00');
                      }
                    }}
                    className="w-5 h-5 rounded focus:ring-2 focus:ring-[#C9A84C]"
                    style={{ accentColor: "#C9A84C" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Version Mobile: Cartes
  const MobileCards = () => (
    <div className="lg:hidden space-y-3">
      {horaires.map((horaire) => (
        <div key={horaire.jour} className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-base" style={{ color: "#0C2340" }}>
              {horaire.jour}
            </h3>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Fermé</span>
              <input
                type="checkbox"
                checked={horaire.ferme === true}
                onChange={(e) => {
                  updateHoraire(horaire.jour, 'ferme', e.target.checked);
                  if (e.target.checked) {
                    updateHoraire(horaire.jour, 'ouverture', '09:00');
                    updateHoraire(horaire.jour, 'fermeture', '19:00');
                  }
                }}
                className="w-5 h-5 rounded"
                style={{ accentColor: "#C9A84C" }}
              />
            </label>
          </div>
          
          {!horaire.ferme ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Ouverture</label>
                <input
                  type="time"
                  value={formatTimeForInput(horaire.ouverture)}
                  onChange={(e) => updateHoraire(horaire.jour, 'ouverture', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                  style={{ borderColor: "#E2E8F0", backgroundColor: modifiedJour.has(horaire.jour) ? "#FEF3C7" : "white" }}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Fermeture</label>
                <input
                  type="time"
                  value={formatTimeForInput(horaire.fermeture)}
                  onChange={(e) => updateHoraire(horaire.jour, 'fermeture', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                  style={{ borderColor: "#E2E8F0", backgroundColor: modifiedJour.has(horaire.jour) ? "#FEF3C7" : "white" }}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <span className="text-gray-400 text-sm">Fermé</span>
            </div>
          )}
          
          {modifiedJour.has(horaire.jour) && (
            <div className="mt-2 text-right">
              <span className="text-xs text-amber-600"> Non sauvegardé</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
            Gestion des horaires
          </h2>
          <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Modifiez les horaires d'ouverture du centre
            {modifiedJour.size > 0 && (
              <span className="ml-2 text-xs text-amber-600">
                ({modifiedJour.size} modification{modifiedJour.size > 1 ? 's' : ''} en attente)
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadHoraires}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg transition-all hover:scale-105 disabled:opacity-50"
            style={{ backgroundColor: "#E5E7EB", color: "#0C2340" }}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Rafraîchir
          </button>
          <button
            onClick={handleSave}
            disabled={saving || modifiedJour.size === 0}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
          >
            <Save size={16} className={saving ? "animate-spin" : ""} />
            {saving ? "Sauvegarde..." : "Enregistrer"}
          </button>
        </div>
      </div>

      {/* État de chargement */}
      {loading && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: "#C9A84C" }} />
          <p className="mt-3 text-gray-500">Chargement des horaires...</p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && !loading && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertCircle size={20} className="text-red-500 shrink-0" />
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={loadHoraires}
            className="ml-auto text-sm underline"
            style={{ color: "#C9A84C" }}
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Message de succès */}
      {success && !loading && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-green-600 text-sm">{success}</p>
        </div>
      )}

      {/* Tableau Desktop */}
      {!loading && horaires.length > 0 && <DesktopTable />}

      {/* Cartes Mobile */}
      {!loading && horaires.length > 0 && <MobileCards />}

      {/* Indicateur de jours modifiés */}
      {modifiedJour.size > 0 && !loading && (
        <div className="fixed bottom-4 right-4 lg:hidden">
          <div className="bg-amber-100 rounded-full px-3 py-1.5 shadow-lg">
            <span className="text-xs text-amber-700">{modifiedJour.size} modification(s)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HorairesSection;