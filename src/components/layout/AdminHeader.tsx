import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Bell, Settings, CalendarDays, Inbox, Eye, Trash2 } from "lucide-react";

const NAVY = "#0C2340";
const GOLD = "#C9A84C";

const labels: Record<string, string> = {
  "/admin/dashboard":   "Tableau de bord",
  "/admin/demandes":    "Demandes de bilan",
  "/admin/tarifs":      "Tarifs",
  "/admin/equipements": "Équipements",
  "/admin/actualite":   "Actualité",
  "/admin/horaires":    "Horaires",
  "/admin/faq":         "FAQ",
  "/admin/apropos":     "À propos",
};

interface Notification {
  id: number;
  nom: string;
  message: string;
  heure: string;
  lue: boolean;
}

const INITIAL_NOTIFS: Notification[] = [
  { id: 1, nom: "Sophie Martin", message: "Nouvelle demande de bilan visuel", heure: "Il y a 10 min", lue: false },
  { id: 2, nom: "Marc Dubois",   message: "Nouvelle demande de bilan visuel", heure: "Il y a 1h",     lue: false },
  { id: 3, nom: "Emma Leroy",    message: "Nouvelle demande de bilan visuel", heure: "Il y a 3h",     lue: true  },
];

interface Props { onMenuClick: () => void; }

