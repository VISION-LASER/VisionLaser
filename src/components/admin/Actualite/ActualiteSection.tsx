import React, { useState } from "react";
import { Share2, Video, Camera, Globe } from "lucide-react";

const ActualiteSection: React.FC = () => {
  const [actualite, setActualite] = useState({
    titre: "Notre centre vous accompagne",
    description: "Découvrez la chirurgie laser pour vous libérer de vos lunettes",
    instagram: "@centre.vision.las",
    tiktok: "@centre.vision.las",
    facebook: "CentreVisionLaser"
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
          Gestion des actualités
        </h2>
        <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
        <p className="text-gray-500 mt-2">Modifiez le contenu des réseaux sociaux et la description</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
            Titre
          </label>
          <input 
            type="text" 
            value={actualite.titre}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            style={{ borderColor: "#E2E8F0" }}
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
            Description
          </label>
          <textarea 
            rows={4}
            value={actualite.description}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            style={{ borderColor: "#E2E8F0" }}
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <label className="block text-sm font-medium mb-2 flex items-center gap-2" style={{ color: "#0C2340" }}>
            <Camera size={20} style={{ color: "#C9A84C" }} />
            Instagram
          </label>
          <input 
            type="text" 
            value={actualite.instagram}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            style={{ borderColor: "#E2E8F0" }}
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <label className="block text-sm font-medium mb-2 flex items-center gap-2" style={{ color: "#0C2340" }}>
            <Video size={20} style={{ color: "#C9A84C" }} />
            TikTok
          </label>
          <input 
            type="text" 
            value={actualite.tiktok}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            style={{ borderColor: "#E2E8F0" }}
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <label className="block text-sm font-medium mb-2 flex items-center gap-2" style={{ color: "#0C2340" }}>
            <Globe size={20} style={{ color: "#C9A84C" }} />
            Facebook
          </label>
          <input 
            type="text" 
            value={actualite.facebook}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            style={{ borderColor: "#E2E8F0" }}
          />
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
    </div>
  );
};

export default ActualiteSection;