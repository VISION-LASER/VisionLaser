import React from "react";

const AproposSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
          À propos
        </h2>
        <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
        <p className="text-gray-500 mt-2">Informations sur l'application</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
        <h3 className="text-xl font-semibold mb-4" style={{ color: "#0C2340" }}>
          Centre Vision Laser des Hauts-de-France
        </h3>
        
        <div className="space-y-4 text-gray-600">
          <p>
            Cette interface d'administration permet de gérer le contenu du site 
            <strong className="font-semibold" style={{ color: "#0C2340" }}> vision-laser.fr</strong>
          </p>
          
          <p>Fonctionnalités disponibles :</p>
          
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Gestion des tarifs</li>
            <li>Gestion des photos des équipements</li>
            <li>Gestion des questions de la FAQ</li>
            <li>Consultation des demandes de bilan</li>
            <li>Modification des horaires d'ouverture</li>
            <li>Gestion des actualités et réseaux sociaux</li>
            <li>Tableau de bord avec statistiques de visite</li>
          </ul>
          
          <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: "#F8F7F4" }}>
            <p className="text-sm" style={{ color: "#0C2340" }}>
              <span className="font-semibold">Version :</span> 1.0.0
            </p>
            <p className="text-sm mt-1" style={{ color: "#0C2340" }}>
              <span className="font-semibold">Dernière mise à jour :</span> Mai 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AproposSection;