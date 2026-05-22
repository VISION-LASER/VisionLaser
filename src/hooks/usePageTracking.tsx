import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../services/CookiesService";

/**
 * À placer dans un composant enfant de <BrowserRouter>.
 * Se déclenche à chaque changement de route.
 */
export function usePageTracking(): void {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
}