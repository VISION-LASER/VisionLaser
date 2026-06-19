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
    <section className="relative overflow-hidden min-h-[70vh] md:min-h-[65vh] lg:min-h-[60vh]">
      {/* Hauteur réduite */}

      {/* Background Slider */}
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
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container-page grid items-center gap-12 py-6 md:grid-cols-12 md:py-10">
          {/* py augmenté pour plus d'espace */}

          {/* Left Content */}
          <div className="md:col-span-7">

            <Reveal delay={100}>
              <h1 className="mt-3 text-balance text-white leading-tight text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {/* Tailles agrandies */}
                Retrouvez la liberté
                <span
                  className="block"
                  style={{ color: "var(--gold)" }}
                >
                  de voir naturellement.
                </span>
              </h1>
            </Reveal>

            {/* Stats */}
            <Reveal delay={360}>
              <dl className="mt-5 grid max-w-2xl grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">

                <Stat
                  label={
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-3xl md:text-3xl lg:text-4xl font-bold text-white">
                        +15
                      </span>
                      <div className="w-10 h-0.5 bg-gold/50 mt-2 mb-1.5" />
                    </div>
                  }
                  value={
                    <span className="text-xs md:text-sm uppercase tracking-wider text-white/75 font-medium">
                      ans d'expertise
                    </span>
                  }
                />

                <Stat
                  label={
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-3xl md:text-3xl lg:text-4xl font-bold text-white">
                        +<Counter to={10000} />
                      </span>
                      <div className="w-10 h-0.5 bg-gold/50 mt-2 mb-1.5" />
                    </div>
                  }
                  value={
                    <span className="text-xs md:text-sm uppercase tracking-wider text-white/75 font-medium">
                      patients accompagnés
                    </span>
                  }
                />

                <Stat
                  label={
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-3xl md:text-3xl lg:text-4xl font-bold text-white">
                        <Counter to={48} suffix=" h" />
                      </span>
                      <div className="w-10 h-0.5 bg-gold/50 mt-2 mb-1.5" />
                    </div>
                  }
                  value={
                    <span className="text-xs md:text-sm uppercase tracking-wider text-white/75 font-medium">
                      réponse au bilan
                    </span>
                  }
                />

              </dl>
            </Reveal>

            {/* CTA */}
            <Reveal delay={260}>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const element = document.getElementById('temoignages');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-base font-bold text-navy transition-all hover:scale-[1.02] hover:shadow-2xl"
                >
                  <Users size={18} />
                  Voir témoignages
                </button>
              </div>
            </Reveal>

          </div>

          {/* Right Card */}
          <div className="md:col-span-5">

            <Reveal delay={160}>
              <div className="relative">

                {/* Decorative blur - agrandi */}
                <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-gold/20 blur-3xl" />
                <div className="absolute -bottom-6 -left-5 w-28 h-28 rounded-full bg-gold/10 blur-3xl" />

                {/* Card - padding agrandi */}
                <div className="relative rounded-2xl border border-white/20 bg-white/95 backdrop-blur-xl p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">

                  {/* Title - agrandi */}
                  <h3 className="text-xl md:text-2xl font-bold leading-tight text-navy">
                    Consultation personnalisée
                    <span className="block text-gold">
                      d’éligibilité au laser
                    </span>
                  </h3>

                  {/* Description - agrandie */}
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                    Un bilan visuel complet réalisé par notre équipe
                    afin d’évaluer si la chirurgie laser est adaptée
                    à votre vision.
                  </p>

                  {/* Features - agrandies */}
                  <div className="mt-6 space-y-4">
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
                        icon: () => (
                          <div className="relative flex h-5 w-7 overflow-hidden rounded-sm shadow-sm">
                            <div className="h-full w-1/3 bg-[#0055A4]" />
                            <div className="h-full w-1/3 bg-white" />
                            <div className="h-full w-1/3 bg-[#EF4135]" />
                          </div>
                        ),
                        text: "Made in France",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="group flex items-start gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-navy/5 hover:pl-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/10 transition-all duration-300 group-hover:scale-105 group-hover:from-gold/30 group-hover:to-gold/20">
                          {typeof item.icon === "function" && !item.icon.toString().includes("svg") ? (
                            <item.icon size={18} className="text-gold" strokeWidth={1.8} />
                          ) : (
                            <item.icon />
                          )}
                        </div>

                        <span className="flex-1 self-center text-sm font-medium leading-relaxed text-navy/90 md:text-base">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA - agrandi */}
                  <div className="mt-5">
                    <button
                      onClick={() => setBookingOpen(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-base font-bold text-navy transition-all hover:scale-[1.02] hover:shadow-xl"
                    >
                      <Calendar size={18} />
                      Prendre rendez-vous
                    </button>
                  </div>

                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Trust Marquee - agrandi */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-md py-3">
          <div className="marquee">
            <div className="marquee-track text-xs md:text-sm uppercase tracking-[0.22em] text-white/70">
              {Array.from({ length: 2 }).map((_, copy) => (
                <div
                  key={copy}
                  className="flex shrink-0 items-center gap-10"
                >
                  {MARQUEE_ITEMS.map((item) => (
                    <span key={item} className="flex shrink-0 items-center gap-10">
                      <span>{item}</span>
                      <svg width="20" height="14" viewBox="0 0 60 40" className="shrink-0 rounded-sm shadow-sm">
                        <rect x="0" y="0" width="20" height="40" fill="#0055A4" />
                        <rect x="20" y="0" width="20" height="40" fill="#FFFFFF" />
                        <rect x="40" y="0" width="20" height="40" fill="#EF4135" />
                      </svg>
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