const AdminHeader = ({ onMenuClick }: Props) => {
  const { pathname } = useLocation();
  const title = labels[pathname] ?? "Administration";

  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL_NOTIFS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter((n) => !n.lue).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Bloque le scroll body sur mobile quand le panel est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const markAllRead = () => setNotifs((p) => p.map((n) => ({ ...n, lue: true })));
  const markRead    = (id: number) => setNotifs((p) => p.map((n) => n.id === id ? { ...n, lue: true } : n));
  const deleteNotif = (id: number) => setNotifs((p) => p.filter((n) => n.id !== id));

  // Contenu partagé desktop dropdown + mobile panel
  const PanelContent = () => (
    <>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b shrink-0"
        style={{ borderColor: "rgba(12,35,64,.07)" }}
      >
        <div className="flex items-center gap-2">
          <Bell size={14} color={GOLD} />
          <span className="text-[13px] font-semibold" style={{ color: NAVY }}>
            Notifications
          </span>
          {unreadCount > 0 && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: "rgba(201,168,76,.15)", color: GOLD }}
            >
              {unreadCount} nouvelle{unreadCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[11px] font-medium hover:underline"
              style={{ color: GOLD }}
            >
              Tout marquer lu
            </button>
          )}
          {/* Croix visible uniquement sur mobile */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/5"
          >
            <span className="text-[16px] leading-none" style={{ color: "rgba(12,35,64,.4)" }}>✕</span>
          </button>
        </div>
      </div>

      {/* Liste */}
      <div className="overflow-y-auto flex-1">
        {notifs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Inbox size={30} color="rgba(12,35,64,.15)" />
            <p className="text-[12px]" style={{ color: "rgba(12,35,64,.35)" }}>
              Aucune notification
            </p>
          </div>
        ) : (
          notifs.map((notif) => (
            <div
              key={notif.id}
              className="flex items-start gap-3 px-4 py-3.5 border-b transition-colors hover:bg-gray-50"
              style={{
                borderColor: "rgba(12,35,64,.05)",
                background: notif.lue ? "white" : "rgba(201,168,76,.04)",
              }}
            >
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold"
                style={{
                  background: notif.lue ? "rgba(12,35,64,.07)" : "rgba(201,168,76,.15)",
                  color: notif.lue ? "rgba(12,35,64,.4)" : GOLD,
                }}
              >
                {notif.nom.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>

              {/* Texte */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold" style={{ color: NAVY }}>
                  {notif.nom}
                </p>
                <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">
                  {notif.message}
                </p>
                <p className="text-[11px] mt-1" style={{ color: "rgba(12,35,64,.35)" }}>
                  {notif.heure}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-1 shrink-0">
                {!notif.lue && (
                  <button
                    onClick={() => markRead(notif.id)}
                    title="Marquer comme lu"
                    className="p-1.5 rounded-lg hover:bg-black/5 transition-colors"
                  >
                    <Eye size={14} color={GOLD} />
                  </button>
                )}
                <button
                  onClick={() => deleteNotif(notif.id)}
                  title="Supprimer"
                  className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} color="#ef4444" />
                </button>
              </div>

              {/* Point non lu */}
              {!notif.lue && (
                <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: GOLD }} />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifs.length > 0 && (
        <div
          className="px-4 py-3 border-t text-center shrink-0"
          style={{ borderColor: "rgba(12,35,64,.07)" }}
        >
          <button
            onClick={() => setNotifs([])}
            className="text-[11.5px] font-medium hover:underline"
            style={{ color: "rgba(12,35,64,.4)" }}
          >
            Effacer toutes les notifications
          </button>
        </div>
      )}
    </>
  );

  return (
    <>
      <header
        className="sticky top-0 z-20 flex items-center justify-between h-14 px-4 border-b"
        style={{
          background: "rgba(240,237,230,.95)",
          borderColor: "rgba(12,35,64,.08)",
          backdropFilter: "blur(8px)",
          // Empêche le header lui-même de déborder
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {/* Gauche — tronqué si trop long */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            onClick={onMenuClick}
            className="md:hidden p-1.5 rounded-lg hover:bg-black/5 transition-colors shrink-0"
          >
            <Menu size={20} color={NAVY} />
          </button>
          <div className="min-w-0">
            <p className="font-bold text-[14px] md:text-[15px] leading-tight truncate" style={{ color: NAVY }}>
              {title}
            </p>
            <p className="text-[10px] md:text-[11px] truncate" style={{ color: "rgba(12,35,64,.4)" }}>
              Accueil → {title}
            </p>
          </div>
        </div>

        {/* Droite — shrink-0 pour ne jamais être écrasé */}
        <div className="flex items-center gap-2 shrink-0 ml-3">

          {/* Cloche */}
          <div className="relative" ref={dropdownRef}>
            {/* <button
              onClick={() => setOpen((v) => !v)}
              className="relative w-8 h-8 rounded-lg flex items-center justify-center border transition-colors hover:bg-black/5"
              style={{ border: "1px solid rgba(12,35,64,.1)", background: "white" }}
            >
              <Bell size={15} color="rgba(12,35,64,.6)" />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={{ background: GOLD, color: NAVY }}
                >
                  {unreadCount}
                </span>
              )}
            </button> */}

            {/* Dropdown desktop md+ — ancré à droite, ne déborde pas */}
            {open && (
              <div
                className="hidden md:flex flex-col absolute right-0 mt-2 rounded-xl shadow-xl border overflow-hidden"
                style={{
                  background: "white",
                  borderColor: "rgba(12,35,64,.08)",
                  zIndex: 50,
                  width: "320px",
                  maxHeight: "420px",
                }}
              >
                <PanelContent />
              </div>
            )}
          </div>


          {/* Date — masquée sur très petit écran */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 h-8 rounded-lg text-[12px] font-medium"
            style={{ background: NAVY, color: GOLD }}
          >
            <CalendarDays size={14} />
            {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
          </div>
        </div>
      </header>

      {/* Panel mobile — slide depuis le bas, visible uniquement < md */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex flex-col rounded-t-2xl overflow-hidden"
            style={{
              background: "white",
              maxHeight: "75dvh",
              boxShadow: "0 -4px 24px rgba(12,35,64,.12)",
            }}
          >
            {/* Poignée */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full" style={{ background: "rgba(12,35,64,.12)" }} />
            </div>
            <PanelContent />
          </div>
        </>
      )}
    </>
  );
};

export default AdminHeader;