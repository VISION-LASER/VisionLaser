import React, { useState } from "react";

const TarifsSection: React.FC = () => {
  const [tarifs, setTarifs] = useState([
    { technique: "FemtoLASIK", prix: "1 500 €", oeil: "1 800 €", note: "Par œil" },
    { technique: "TPRK", prix: "1 400 €", oeil: "1 700 €", note: "Par œil" },
  ]);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
          Gestion des tarifs
        </h2>
        <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
        <p className="text-gray-500 mt-2">Modifiez les tarifs affichés sur le site</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <table className="w-full">
          <thead style={{ backgroundColor: "#C9A84C20" }}>
            <tr>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Technique</th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Prix (1 œil)</th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Prix (2 yeux)</th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Note</th>
            </tr>
          </thead>
          <tbody>
            {tarifs.map((tarif, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="px-6 py-4" style={{ color: "#0C2340" }}>{tarif.technique}</td>
                <td className="px-6 py-4">
                  <input 
                    type="text" 
                    value={tarif.prix} 
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                    style={{ borderColor: "#E2E8F0" }}
                  />
                </td>
                <td className="px-6 py-4">
                  <input 
                    type="text" 
                    value={tarif.oeil} 
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                    style={{ borderColor: "#E2E8F0" }}
                  />
                </td>
                <td className="px-6 py-4 text-gray-500">{tarif.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default TarifsSection;