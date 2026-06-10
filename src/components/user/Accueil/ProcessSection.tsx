import React, { useState, useEffect, useRef, useCallback } from "react";
import { Reveal } from "../../layout/Reveal";
import { STEPS } from "../../../data/data";
import { Plus } from "lucide-react";

const STEP_DUR = 4000;

// ── Mockup Bilan ─────────────────────────────────────────────────
function MockupBilan() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-amber-50 p-4">
        <p className="text-[10px] font-medium uppercase tracking-widest text-amber-700">
          Bilan complet
        </p>
        <p className="mt-1 text-xl font-medium text-amber-900">Score 94 / 100</p>
      </div>
      {([["Cornée", "88%", 0], ["Acuité", "76%", 150], ["Pression", "63%", 300]] as const).map(
        ([lbl, w, delay]) => (
          <div key={lbl} className="flex items-center gap-2">
            <span className="w-14 text-[11px] text-muted-foreground">{lbl}</span>
            <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-700"
                style={{ width: ready ? w : "0%", transitionDelay: `${delay}ms` }}
              />
            </div>
          </div>
        )
      )}
      <div className="flex gap-2 flex-wrap pt-1">
        <span className="text-[10px] font-medium bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
          Cornée saine
        </span>
        <span className="text-[10px] font-medium border border-border px-3 py-1 rounded-full text-foreground">
          Éligible
        </span>
      </div>
    </div>
  );
}

