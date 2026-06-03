// useAnalytics.ts
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookieConsent } from './UseCookieConsent';
import { trackVisit } from '../services/analyticsService';

export function useAnalytics() {
  const { consent } = useCookieConsent();
  const location = useLocation();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    // ✅ Correction : on track SEULEMENT si l'utilisateur a ACCEPTÉ les cookies
    if (consent !== 'accepted') return;
    if (lastTracked.current === location.pathname) return;

    lastTracked.current = location.pathname;
    
    // Petit délai pour éviter les conflits au chargement initial
    const timeoutId = setTimeout(() => {
      trackVisit(location.pathname);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname, consent]);
}