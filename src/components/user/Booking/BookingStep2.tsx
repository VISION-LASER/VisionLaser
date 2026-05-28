import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock, AlertCircle } from "lucide-react";
import { getSlotsForDate, isDayFull, isDayUnavailable } from "../../../services/BookingService";

interface Step2Props {
  selectedDate: string | null;
  selectedTime: string | null;
  onSelect: (date: string, time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const MONTHS_FR = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
];
const DAYS_FR = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];

function toIso(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

const BookingStep2: React.FC<Step2Props> = ({
  selectedDate,
  selectedTime,
  onSelect,
  onNext,
  onBack,
}) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [localDate, setLocalDate] = useState<string | null>(selectedDate);
  const [localTime, setLocalTime] = useState<string | null>(selectedTime);

  // Build calendar grid (Mon-first)
  const calDays = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const last = new Date(viewYear, viewMonth + 1, 0);
    // Monday-start offset
    const startOffset = (first.getDay() + 6) % 7;
    const days: (number | null)[] = Array(startOffset).fill(null);
    for (let d = 1; d <= last.getDate(); d++) days.push(d);
    // Pad to complete last week
    while (days.length % 7 !== 0) days.push(null);
    return days;
  }, [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const slots = localDate ? getSlotsForDate(localDate) : [];
  const available = slots.filter(s => s.available);

  const handleDayClick = (day: number) => {
    const iso = toIso(viewYear, viewMonth, day);
    const isPast = new Date(iso) < new Date(toIso(today.getFullYear(), today.getMonth(), today.getDate()));
    if (isPast || isDayUnavailable(iso) || isDayFull(iso)) return;
    setLocalDate(iso);
    setLocalTime(null);
  };

  const handleConfirm = () => {
    if (!localDate || !localTime) return;
    onSelect(localDate, localTime);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Étape 2 sur 3</p>
        <h2 className="mt-2 text-2xl font-semibold text-navy">Choisir un créneau</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sélectionnez une date puis un horaire disponible.
        </p>
      </div>

      {/* Calendar */}
      <div className="rounded-2xl border border-border bg-white p-5">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={prevMonth}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[color:var(--cream)] transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-navy" />
          </button>
          <span className="text-sm font-semibold text-navy">
            {MONTHS_FR[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[color:var(--cream)] transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-navy" />
          </button>
        </div>

        {/* Day headers */}
        <div className="mb-2 grid grid-cols-7 text-center">
          {DAYS_FR.map(d => (
            <span key={d} className={`text-[11px] font-semibold uppercase tracking-wider ${d === "Sam" || d === "Dim" ? "text-navy/25" : "text-navy/40"}`}>
              {d}
            </span>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-0.5">
          {calDays.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;
            const iso = toIso(viewYear, viewMonth, day);
            const isPast = new Date(iso) < new Date(toIso(today.getFullYear(), today.getMonth(), today.getDate()));
            const isWeekend = isDayUnavailable(iso);
            const isFull = !isPast && !isWeekend && isDayFull(iso);
            const isSelected = localDate === iso;
            const isToday = iso === toIso(today.getFullYear(), today.getMonth(), today.getDate());
            const isDisabled = isPast || isWeekend;

            return (
              <button
                key={iso}
                type="button"
                onClick={() => handleDayClick(day)}
                disabled={isDisabled}
                title={isFull ? "Journée complète" : isWeekend ? "Fermé" : undefined}
                className={`
                  relative flex h-9 w-full items-center justify-center rounded-lg text-sm transition-all
                  ${isSelected ? "bg-[color:var(--navy)] font-semibold text-white shadow-sm" : ""}
                  ${!isSelected && !isDisabled && !isFull ? "text-navy hover:bg-[color:var(--cream)]" : ""}
                  ${isDisabled ? "cursor-not-allowed text-navy/20" : ""}
                  ${isFull && !isSelected ? "cursor-not-allowed text-navy/30" : ""}
                  ${isToday && !isSelected ? "font-semibold underline decoration-[color:var(--gold)] underline-offset-2" : ""}
                `}
              >
                {day}
                {isFull && (
                  <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-rose-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-3 border-t border-border pt-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-400" /> Déjà prise / complète
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full border border-navy/30" /> Disponible
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-navy" /> Sélectionné
          </span>
        </div>
      </div>

      {/* Time slots */}
      {localDate && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-[color:var(--gold)]" />
            <p className="text-sm font-medium text-navy">
              Créneaux disponibles —{" "}
              {new Date(localDate + "T12:00:00").toLocaleDateString("fr-FR", {
                weekday: "long", day: "numeric", month: "long",
              })}
            </p>
          </div>

          {available.length === 0 ? (
            <div className="flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Aucun créneau disponible ce jour. Choisissez une autre date.
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
              {slots.map(({ time, available: avail }) => (
                <button
                  key={time}
                  type="button"
                  disabled={!avail}
                  onClick={() => setLocalTime(time)}
                  className={`
                    rounded-xl border py-2 text-xs font-medium transition-all
                    ${localTime === time ? "border-navy bg-navy text-white shadow-sm" : ""}
                    ${avail && localTime !== time ? "border-border bg-white text-navy hover:border-navy" : ""}
                    ${!avail ? "cursor-not-allowed border-transparent bg-rose-50 text-rose-300 line-through" : ""}
                  `}
                >
                  {avail ? time : (
                    <span title="Déjà pris">{time}</span>
                  )}
                  {!avail && (
                    <span className="block text-[9px] font-normal leading-none">Déjà prise</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-navy hover:bg-[color:var(--cream)] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Retour
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!localDate || !localTime}
          className="btn-gold flex-1 disabled:opacity-40"
        >
          Confirmer le créneau
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default BookingStep2;