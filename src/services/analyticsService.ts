import { v4 as uuidv4 } from 'uuid';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Session unique par onglet
function getSessionId(): string {
  let id = sessionStorage.getItem('analytics_session');
  if (!id) {
    id = uuidv4();
    sessionStorage.setItem('analytics_session', id);
  }
  return id;
}

// Détection basique de l'appareil
function getDevice(): string {
  const ua = navigator.userAgent;
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  if (/mobile|android|iphone/i.test(ua)) return 'mobile';
  return 'desktop';
}

// Détection de la région (basée sur la langue ou IP - version simplifiée)
function getRegion(): string {
  // Vous pouvez utiliser une API comme ipapi.co ou simplement la langue
  const lang = navigator.language;
  if (lang.includes('fr')) return 'France';
  if (lang.includes('en')) return 'International';
  if (lang.includes('es')) return 'Espagne';
  return 'Autre';
}

export async function trackVisit(page: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/dashboard/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page,
        sessionId: getSessionId(),
        device: getDevice(),
        region: getRegion(),
        language: navigator.language?.slice(0, 5) || 'fr',
      }),
    });
    
    if (!response.ok) {
      console.warn('Analytics track failed:', response.status);
    }
  } catch (error) {
    // Silencieux pour ne pas polluer la console
    console.debug('Analytics error:', error);
  }
}

export async function fetchDashboardStats(token: string, days = 30) {
  const res = await fetch(`${BASE_URL}/dashboard/stats?days=${days}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Erreur récupération stats');
  }
  return res.json();
}