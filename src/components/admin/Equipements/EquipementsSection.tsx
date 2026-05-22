import React, { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";

const EquipementsSection: React.FC = () => {
  const [equipements, setEquipements] = useState([
    { nom: "Laser AMARIS 1050 RS", description: "Laser excimer haute précision", image: "amariss.jpg" },
    { nom: "Laser femtoseconde Ziemer", description: "Création du volet cornéen", image: "ziemer.jpg" },
    { nom: "Topographe SIRIUS", description: "Analyse de la cornée", image: "sirius.jpg" },
    { nom: "Aberromètre OWA", description: "Mesure des aberrations", image: "owa.jpg" },
  ]);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
          Gestion des équipements
        </h2>
        <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
        <p className="text-gray-500 mt-2">Ajoutez ou modifiez les équipements présentés sur le site</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {equipements.map((equip, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold" style={{ color: "#0C2340" }}>{equip.nom}</h3>
                <p className="text-gray-500 mt-2">{equip.description}</p>
                <p className="text-sm mt-2 text-gray-400">Image: {equip.image}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Edit2 size={18} style={{ color: "#C9A84C" }} />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="w-full py-4 rounded-xl border-2 border-dashed transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
        style={{ borderColor: "#C9A84C", color: "#C9A84C" }}
      >
        <Plus size={20} />
        Ajouter un équipement
      </button>
    </div>
  );
};

export default EquipementsSection;