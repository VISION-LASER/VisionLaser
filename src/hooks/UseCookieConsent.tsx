// UseCookieConsent.ts — version stable
import { useState } from "react";
import type { CookieConsent } from "../types/types";

const COOKIE_KEY = 'cookie_consent';

export function getConsent(): CookieConsent {
  const val = localStorage.getItem(COOKIE_KEY);
  if (val === 'accepted' || val === 'refused') return val;
  return null;
}

export function setConsent(value: CookieConsent) {
  if (value === null) {
    localStorage.removeItem(COOKIE_KEY);
  } else {
    localStorage.setItem(COOKIE_KEY, value);
  }
}

export function useCookieConsent() {
  const [consent, setConsentState] = useState<CookieConsent>(() => getConsent());

  const accept = () => {
    setConsent('accepted');
    setConsentState('accepted');
  };

  const refuse = () => {
    setConsent('refused');
    setConsentState('refused');
  };

  return { consent, showBanner: consent === null, accept, refuse };
}