import React, { useEffect, useState, useRef } from "react";
import { Users, Eye, Clock, MapPin, TrendingUp, RefreshCw, FileText, FileSpreadsheet } from "lucide-react";
import { fetchDashboardStats } from "../../../services/analyticsService";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Récupère le token JWT stocké après login
function getToken(): string {
  return localStorage.getItem('token') || '';
}

const TableauBordSection: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);
  const [exporting, setExporting] = useState<'pdf' | 'excel' | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

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

  // Export Excel
  const exportToExcel = () => {
    if (!data) return;
    setExporting('excel');
    
    try {
      const { global: g, visits_per_day, regions, top_pages } = data;
      
      // Feuille 1: Statistiques globales
      const globalData = [
        ["Métrique", "Valeur"],
        ["Visiteurs uniques", g.total_visitors],
        ["Pages visitées", g.total_page_views],
        ["Temps moyen", g.avg_duration],
        ["Taux de rebond", `${g.bounce_rate}%`],
        ["Pages par visite", g.pages_per_visit],
        ["Nouveaux visiteurs", `${g.new_visitors_percent}%`],
        ["Période", `${days} jours`]
      ];
      
      // Feuille 2: Visites par jour
      const visitsData = [
        ["Date", "Visiteurs"],
        ...visits_per_day.map((d: any) => [d.date, d.visitors])
      ];
      
      // Feuille 3: Top pages
      const pagesData = [
        ["Page", "Visites"],
        ...top_pages.map((p: any) => [p.page, p.visits])
      ];
      
      // Feuille 4: Régions
      const regionsData = [
        ["Région", "Visiteurs", "Pourcentage"],
        ...regions.map((r: any) => [r.region, r.visitors, `${r.percentage}%`])
      ];
      
      const ws1 = XLSX.utils.aoa_to_sheet(globalData);
      const ws2 = XLSX.utils.aoa_to_sheet(visitsData);
      const ws3 = XLSX.utils.aoa_to_sheet(pagesData);
      const ws4 = XLSX.utils.aoa_to_sheet(regionsData);
      
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws1, "Statistiques globales");
      XLSX.utils.book_append_sheet(wb, ws2, "Visites par jour");
      XLSX.utils.book_append_sheet(wb, ws3, "Pages populaires");
      XLSX.utils.book_append_sheet(wb, ws4, "Visiteurs par région");
      
      XLSX.writeFile(wb, `dashboard_stats_${days}jours_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (err) {
      console.error("Erreur export Excel:", err);
      setError("Erreur lors de l'export Excel");
    } finally {
      setExporting(null);
    }
  };

  // Export PDF
  const exportToPDF = () => {
    if (!data) return;
    setExporting('pdf');
    
    try {
      const { global: g, visits_per_day, regions, top_pages } = data;
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const today = new Date().toLocaleDateString('fr-FR');
      
      // Titre
      doc.setFontSize(20);
      doc.setTextColor(12, 35, 64);
      doc.text("Tableau de bord - Vision Laser", pageWidth / 2, 20, { align: "center" });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Généré le ${today} - Période: ${days} derniers jours`, pageWidth / 2, 30, { align: "center" });
      
      // Ligne de séparation
      doc.setDrawColor(201, 168, 76);
      doc.line(20, 35, pageWidth - 20, 35);
      
      // Section 1: Métriques clés
      doc.setFontSize(14);
      doc.setTextColor(12, 35, 64);
      doc.text("Métriques clés", 20, 50);
      
      const metricsData = [
        ["Visiteurs uniques", g.total_visitors.toLocaleString()],
        ["Pages visitées", g.total_page_views.toLocaleString()],
        ["Temps moyen", g.avg_duration],
        ["Taux de rebond", `${g.bounce_rate}%`],
        ["Pages par visite", g.pages_per_visit],
        ["Nouveaux visiteurs", `${g.new_visitors_percent}%`]
      ];
      
      autoTable(doc, {
        startY: 55,
        head: [["Métrique", "Valeur"]],
        body: metricsData,
        theme: "striped",
        headStyles: { fillColor: [201, 168, 76], textColor: [255, 255, 255], fontSize: 10 },
        bodyStyles: { fontSize: 9 },
        columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 40 } },
        margin: { left: 20 }
      });
      
      let currentY = (doc as any).lastAutoTable.finalY + 15;
      
      // Section 2: Top pages
      doc.setFontSize(14);
      doc.setTextColor(12, 35, 64);
      doc.text("Pages les plus visitées", 20, currentY);
      
      const pagesBody = top_pages.map((p: any) => [p.page, p.visits]);
      autoTable(doc, {
        startY: currentY + 5,
        head: [["Page", "Visites"]],
        body: pagesBody,
        theme: "striped",
        headStyles: { fillColor: [201, 168, 76], textColor: [255, 255, 255], fontSize: 10 },
        bodyStyles: { fontSize: 9 },
        margin: { left: 20 }
      });
      
      currentY = (doc as any).lastAutoTable.finalY + 15;
      
      // Section 3: Régions
      doc.setFontSize(14);
      doc.setTextColor(12, 35, 64);
      doc.text("Visiteurs par région", 20, currentY);
      
      const regionsBody = regions.map((r: any) => [r.region, r.visitors, `${r.percentage}%`]);
      autoTable(doc, {
        startY: currentY + 5,
        head: [["Région", "Visiteurs", "Pourcentage"]],
        body: regionsBody,
        theme: "striped",
        headStyles: { fillColor: [201, 168, 76], textColor: [255, 255, 255], fontSize: 10 },
        bodyStyles: { fontSize: 9 },
        margin: { left: 20 }
      });
      
      currentY = (doc as any).lastAutoTable.finalY + 15;
      
      // Section 4: Évolution des visites (tableau)
      if (currentY + 40 > doc.internal.pageSize.getHeight()) {
        doc.addPage();
        currentY = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(12, 35, 64);
      doc.text("Évolution des visites (7 derniers jours)", 20, currentY);
      
      const visitsBody = visits_per_day.map((d: any) => [
        new Date(d.date).toLocaleDateString('fr-FR'),
        d.visitors
      ]);
      
      autoTable(doc, {
        startY: currentY + 5,
        head: [["Date", "Visiteurs"]],
        body: visitsBody,
        theme: "striped",
        headStyles: { fillColor: [201, 168, 76], textColor: [255, 255, 255], fontSize: 10 },
        bodyStyles: { fontSize: 9 },
        margin: { left: 20 }
      });
      
      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          "Vision Laser Hauts-de-France - Dashboard analytique",
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }
      
      doc.save(`dashboard_stats_${days}jours_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error("Erreur export PDF:", err);
      setError("Erreur lors de l'export PDF");
    } finally {
      setExporting(null);
    }
  };

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

  const maxVisitors = Math.max(...visits_per_day.map((d: any) => d.visitors), 1);

  return (
    <div className="space-y-6" ref={dashboardRef}>
      {/* Titre + sélecteur de période + boutons export */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
            Tableau de bord
          </h2>
          <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          <p className="text-gray-500 mt-2">Statistiques en temps réel</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
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
          
          {/* Boutons d'export */}
          <div className="flex gap-2">
            <button
              onClick={exportToExcel}
              disabled={exporting !== null}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: "#107C41", color: "#fff" }}
            >
              <FileSpreadsheet size={16} />
              {exporting === 'excel' ? 'Export...' : 'Excel'}
            </button>
            <button
              onClick={exportToPDF}
              disabled={exporting !== null}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: "#DC2626", color: "#fff" }}
            >
              <FileText size={16} />
              {exporting === 'pdf' ? 'Export...' : 'PDF'}
            </button>
          </div>
        </div>
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