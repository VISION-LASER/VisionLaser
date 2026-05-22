import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Info, 
  Menu, 
  X,
  DollarSign,
  Camera,
  HelpCircle,
  Inbox,
  Clock,
  Newspaper,
  BarChart3,
  MapPin,
  TrendingUp,
  Users
} from "lucide-react";
import TableauBordSection from "../../components/admin/TableauDeBoard/TableauBordSection";
import TarifsSection from "../../components/admin/Tarifs/TarifsSection";
import EquipementsSection from "../../components/admin/Equipements/EquipementsSection";
import FAQSection from "../../components/admin/FAQ/FAQSection";
import DemandesSection from "../../components/admin/Demandes/DemandesSection";
import HorairesSection from "../../components/admin/Horaires/HorairesSection";
import ActualiteSection from "../../components/admin/Actualite/ActualiteSection";
import AproposSection from "../../components/admin/Apropos/AproposSection";

type TabType = 
  | "dashboard"
  | "tarifs"
  | "equipements"
  | "faq"
  | "demandes"
  | "horaires"
  | "actualite"
  | "apropos";

const DashboardAdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const menuItems = [
    { id: "dashboard" as TabType, label: "Tableau de bord", icon: <LayoutDashboard size={20} /> },
    { id: "tarifs" as TabType, label: "Tarifs", icon: <DollarSign size={20} /> },
    { id: "equipements" as TabType, label: "Équipements", icon: <Camera size={20} /> },
    { id: "faq" as TabType, label: "FAQ", icon: <HelpCircle size={20} /> },
    { id: "demandes" as TabType, label: "Demandes de bilan", icon: <Inbox size={20} /> },
    { id: "horaires" as TabType, label: "Horaires", icon: <Clock size={20} /> },
    { id: "actualite" as TabType, label: "Actualité", icon: <Newspaper size={20} /> },
    { id: "apropos" as TabType, label: "À propos", icon: <Info size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar en haut */}
      <nav 
        className="fixed top-0 right-0 left-0 z-20 h-16 flex items-center justify-between px-4 md:px-6 shadow-md"
        style={{ backgroundColor: "#C9A84C" }}
      >
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-black/10 transition-colors md:hidden"
        >
          <Menu size={24} style={{ color: "#0C2340" }} />
        </button>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-lg md:text-xl font-bold" style={{ color: "#0C2340" }}>
            Administration Centre Vision Laser
          </h1>
        </div>

        <div className="w-8 md:w-10" />
      </nav>

      {/* Sidebar overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar gauche */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 transform transition-transform duration-300 ease-in-out shadow-xl md:translate-x-0 md:top-16 md:z-10 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#C9A84C" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-black/10 md:hidden">
          <span className="font-bold text-lg" style={{ color: "#0C2340" }}>
            Menu
          </span>
          <button onClick={closeSidebar} className="p-1 rounded-lg hover:bg-black/10">
            <X size={24} style={{ color: "#0C2340" }} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                closeSidebar();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-white shadow-md"
                  : "hover:bg-black/10"
              }`}
              style={{ color: "#0C2340" }}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="pt-16 md:pl-64">
        <div className="p-4 md:p-6">
          {activeTab === "dashboard" && <TableauBordSection />}
          {activeTab === "tarifs" && <TarifsSection />}
          {activeTab === "equipements" && <EquipementsSection />}
          {activeTab === "faq" && <FAQSection />}
          {activeTab === "demandes" && <DemandesSection />}
          {activeTab === "horaires" && <HorairesSection />}
          {activeTab === "actualite" && <ActualiteSection />}
          {activeTab === "apropos" && <AproposSection />}
        </div>
      </main>
    </div>
  );
};

export default DashboardAdminPage;