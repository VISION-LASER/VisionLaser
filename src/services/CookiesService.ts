import type { AnalyticsEvent, CookieConsent } from "../types/types";

const CONSENT_KEY = "cookie_consent";
const VISITOR_KEY = "visitor_id";

// ── Consentement ────────────────────────────────────────────────────────────

export function getConsent(): CookieConsent {
  return (localStorage.getItem(CONSENT_KEY) as CookieConsent) ?? null;
}

export function setConsent(value: "accepted" | "refused"): void {
  localStorage.setItem(CONSENT_KEY, value);
}

// ── Visitor ID ──────────────────────────────────────────────────────────────

function getOrCreateVisitorId(): string {
  const existing = localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(VISITOR_KEY, id);
  return id;
}

// ── Device detection ────────────────────────────────────────────────────────

function getDevice(): string {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua))
    return "mobile";
  return "desktop";
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Unknown";
}

// ── Track ───────────────────────────────────────────────────────────────────

export function trackPageView(page: string): void {
  if (getConsent() !== "accepted") return;

  const event: AnalyticsEvent = {
    visitor_id: getOrCreateVisitorId(),
    page,
    browser: getBrowser(),
    device: getDevice(),
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    created_at: new Date().toISOString(),
  };

  // Stockage local — remplacer par un appel API si besoin
  const key = `analytics_${Date.now()}`;
  localStorage.setItem(key, JSON.stringify(event));
}