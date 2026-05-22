import React from "react";
import { Users, Eye, Clock, MapPin, TrendingUp } from "lucide-react";

const TableauBordSection: React.FC = () => {
  // Données statistiques (à remplacer par des données réelles plus tard)
  const stats = [
    { 
      title: "Visiteurs", 
      value: "1,234", 
      change: "+12%", 
      icon: <Users size={24} style={{ color: "#C9A84C" }} />,
      color: "#C9A84C"
    },
    { 
      title: "Pages visitées", 
      value: "3,456", 
      change: "+8%", 
      icon: <Eye size={24} style={{ color: "#C9A84C" }} />,
      color: "#C9A84C"
    },
    { 
      title: "Temps passé", 
      value: "2m 34s", 
      change: "+5%", 
      icon: <Clock size={24} style={{ color: "#C9A84C" }} />,
      color: "#C9A84C"
    },
    { 
      title: "Taux de conversion", 
      value: "3.2%", 
      change: "+1.5%", 
      icon: <TrendingUp size={24} style={{ color: "#C9A84C" }} />,
      color: "#C9A84C"
    },
  ];

  // Données géographiques
  const locations = [
    { region: "Hauts-de-France", visitors: 456, percentage: 37 },
    { region: "Île-de-France", visitors: 234, percentage: 19 },
    { region: "Normandie", visitors: 123, percentage: 10 },
    { region: "Grand Est", visitors: 98, percentage: 8 },
    { region: "Autres", visitors: 323, percentage: 26 },
  ];

  // Pages les plus visitées
  const topPages = [
    { page: "Accueil", visits: 1234 },
    { page: "FemtoLASIK", visits: 892 },
    { page: "Tarifs", visits: 756 },
    { page: "Contact", visits: 567 },
    { page: "Équipements", visits: 345 },
  ];

  return (
    <div className="space-y-6">
      {/* Titre */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
          Tableau de bord
        </h2>
        <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
        <p className="text-gray-500 mt-2">Bienvenue dans l'interface d'administration</p>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: "#0C2340" }}>{stat.value}</p>
                <p className="text-xs text-green-500 mt-1">{stat.change}</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-opacity-10" style={{ backgroundColor: "#C9A84C20" }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphique chart et géolocalisation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique d'évolution (chart) */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4" style={{ color: "#0C2340" }}>
            Évolution des visites (7 derniers jours)
          </h3>
          <div className="h-64 flex items-end gap-2">
            {[65, 78, 82, 71, 89, 94, 86].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full rounded-lg transition-all duration-500 hover:opacity-80"
                  style={{ 
                    height: `${value * 2}px`,
                    backgroundColor: "#C9A84C",
                    opacity: 0.7 + (index * 0.05)
                  }}
                />
                <span className="text-xs text-gray-500">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Géolocalisation */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "#0C2340" }}>
            <MapPin size={20} style={{ color: "#C9A84C" }} />
            Visiteurs par région
          </h3>
          <div className="space-y-3">
            {locations.map((loc, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: "#0C2340" }}>{loc.region}</span>
                  <span className="text-gray-500">{loc.visitors} visiteurs ({loc.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ width: `${loc.percentage}%`, backgroundColor: "#C9A84C" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pages visitées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4" style={{ color: "#0C2340" }}>
            Pages les plus visitées
          </h3>
          <div className="space-y-3">
            {topPages.map((page, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span style={{ color: "#0C2340" }}>{page.page}</span>
                <span className="text-sm font-semibold" style={{ color: "#C9A84C" }}>{page.visits} visites</span>
              </div>
            ))}
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4" style={{ color: "#0C2340" }}>
            Informations générales
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Période d'analyse</span>
              <span className="font-medium" style={{ color: "#0C2340" }}>Dernier mois</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taux de rebond</span>
              <span className="font-medium" style={{ color: "#0C2340" }}>42%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pages par visite</span>
              <span className="font-medium" style={{ color: "#0C2340" }}>3.2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Nouveaux visiteurs</span>
              <span className="font-medium" style={{ color: "#0C2340" }}>68%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableauBordSection;