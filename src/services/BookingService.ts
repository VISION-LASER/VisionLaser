import type { PatientInfo, TimeSlot } from "../types/booking";
import { DAY_SLOTS } from "../types/booking";

const API_URL = import.meta.env.VITE_API_URL ?? "";

// Cache des créneaux pris (pour éviter trop d'appels API)
let takenSlotsCache: Record<string, string[]> = {};
let lastFetchTime = 0;
const CACHE_DURATION = 60000; // 1 minute

// Récupérer les créneaux pris depuis la base de données
export async function fetchTakenSlots(date?: string): Promise<Record<string, string[]>> {
    const now = Date.now();
    
    // Utiliser le cache si encore valide
    if (now - lastFetchTime < CACHE_DURATION && Object.keys(takenSlotsCache).length > 0) {
        if (date && takenSlotsCache[date]) {
            return takenSlotsCache;
        }
    }
    
    try {
        const url = date ? `${API_URL}/rendez-vous/taken-slots?date=${date}` : `${API_URL}/rendez-vous/taken-slots`;
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success && result.data) {
            takenSlotsCache = result.data;
            lastFetchTime = now;
            return takenSlotsCache;
        }
    } catch (error) {
        console.error('Erreur récupération créneaux pris:', error);
    }
    
    return {};
}

// Obtenir les créneaux pour une date spécifique
export async function getSlotsForDate(dateIso: string): Promise<TimeSlot[]> {
    // Récupérer les créneaux pris depuis la base de données
    const takenSlots = await fetchTakenSlots(dateIso);
    const takenForDate = takenSlots[dateIso] || [];
    
    return DAY_SLOTS.map((time) => ({
        time,
        available: !takenForDate.includes(time),
    }));
}

// Vérifier si un jour est complet
export async function isDayFull(dateIso: string): Promise<boolean> {
    const slots = await getSlotsForDate(dateIso);
    return slots.every((s) => !s.available);
}

// Vérifier si un jour est indisponible (weekend)
export function isDayUnavailable(dateIso: string): boolean {
    const d = new Date(dateIso);
    const day = d.getDay();
    return day === 0 || day === 6; // Dimanche ou Samedi
}

// ── Google Sheets integration ─────────────────────────────────────────────
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
export async function saveToDatabase(payload: AppointmentPayload): Promise<void> {
    if (!API_URL) {
        console.warn("[Booking] VITE_API_URL non configuré — base de données ignorée.");
        return;
    }

    const data = {
        firstName: payload.patient.firstName,
        lastName: payload.patient.lastName,
        email: payload.patient.email,
        phone: payload.patient.phone,
        birthDate: payload.patient.birthDate,
        motif: payload.patient.motif,
        notes: payload.patient.notes,
        date: payload.date,
        time: payload.time
    };

    console.log("Envoi au backend:", data);

    const response = await fetch(`${API_URL}/rendez-vous`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Erreur lors de l'enregistrement du rendez-vous");
    }

    console.log("Rendez-vous enregistré avec succès:", result);
    
    // Invalider le cache après un nouvel enregistrement
    takenSlotsCache = {};
    lastFetchTime = 0;
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
    
    await saveToDatabase(payload);
    
    try {
        await saveToGoogleSheet(payload);
    } catch (error) {
        console.warn("Erreur lors de l'enregistrement dans Google Sheet:", error);
    }
}