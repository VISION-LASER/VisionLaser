import { FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function FloatingDevisButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Cache le bouton sur la page devis elle-même et dans l'admin
  if (location.pathname === "/devis" || location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <button
      onClick={() => navigate("/devis")}
      aria-label="Demander un devis"
      className="
        fixed bottom-6 right-6 z-50
        inline-flex items-center gap-2
        rounded-full px-5 py-3.5
        text-sm font-medium text-white
        shadow-lg
        animate-pulse-glow
        group
      "
      style={{
        background: "var(--color-navy)",
        boxShadow: "0 10px 30px -8px oklch(0.245 0.052 258 / 0.5)",
      }}
    >
      <FileText className="h-4 w-4 text-[var(--color-gold)] transition-transform group-hover:rotate-6" />
      <span className="hidden sm:inline">Demander un devis</span>
      <span className="sm:hidden">Devis</span>
    </button>
  );
}
