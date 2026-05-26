import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";
import { MARQUEE_ITEMS } from "../../../data/data";
import clinic from "../../../assets/Acceuil-vision-laser.png";
import { Reveal } from "../../layout/Reveal";
import { Counter } from "../../layout/Counter";

// ---------------------------------------------------------------------------
// Sub-component: single stat
// ---------------------------------------------------------------------------
interface StatProps {
  label: React.ReactNode;
  value: string;
}

const Stat: React.FC<StatProps> = ({ label, value }) => (
  <div>
    <dt className="text-2xl font-semibold text-navy">{label}</dt>
    <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
      {value}
    </dd>
  </div>
);

// ---------------------------------------------------------------------------
// HeroSection
// ---------------------------------------------------------------------------
const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden mesh-bg">
      {/* Main grid */}
      <div className="container-page grid items-center gap-12 py-20 md:grid-cols-12 md:py-28">
        {/* Left column – copy */}
        <div className="md:col-span-7">
          <Reveal>
            <p className="eyebrow">Centre ophtalmologique · Hauts-de-France</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-4 text-balance">
              Retrouver une vision nette,
              <span className="block" style={{ color: "var(--gold)" }}>
                en toute confiance.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Notre équipe médicale accompagne chaque patient avec rigueur et
              pédagogie, pour évaluer si la chirurgie laser est adaptée à sa
              vision.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn-gold">
                Contactez-nous
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/femtolasik"
                className="text-sm font-medium text-navy underline-offset-4 hover:underline"
              >
                Découvrir nos techniques
              </Link>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={320}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
              <Stat
                label={
                  <>
                    <span>+</span>
                    <Counter to={15} />
                  </>
                }
                value="ans d'expertise"
              />
              <Stat
                label={
                  <>
                    <span>+</span>
                    <Counter to={10000} />
                  </>
                }
                value="patients suivis"
              />
              <Stat
                label={<Counter to={48} suffix=" h" />}
                value="réponse au bilan"
              />
            </dl>
          </Reveal>
        </div>

        {/* Right column – image */}
        <div className="md:col-span-5">
          <Reveal delay={120}>
            <div className="relative">
              {/* Glow backdrop */}
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[color:var(--gold-soft)]/40 blur-2xl" />

              <img
                src={clinic}
                alt="Centre Vision Laser des Hauts-de-France"
                width={1600}
                height={1100}
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-[0_30px_80px_-40px_rgba(12,35,64,0.45)]"
              />

              {/* Floating badge – bottom-left */}
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-white p-5 shadow-lg md:block float-y">
                <p className="eyebrow">Approche médicale</p>
                <p className="mt-2 max-w-[180px] text-sm leading-snug text-navy">
                  Bilan personnalisé avant toute décision de chirurgie.
                </p>
              </div>

            </div>
          </Reveal>
        </div>
      </div>

      {/* Trust marquee */}
      <div className="border-t border-border/70 bg-white/60 py-5 backdrop-blur">
        <div className="marquee">
          <div className="marquee-track text-xs uppercase tracking-[0.22em] text-muted-foreground">
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
    </section>
  );
};

export default HeroSection;