// ── Mockup Choix ─────────────────────────────────────────────────
function MockupChoix() {
  const [hl, setHl] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => setHl((v) => !v), 900);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "FemtoLASIK", sub: "Cornée épaisse", active: hl },
          { name: "TPRK", sub: "Cornée fine", active: !hl },
        ].map(({ name, sub, active }) => (
          <div
            key={name}
            className={`rounded-xl border p-3 transition-all duration-500 ${
              active
                ? "border-amber-400 bg-amber-50"
                : "border-border bg-background"
            }`}
          >
            <p className="text-sm font-medium">{name}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-background p-3 space-y-2">
        <p className="text-[10px] text-muted-foreground">Critères décisifs</p>
        {[
          ["Épaisseur", "72%"],
          ["Courbure", "55%"],
        ].map(([lbl, w]) => (
          <div key={lbl} className="flex items-center gap-2">
            <span className="w-14 text-[11px] text-muted-foreground">{lbl}</span>
            <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
              <div className="h-full rounded-full bg-amber-400" style={{ width: w }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 bg-amber-700 text-white rounded-full px-3 py-1.5 w-fit text-[11px] font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        Décision en cours…
      </div>
    </div>
  );
}

// ── Mockup Laser ─────────────────────────────────────────────────
function MockupLaser() {
  const [v, setV] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setV((p) => Math.min(p + 7, 180)), 140);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="space-y-3">
      <div className="relative rounded-xl border border-border bg-background overflow-hidden p-4">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-[scan_1.4s_ease-in-out_infinite]" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground mb-1">Durée estimée</p>
            <p className="text-2xl font-medium text-amber-900">
              {v}
              <span className="text-xs text-muted-foreground ml-1">sec</span>
            </p>
          </div>
          <div className="h-8 w-8 rounded-full border-2 border-amber-400 animate-[pulse-r_1.2s_ease-out_infinite] opacity-60" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-amber-50 p-3 text-center">
          <p className="text-xl font-medium text-amber-900">2</p>
          <p className="text-[10px] text-amber-700">yeux traités</p>
        </div>
        <div className="rounded-xl border border-border bg-background p-3 text-center">
          <p className="text-xl font-medium">0%</p>
          <p className="text-[10px] text-muted-foreground">douleur</p>
        </div>
      </div>
      <div className="h-1 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-300"
          style={{ width: `${(v / 180) * 100}%` }}
        />
      </div>
    </div>
  );
}

// ── Mockup Récup ─────────────────────────────────────────────────
function MockupRecup() {
  const rows = [
    { day: "J+1", delay: 0 },
    { day: "J+7", delay: 500 },
    { day: "J+30", delay: 1000 },
    { day: "J+90", delay: 1500 },
  ];
  const [done, setDone] = useState<number[]>([]);
  useEffect(() => {
    const timers = rows.map(({ delay }, i) =>
      setTimeout(() => setDone((p) => [...p, i]), delay + 200)
    );
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        Suivi post-opératoire
      </p>
      {rows.map(({ day }, i) => (
        <div key={day} className="flex items-center gap-2">
          <span className="w-8 text-[11px] text-muted-foreground">{day}</span>
          <span
            className={`h-2 w-2 rounded-full flex-shrink-0 transition-colors duration-500 ${
              done.includes(i) ? "bg-amber-400" : "bg-border"
            }`}
          />
          <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
            <div
              className={`h-full rounded-full bg-amber-400 transition-all duration-500 ${
                done.includes(i) ? "w-full" : "w-0"
              }`}
            />
          </div>
          <span
            className={`text-[11px] transition-colors duration-500 ${
              done.includes(i) ? "text-amber-700" : "text-muted-foreground"
            }`}
          >
            {done.includes(i) ? "✓" : "—"}
          </span>
        </div>
      ))}
      <div
        className={`mt-2 mx-auto w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-lg transition-opacity duration-500 ${
          done.length === 4 ? "opacity-100" : "opacity-0"
        }`}
      >
        ✓
      </div>
    </div>
  );
}

const SLIDES = [MockupBilan, MockupChoix, MockupLaser, MockupRecup];

// ── Main ─────────────────────────────────────────────────────────
export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [phase, setPhase] = useState<"enter" | "active" | "exit">("active");
  const [fillKey, setFillKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const transition = useCallback((next: number) => {
    setPhase("exit");
    setTimeout(() => {
      setDisplayed(next);
      setActive(next);
      setFillKey((k) => k + 1);
      setPhase("enter");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setPhase("active"))
      );
    }, 420);
  }, []);

  const schedule = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActive((prev) => {
        const next = (prev + 1) % STEPS.length;
        transition(next);
        return prev;
      });
    }, STEP_DUR);
  }, [transition]);

  useEffect(() => {
    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active]);

  const handleClick = (idx: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    transition(idx);
  };

  const Slide = SLIDES[displayed];

  return (
    <section className="bg-[color:var(--cream)] p-5">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Le parcours patient</p>
            <h2 className="mt-3">
              Un parcours clair, du premier contact au dernier contrôle.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2 items-start">

          {/* ── Accordion ── */}
          <ol className="flex flex-col">
            {STEPS.map(({ title, description }, idx) => (
              <Reveal key={title} delay={idx * 80}>
                <li
                  onClick={() => handleClick(idx)}
                  className={[
                    "relative pl-7 pr-5 py-5 rounded-xl cursor-pointer transition-all duration-200",
                    active === idx
                      ? "bg-white shadow-md"
                      : "hover:bg-white/50",
                  ].join(" ")}
                >
                  {/* Rail gris fixe */}
                  <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-border" />

                  {/* Fill orange animé — monte de haut en bas */}
                  {active === idx && (
                    <div
                      key={fillKey}
                      className="absolute left-0 top-3 w-[3px] rounded-full bg-amber-500 origin-top"
                      style={{
                        animation: `border-grow ${STEP_DUR}ms linear forwards`,
                        bottom: "0.75rem",
                      }}
                    />
                  )}

                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2.5 text-[15px] font-semibold text-navy">
                      <span
                        className={`text-[11px] font-semibold rounded-md px-2 py-0.5 transition-colors ${
                          active === idx
                            ? "text-amber-700 bg-amber-50"
                            : "text-slate-400 bg-slate-100"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      {title}
                    </span>
                    <Plus
                      className={[
                        "h-4 w-4 transition-transform duration-200 shrink-0",
                        active === idx
                          ? "rotate-45 text-amber-500"
                          : "text-slate-400",
                      ].join(" ")}
                    />
                  </div>

                  {/* Body collapsible */}
                  <div
                    className={[
                      "overflow-hidden transition-all duration-300",
                      active === idx
                        ? "max-h-24 opacity-100 mt-3"
                        : "max-h-0 opacity-0",
                    ].join(" ")}
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          {/* ── Mockup panel ── */}
          <Reveal delay={200}>
            <div className="bg-[#efefef] rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
              <div className="bg-white rounded-2xl px-7 py-6 w-full max-w-[260px] shadow-lg overflow-hidden">
                <div
                  key={displayed}
                  className={`transition-all duration-500 ease-out ${
                    phase === "enter"
                      ? "opacity-0 translate-y-4"
                      : phase === "exit"
                      ? "opacity-0 -translate-y-4"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  <Slide />
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>

      <style>{`
        @keyframes border-grow {
          from { height: 0% }
          to   { height: calc(100% - 1.5rem) }
        }
        @keyframes scan {
          0%   { transform: translateY(0) }
          100% { transform: translateY(60px) }
        }
        @keyframes pulse-r {
          0%   { transform: scale(.8);  opacity: .8 }
          100% { transform: scale(1.4); opacity: 0  }
        }
      `}</style>
    </section>
  );
}