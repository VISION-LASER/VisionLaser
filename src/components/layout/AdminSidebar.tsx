import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/vision-laser-logo.jpg";

import {
  Eye, LayoutDashboard, Inbox, DollarSign,
  Camera, Newspaper, Clock, HelpCircle, Info, LogOut,Calendar
} from "lucide-react";

const NAVY = "#0C2340";
const GOLD = "#C9A84C";

interface NavItem {
  to: string;
  label: string;
  icon: any;
  end?: boolean;
  badge?: number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Principal",
    items: [
      { to: "/admin/dashboard", label: "Tableau de bord", icon: LayoutDashboard, end: true },
      // { to: "/admin/demandes", label: "Demandes de bilan", icon: Inbox, badge: 3 },
      { to: "/admin/rendez-vous", label: "Rendez-vous", icon: Calendar },
    ],
  },
  {
    label: "Contenu",
    items: [
      // { to: "/admin/tarifs", label: "Tarifs", icon: DollarSign },
      //{ to: "/admin/equipements", label: "Équipements", icon: Camera },
      { to: "/admin/actualite", label: "Actualité", icon: Newspaper },
    ],
  },
  {
    label: "Paramètres",
    items: [
      // { to: "/admin/horaires", label: "Horaires", icon: Clock },
      { to: "/admin/faq", label: "FAQ", icon: HelpCircle },
      //{ to: "/admin/apropos", label: "À propos", icon: Info },
    ],
  },
];

interface Props { isOpen: boolean; onClose: () => void; }

const AdminSidebar = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-full w-60 flex flex-col transition-transform duration-300
        md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      style={{ background: NAVY }}
    >
      {/* Logo */}
      <div
        className="p-5 border-b flex items-center gap-4"
        style={{ borderColor: "rgba(201,168,76,.15)" }}
      >
        <div
          className="w-18 h-16 rounded-full flex items-center justify-center shadow-lg overflow-hidden"
          style={{
            background: "rgba(201,168,76,.08)",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p
            className="font-bold text-[15px] leading-tight"
            style={{ color: GOLD }}
          >
            Centre Vision Laser
          </p>

          <p
            className="text-[11px] mt-1"
            style={{ color: "rgba(201,168,76,.45)" }}
          >
            Administration
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {navGroups.map((group, gi) => (
          <div key={gi}>
            {gi > 0 && <div className="my-2 border-t" style={{ borderColor: "rgba(201,168,76,.1)" }} />}
            <p className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: "rgba(201,168,76,.4)" }}>
              {group.label}
            </p>
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 w-full"
                  style={({ isActive }) => ({
                    color: isActive ? GOLD : "rgba(255,255,255,.55)",
                    background: isActive ? "rgba(201,168,76,.18)" : "transparent",
                  })}
                >
                  <Icon size={17} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(201,168,76,.2)", color: GOLD }}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t space-y-2" style={{ borderColor: "rgba(201,168,76,.1)" }}>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg"
          style={{ background: "rgba(201,168,76,.08)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
            style={{ background: "rgba(201,168,76,.2)", border: "1.5px solid rgba(201,168,76,.4)", color: GOLD }}>
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium truncate" style={{ color: "rgba(255,255,255,.75)" }}>
              {user?.email ?? "Administrateur"}
            </p>
            <p className="text-[10px]" style={{ color: "rgba(201,168,76,.5)" }}>Super admin</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-red-900/30"
          style={{ color: "rgba(255,100,100,.75)" }}
        >
          <LogOut size={16} />
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;