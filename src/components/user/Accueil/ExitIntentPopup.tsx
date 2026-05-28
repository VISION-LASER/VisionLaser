import React, { useEffect, useState, useRef } from "react";
import { X, ArrowRight, Gift } from "lucide-react";

interface Props { onOpenBooking?: () => void; }

const ExitIntentPopup: React.FC<Props> = ({ onOpenBooking }) => {
  const [show, setShow] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    // Déjà fermé dans cette session
    if (sessionStorage.getItem("exit_popup_closed")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !fired.current) {
        fired.current = true;
        // Délai pour éviter les faux positifs
        setTimeout(() => setShow(true), 200);
      }
    };

    // Sur mobile : déclenchement après 45s de scroll passif
    const mobileTimer = setTimeout(() => {
      if (!fired.current && window.innerWidth < 768) {
        fired.current = true;
        setShow(true);
      }
    }, 45_000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, []);

  const close = () => {
    setShow(false);
    sessionStorage.setItem("exit_popup_closed", "1");
  };

  if (!show) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={close}
      />

      {/* Modal */}
      <div
        className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[92vw] max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "white" }}
      >
        {/* Bandeau haut */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ background: "#0C2340" }}
        >
          <div className="flex items-center gap-2">
            <Gift size={16} style={{ color: "#C9A84C" }} />
            <span className="text-[12px] font-semibold" style={{ color: "#C9A84C" }}>
              Bilan visuel offert
            </span>
          </div>
          <button
            onClick={close}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={16} style={{ color: "rgba(255,255,255,.6)" }} />
          </button>
        </div>

        {/* Contenu */}
        <div className="px-6 py-7 text-center">
          <h2 className="text-[22px] font-bold leading-snug" style={{ color: "#0C2340" }}>
            Avant de partir —<br />
            <span style={{ color: "#C9A84C" }}>évaluez votre éligibilité</span>
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "rgba(12,35,64,.6)" }}>
            Un bilan personnalisé vous dira en 48h si la chirurgie laser est
            adaptée à votre vue. Sans engagement, sans frais.
          </p>

          {/* Preuves sociales mini */}
          <div className="mt-5 flex justify-center gap-6">
            {[
              { val: "+10k",   label: "patients" },
              { val: "4.9/5",  label: "satisfaction" },
              { val: "48h",    label: "réponse" },
            ].map((s) => (
              <div key={s.val} className="text-center">
                <p className="text-[18px] font-bold" style={{ color: "#0C2340" }}>{s.val}</p>
                <p className="text-[10px]" style={{ color: "rgba(12,35,64,.45)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => { close(); onOpenBooking?.(); }}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-semibold transition-all hover:scale-[1.02]"
            style={{ background: "#C9A84C", color: "#0C2340" }}
          >
            Demander mon bilan gratuit
            <ArrowRight size={16} />
          </button>

          <button
            onClick={close}
            className="mt-3 text-[12px] hover:underline"
            style={{ color: "rgba(12,35,64,.35)" }}
          >
            Non merci, je pars sans bilan
          </button>
        </div>
      </div>
    </>
  );
};

export default ExitIntentPopup;