import type { PatientInfo, TimeSlot } from "../types/booking";
import { DAY_SLOTS } from "../types/booking";

// ── Mock: créneaux déjà pris (à remplacer par un appel API) ────────────────
const TAKEN_SLOTS: Record<string, string[]> = {
  "2025-07-01": ["09:00", "10:00", "14:30"],
  "2025-07-02": ["08:30", "09:30", "11:00", "14:00", "15:00"],
  "2025-07-03": ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00"], // journée pleine
  "2025-07-07": ["10:30", "11:00", "15:00"],
};

export function getSlotsForDate(dateIso: string): TimeSlot[] {
  const taken = TAKEN_SLOTS[dateIso] ?? [];
  return DAY_SLOTS.map((time) => ({
    time,
    available: !taken.includes(time),
  }));
}

export function isDayFull(dateIso: string): boolean {
  return getSlotsForDate(dateIso).every((s) => !s.available);
}

export function isDayUnavailable(dateIso: string): boolean {
  // Weekends indisponibles
  const d = new Date(dateIso);
  const day = d.getDay();
  return day === 0 || day === 6;
}

// ── Google Sheets integration ─────────────────────────────────────────────
// Remplacer SHEET_WEBHOOK_URL par l'URL de votre Google Apps Script webhook
const SHEET_WEBHOOK_URL = import.meta.env.VITE_SHEET_WEBHOOK_URL ?? "";

interface AppointmentPayload {
  patient: PatientInfo;
  date: string;
  time: string;
  bookedAt: string;
}

export async function saveToGoogleSheet(payload: AppointmentPayload): Promise<void> {
  if (!SHEET_WEBHOOK_URL) {
    console.warn("[Booking] VITE_SHEET_WEBHOOK_URL non configuré — Google Sheets ignoré.");
    return;
  }

  const response = await fetch(SHEET_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.text();

  console.log("[Google Sheets]", result);
}

// ── Database integration ──────────────────────────────────────────────────
// Remplacer par votre endpoint API réel
const API_URL = import.meta.env.VITE_API_URL ?? "";

export async function saveToDatabase(payload: AppointmentPayload): Promise<void> {
  if (!API_URL) {
    console.warn("[Booking] VITE_API_URL non configuré — base de données ignorée.");
    return;
  }
  await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// ── Submit both ───────────────────────────────────────────────────────────
export async function submitAppointment(
  patient: PatientInfo,
  date: string,
  time: string
): Promise<void> {
  const payload: AppointmentPayload = {
    patient,
    date,
    time,
    bookedAt: new Date().toISOString(),
  };
  await Promise.all([
    saveToGoogleSheet(payload),
    saveToDatabase(payload),
  ]);
}