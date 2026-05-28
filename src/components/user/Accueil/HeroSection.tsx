import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Star,
  Shield,
  Users,
} from "lucide-react";

import { MARQUEE_ITEMS } from "../../../data/data";
import clinic1 from "../../../assets/Acceuil-vision-laser.png";
import clinic2 from "../../../assets/Amaris.png";
import clinic3 from "../../../assets/clinic-interior.jpg";

import { Reveal } from "../../layout/Reveal";
import { Counter } from "../../layout/Counter";
import BookingModal from "../Booking/BookingModal";

const SLIDES = [
  { src: clinic1, alt: "Centre Vision Laser des Hauts-de-France" },
  { src: clinic2, alt: "Salle d'opération Centre Vision Laser" },
  { src: clinic3, alt: "Équipements Centre Vision Laser" },
];

interface StatProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

const Stat: React.FC<StatProps> = ({ label, value }) => (
  <div>
    <dt className="text-2xl font-semibold text-white">{label}</dt>

    <dd className="mt-1 text-xs uppercase tracking-wider text-white/70">
      {value}
    </dd>
  </div>
);

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    if (index === current) return;
    setCurrent(index);
  };

  const prev = () =>
    goTo((current - 1 + SLIDES.length) % SLIDES.length);

  const next = () =>
    goTo((current + 1) % SLIDES.length);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(t);
  }, []);

  const [bookingOpen, setBookingOpen] = useState(false);
  
  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* ───────────────── Background Slider ───────────────── */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {SLIDES.map((slide, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{
                opacity: index === current ? 1 : 0,
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))}

          {/* Navigation 
          <button
            onClick={prev}
            aria-label="Image précédente"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-black/30 backdrop-blur-md border border-white/20 hover:bg-black/50"
          >
            <ChevronLeft size={20} color="white" />
          </button>

          <button
            onClick={next}
            aria-label="Image suivante"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-black/30 backdrop-blur-md border border-white/20 hover:bg-black/50"
          >
            <ChevronRight size={20} color="white" />
          </button>*/}

          {/* Indicators 
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Aller à l'image ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background:
                    i === current
                      ? "#C9A84C"
                      : "rgba(255,255,255,.45)",
                }}
              />
            ))}
          </div>*/}
        </div>
      </div>

      {/* ───────────────── Main Content ───────────────── */}
      <div className="relative z-10">
        <div className="container-page grid items-center gap-16 py-24 md:grid-cols-12 md:py-32">

          {/* ───────────── Left Content ───────────── */}
          <div className="md:col-span-7">

            <Reveal>
              <p className="eyebrow text-white/70">
                Centre ophtalmologique · Hauts-de-France
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-5 text-balance text-white leading-tight">
                Retrouvez la liberté
                <span
                  className="block"
                  style={{ color: "var(--gold)" }}
                >
                  de voir naturellement.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                Notre équipe spécialisée accompagne chaque patient
                avec précision et rigueur afin d’évaluer si la chirurgie
                laser est adaptée à sa vision et à son mode de vie.
              </p>
            </Reveal>

            {/* CTA */}
            <Reveal delay={260}>
              <div className="mt-10 flex flex-wrap items-center gap-4">

                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gold px-7 py-4 text-sm font-bold text-navy transition-all hover:scale-[1.02] hover:shadow-2xl"
                >
                  <Calendar size={18} />
                  Prendre rendez-vous
                </button>

                <Link
                  to="/femtolasik"
                  className="text-sm font-medium text-white underline-offset-4 hover:underline"
                >
                  Découvrir nos techniques
                </Link>

              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={360}>
              <dl className="mt-14 grid max-w-xl grid-cols-3 gap-8">

                <Stat
                  label={
                    <>
                      +<Counter to={15} />
                    </>
                  }
                  value="ans d'expertise"
                />

                <Stat
                  label={
                    <>
                      +<Counter to={10000} />
                    </>
                  }
                  value="patients accompagnés"
                />

                <Stat
                  label={
                    <>
                      <Counter to={48} suffix=" h" />
                    </>
                  }
                  value="réponse au bilan"
                />

              </dl>
            </Reveal>
          </div>

          {/* ───────────── Right Card ───────────── */}
          <div className="md:col-span-5">

            <Reveal delay={160}>
              <div className="relative">

                {/* Decorative blur */}
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gold/20 blur-3xl" />
                <div className="absolute -bottom-8 -left-6 w-32 h-32 rounded-full bg-gold/10 blur-3xl" />

                {/* Card */}
                <div className="relative rounded-3xl border border-white/20 bg-white/95 backdrop-blur-xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">

                  {/* Title */}
                  <h3 className="text-2xl font-bold leading-tight text-navy">
                    Consultation personnalisée
                    <span className="block text-gold">
                      d’éligibilité au laser
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Un bilan visuel complet réalisé par notre équipe
                    afin d’évaluer si la chirurgie laser est adaptée
                    à votre vision.
                  </p>

                  {/* Features */}
                  <div className="mt-8 space-y-4">

                    {[
                      {
                        icon: Shield,
                        text: "Technologies laser de dernière génération",
                      },
                      {
                        icon: Clock,
                        text: "Analyse complète et personnalisée",
                      },
                      {
                        icon: Star,
                        text: "Accompagnement médical spécialisé",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-gold/10">
                          <item.icon
                            size={17}
                            className="text-gold"
                          />
                        </div>

                        <span className="text-sm text-navy">
                          {item.text}
                        </span>
                      </div>
                    ))}

                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => {
                      const element = document.getElementById('temoignages');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 py-4 text-base font-bold text-navy transition-all hover:scale-[1.02] hover:shadow-xl"
                  >
                    <Users size={18} />
                    Voir témoignages
                  </button>
                  {/* Secondary CTA 
                  <Link
                    to="/eligibilite"
                    className="mt-4 flex items-center justify-center text-sm font-medium text-navy transition-colors hover:text-gold"
                  >
                    Vérifier mon éligibilité au laser
                  </Link>*/}

                  {/* Testimonial */}
                  <div className="mt-6 border-t border-border pt-5">

                    <p className="text-sm italic leading-relaxed text-muted-foreground">
                      “Je ne porte plus de lunettes depuis mon intervention.
                      L’équipe a été exceptionnelle du début à la fin.”
                    </p>

                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-navy">
                      — Patient opéré en FemtoLASIK
                    </p>

                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ───────────────── Trust Marquee ───────────────── */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-md py-5">

          <div className="marquee">

            <div className="marquee-track text-xs uppercase tracking-[0.22em] text-white/70">

              {Array.from({ length: 2 }).map((_, copy) => (
                <div
                  key={copy}
                  className="flex shrink-0 items-center gap-12"
                >
                  {MARQUEE_ITEMS.map((item) => (
                    <span key={item} className="shrink-0">
                      · {item}
                    </span>
                  ))}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
    
  );
};

export default HeroSection;