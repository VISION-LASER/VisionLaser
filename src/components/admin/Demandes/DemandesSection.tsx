import React from "react";
import { Mail, Phone, Calendar, Eye } from "lucide-react";

const DemandesSection: React.FC = () => {
  const demandes = [
    { nom: "Sophie Martin", email: "sophie@email.com", telephone: "06 12 34 56 78", date: "2025-05-20", vu: false },
    { nom: "Marc Dubois", email: "marc@email.com", telephone: "06 23 45 67 89", date: "2025-05-19", vu: true },
    { nom: "Emma Leroy", email: "emma@email.com", telephone: "06 34 56 78 90", date: "2025-05-18", vu: false },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
          Demandes de bilan
        </h2>
        <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
        <p className="text-gray-500 mt-2">Consultez les demandes de bilan visuel gratuit</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: "#C9A84C20" }}>
              <tr>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Nom</th>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Email</th>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Téléphone</th>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Date</th>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: "#0C2340" }}>Statut</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map((demande, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4" style={{ color: "#0C2340" }}>{demande.nom}</td>
                  <td className="px-6 py-4 text-gray-600">{demande.email}</td>
                  <td className="px-6 py-4 text-gray-600">{demande.telephone}</td>
                  <td className="px-6 py-4 text-gray-500">{demande.date}</td>
                  <td className="px-6 py-4">
                    {!demande.vu && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "#C9A84C20", color: "#C9A84C" }}>
                        Non lu
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DemandesSection;