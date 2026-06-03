import React from "react";
import { Cookie } from "lucide-react";
import { useCookieConsent } from "../../hooks/UseCookieConsent";
const CookieBanner: React.FC = () => { 
  const { showBanner, accept, refuse } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 backdrop-blur-sm"
    >
      <div className="container-page flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Text */}
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <div>
            <p className="text-sm font-medium text-navy">
              Ce site utilise des cookies d'analyse anonymes.
            </p>
            <p className="mt-0.5 max-w-xl text-xs text-muted-foreground">
              Aucune donnée personnelle n'est collectée. Ces statistiques
              (page visitée, type d'appareil, langue) nous aident uniquement
              à améliorer le site. Votre choix est sauvegardé.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={refuse}
            className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-navy/70 transition-colors hover:border-navy hover:text-navy"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={accept}
            className="btn-gold"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;