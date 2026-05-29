import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, ArrowRight } from "lucide-react";
import laser from "../../../assets/Femto.png";
import type { TechKey } from "../../../types/types";
import { Reveal } from "../../layout/Reveal";

// ---------------------------------------------------------------------------
// Technique content map
// ---------------------------------------------------------------------------
interface TechContent {
  label: string;
  title: string;
  description: string;
  link: string;
}

const TECHNIQUES: Record<TechKey, TechContent> = {
  femto: {
    label: "FemtoLASIK",
    title: "FemtoLASIK",
    description:
      "Deux lasers combinés : un volet cornéen ultra-fin, puis un remodelage précis. Récupération visuelle généralement rapide (24 à 48 h).",
    link: "/femtolasik",
  },
  tprk: {
    label: "TPRK",
    title: "TPRK",
    description:
      "Technique de surface, sans découpe. Particulièrement adaptée à certaines cornées fines. Récupération plus progressive sur quelques jours.",
    link: "/tprk",
  },
};

// ---------------------------------------------------------------------------
// TechniquesSection
// ---------------------------------------------------------------------------
const TechniquesSection: React.FC = () => {
  const [activeTech, setActiveTech] = useState<TechKey>("femto");
  const content = TECHNIQUES[activeTech];

  return (
    <section className="section">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          {/* Left – copy + toggle */}
          <Reveal as="div" className="md:col-span-5">
            <p className="eyebrow">Nos techniques</p>
            <h2 className="mt-3">
              FemtoLASIK &amp; TPRK : deux approches, une même exigence.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Le choix de la technique dépend de votre profil oculaire
              (épaisseur cornéenne, correction, mode de vie). Notre rôle est de
              vous l'expliquer avec clarté.
            </p>

            {/* Toggle */}
            <div className="mt-8 inline-flex rounded-full border border-border bg-white p-1">
              {(Object.keys(TECHNIQUES) as TechKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTech(key)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    activeTech === key
                      ? "bg-[color:var(--navy)] text-white"
                      : "text-navy/70 hover:text-navy"
                  }`}
                >
                  {TECHNIQUES[key].label}
                </button>
              ))}
            </div>

            {/* Animated content card */}
            <div key={activeTech} className="card-soft fade-in mt-6">
              <Eye className="h-5 w-5 text-[color:var(--gold)]" />
              <h3 className="mt-3 text-xl">{content.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {content.description}
              </p>
              <Link
                to={content.link}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-navy"
              >
                En savoir plus <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* Right – image */}
          <Reveal as="div" className="md:col-span-7" delay={100}>
            <div className="relative">
              <img
                src={laser}
                alt="Équipement laser AMARIS 1050 RS"
                width={1600}
                height={1100}
                loading="lazy"
                className="aspect-[5/4] w-full rounded-3xl object-cover"
              />
              
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TechniquesSection;