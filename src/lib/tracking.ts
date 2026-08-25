declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function pushDataLayerEvent(data: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

/** Emplacements possibles du bouton "Prendre rendez-vous" (plan de tracking). */
export type RdvButtonLocation = "header" | "head" | "footer" | "menu-mobile";

export function trackBoutonRdv(action: RdvButtonLocation) {
  pushDataLayerEvent({
    event: "bouton_rdv",
    action,
  });
}

/** Convertit les valeurs internes des motifs (types/booking.ts) vers le format attendu par le plan de tracking. */
export function toTrackingMotif(motif: string): string {
  switch (motif) {
    case "bilan-visuel":
      return "bilan_visuel";
    case "consultation-postop":
      return "consultation_postoperatoire";
    case "autre":
      return "autre_motif";
    default:
      return motif;
  }
}

export function trackChoisirCreneau(motif: string) {
  pushDataLayerEvent({
    event: "choisir_creneau",
    motif: toTrackingMotif(motif),
  });
}

export function trackConfirmationRdv(motif: string, date: string, heure: string) {
  pushDataLayerEvent({
    event: "confirmation_rdv",
    motif: toTrackingMotif(motif),
    rdv_date: date,
    rdv_heure: heure,
  });
}
