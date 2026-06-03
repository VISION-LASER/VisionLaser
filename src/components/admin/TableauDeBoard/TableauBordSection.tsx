import React, { useEffect, useState } from "react";
import { Users, Eye, Clock, MapPin, TrendingUp, RefreshCw } from "lucide-react";
import { fetchDashboardStats } from "../../../services/analyticsService";

// Récupère le token JWT stocké après login
function getToken(): string {
  return localStorage.getItem('token') || '';
}

const TableauBordSection: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const stats = await fetchDashboardStats(getToken(), days);
      setData(stats);
    } catch {
      setError('Impossible de charger les statistiques.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [days]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw className="animate-spin" style={{ color: '#C9A84C' }} size={32} />
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center py-10">{error}</div>
  );

  const { global: g, visits_per_day, regions, top_pages } = data;

  const stats = [
    { title: "Visiteurs uniques",    value: g.total_visitors.toLocaleString(),  icon: <Users size={24} style={{ color: "#C9A84C" }} /> },
    { title: "Pages visitées",       value: g.total_page_views.toLocaleString(), icon: <Eye size={24} style={{ color: "#C9A84C" }} /> },
    { title: "Temps moyen",          value: g.avg_duration,                       icon: <Clock size={24} style={{ color: "#C9A84C" }} /> },
    { title: "Taux de rebond",       value: `${g.bounce_rate}%`,                  icon: <TrendingUp size={24} style={{ color: "#C9A84C" }} /> },
  ];

  // Valeur max pour normaliser le graphique
  const maxVisitors = Math.max(...visits_per_day.map((d: any) => d.visitors), 1);

  return (
    <div className="space-y-6">
      {/* Titre + sélecteur de période */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
            Tableau de bord
          </h2>
          <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          <p className="text-gray-500 mt-2">Statistiques en temps réel</p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
          style={{ color: "#0C2340" }}
        >
          <option value={7}>7 jours</option>
          <option value={30}>30 jours</option>
          <option value={90}>90 jours</option>
        </select>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: "#0C2340" }}>{stat.value}</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#C9A84C20" }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphique + Régions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4" style={{ color: "#0C2340" }}>
            Évolution des visites (7 derniers jours)
          </h3>
          <div className="h-64 flex items-end gap-2">
            {visits_per_day.map((d: any, index: number) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-lg transition-all duration-500 hover:opacity-80"
                  style={{
                    height: `${Math.max((d.visitors / maxVisitors) * 220, 8)}px`,
                    backgroundColor: "#C9A84C",
                  }}
                />
                <span className="text-xs text-gray-500">
                  {new Date(d.date).toLocaleDateString('fr-FR', { weekday: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "#0C2340" }}>
            <MapPin size={20} style={{ color: "#C9A84C" }} />
            Visiteurs par région
          </h3>
          <div className="space-y-3">
            {regions.map((loc: any, index: number) => (
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

      {/* Pages + Infos générales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4" style={{ color: "#0C2340" }}>Pages les plus visitées</h3>
          <div className="space-y-3">
            {top_pages.map((page: any, index: number) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span style={{ color: "#0C2340" }}>{page.page}</span>
                <span className="text-sm font-semibold" style={{ color: "#C9A84C" }}>{page.visits} visites</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4" style={{ color: "#0C2340" }}>Informations générales</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Période d'analyse</span>
              <span className="font-medium" style={{ color: "#0C2340" }}>{days} derniers jours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taux de rebond</span>
              <span className="font-medium" style={{ color: "#0C2340" }}>{g.bounce_rate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pages par visite</span>
              <span className="font-medium" style={{ color: "#0C2340" }}>{g.pages_per_visit}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Nouveaux visiteurs</span>
              <span className="font-medium" style={{ color: "#0C2340" }}>{g.new_visitors_percent}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableauBordSection;