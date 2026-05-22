import { useState } from "react";
import type { CookieConsent } from "../types/types";
import { getConsent, setConsent } from "../services/CookiesService";

export function useCookieConsent() {
  const [consent, setConsentState] = useState<CookieConsent>(() => getConsent());

  const accept = () => {
    setConsent("accepted");
    setConsentState("accepted");
  };

  const refuse = () => {
    setConsent("refused");
    setConsentState("refused");
  };

  const showBanner = consent === null;

  return { consent, showBanner, accept, refuse };
}