import React, { useState } from "react";

const HorairesSection: React.FC = () => {
  const [horaires, setHoraires] = useState([
    { jour: "Lundi", de: "09:00", a: "19:00", ferme: false },
    { jour: "Mardi", de: "09:00", a: "19:00", ferme: false },
    { jour: "Mercredi", de: "09:00", a: "19:00", ferme: false },
    { jour: "Jeudi", de: "09:00", a: "19:00", ferme: false },
    { jour: "Vendredi", de: "09:00", a: "19:00", ferme: false },
    { jour: "Samedi", de: "09:00", a: "13:00", ferme: false },
    { jour: "Dimanche", de: "", a: "", ferme: true },
  ]);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
          Gestion des horaires
        </h2>
        <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
        <p className="text-gray-500 mt-2">Modifiez les horaires d'ouverture du centre</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: "#C9A84C20" }}>
              <tr>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Jour</th>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Ouverture</th>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Fermeture</th>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Fermé</th>
              </tr>
            </thead>
            <tbody>
              {horaires.map((horaire, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium" style={{ color: "#0C2340" }}>{horaire.jour}</td>
                  <td className="px-6 py-4">
                    {!horaire.ferme && (
                      <input 
                        type="time" 
                        value={horaire.de} 
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                        style={{ borderColor: "#E2E8F0" }}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {!horaire.ferme && (
                      <input 
                        type="time" 
                        value={horaire.a} 
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                        style={{ borderColor: "#E2E8F0" }}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={horaire.ferme} className="w-5 h-5 accent-[#C9A84C]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
          style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
};

export default HorairesSection;