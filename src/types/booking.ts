export interface PatientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  motif: string;
  notes: string;
}

export interface TimeSlot {
  time: string;      // "09:00"
  available: boolean;
}

export interface BookingState {
  step: 1 | 2 | 3;
  patient: PatientInfo;
  selectedDate: string | null;   // ISO "2025-06-15"
  selectedTime: string | null;   // "09:00"
}

export type AppointmentMotif =
  | "bilan-visuel"
  | "consultation-postop"
  | "autre";

export const MOTIFS: { value: AppointmentMotif; label: string }[] = [
  { value: "bilan-visuel",       label: "Bilan visuel (pré-opératoire)" },
  { value: "consultation-postop",label: "Consultation post-opératoire" },
  { value: "autre",              label: "Autre motif" },
];

// Créneaux horaires disponibles dans la journée
export const DAY_SLOTS: string[] = [
  "08:30","09:00","09:30","10:00","10:30","11:00","11:30",
  "14:00","14:30","15:00","15:30","16:00","16:30","17:00",
];