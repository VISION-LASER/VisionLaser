import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Scissors, Waves, Clock, Activity, Eye, CheckCircle, AlertTriangle } from "lucide-react";
import laser from "../../../assets/Femto.png";
import { Reveal } from "../../layout/Reveal";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface TechContent {
  label: string;
  badge: string;
  title: string;
  subtitle: string;
  principe: string;
  profil: string[];
  profilColor: "blue" | "teal";
  delai: string;
  reprise: string;
  avantages: string[];
  attention: string[];
  link: string;
  featured?: boolean;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const TECHNIQUES: TechContent[] = [
  {
    label: "FemtoLASIK",
    badge: "FemtoLASIK",
    title: "Deux lasers combinés",
    subtitle: "Volet cornéen + remodelage",
    principe:
      "Découpe d'un volet cornéen ultra-fin au laser femtoseconde, puis ablation de tissu au laser excimer pour corriger la vision.",
    profil: ["Cornée standard", "Myopie forte", "Mode de vie actif"],
    profilColor: "blue",
    delai: "24 à 48 heures",
    reprise: "~2 à 5 jours",
    avantages: ["Récupération rapide", "Peu d'inconfort post-op", "Geste ultra-précis"],
    attention: ["Épaisseur cornéenne minimale requise", "Volet résiduel permanent"],
    link: "/femtolasik",
    featured: true,
  },
  {
    label: "TPRK",
    badge: "TPRK",
    title: "Technique de surface",
    subtitle: "Sans découpe cornéenne",
    principe:
      "Ablation directe en surface après retrait de l'épithélium par le laser, sans création de volet. Préserve l'intégrité biomécanique.",
    profil: ["Cornée fine", "Contre-indication Femto", "Sports de contact"],
    profilColor: "teal",
    delai: "3 à 7 jours (progressive)",
    reprise: "~7 à 10 jours",
    avantages: ["Pas de volet résiduel", "Indiquée cornée fine", "Sécurité biomécanique"],
    attention: ["Récupération plus longue", "Douleur J1–J3"],
    link: "/tprk",
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// Pill
// ---------------------------------------------------------------------------
const Pill: React.FC<{ label: string; color: "blue" | "teal" | "green" | "amber" }> = ({
  label,
  color,
}) => {
  const styles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-800",
    teal: "bg-teal-50 text-teal-800",
    green: "bg-green-50 text-green-800",
    amber: "bg-amber-50 text-amber-800",
  };
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${styles[color]} mr-1 mb-1`}
    >
      {label}
    </span>
  );
};

// ---------------------------------------------------------------------------
// TechCard
// ---------------------------------------------------------------------------
const TechCard: React.FC<{ tech: TechContent }> = ({ tech }) => {
  const badgeStyle =
    tech.profilColor === "blue"
      ? "bg-blue-50 text-blue-800"
      : "bg-teal-50 text-teal-800";

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl bg-white p-6 ${
        tech.featured
          ? "border-2 border-blue-400"
          : "border border-border"
      }`}
    >
      {/* Header */}
      <div>
        <span
          className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${badgeStyle} mb-2`}
        >
          {tech.badge}
        </span>
        <h3 className="text-lg font-medium leading-tight">{tech.title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{tech.subtitle}</p>
      </div>

      <hr className="border-border" />

      {/* Principe */}
      <div>
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Principe
        </p>
        <div className="flex items-start gap-2.5">
          {tech.featured ? (
            <Scissors className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <Waves className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          )}
          <p className="text-sm text-muted-foreground">{tech.principe}</p>
        </div>
      </div>

      <hr className="border-border" />

      {/* Profil adapté */}
      <div>
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Profil adapté
        </p>
        <div className="flex items-start gap-2.5">
          <Eye className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="flex flex-wrap">
            {tech.profil.map((p) => (
              <Pill key={p} label={p} color={tech.profilColor} />
            ))}
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* Récupération */}
      <div>
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Récupération
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Vision fonctionnelle</p>
              <p className="text-sm font-medium">{tech.delai}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Activity className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Reprise sport / travail</p>
              <p className="text-sm font-medium">{tech.reprise}</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* Avantages */}
      <div>
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Avantages
        </p>
        <div className="flex items-start gap-2.5">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
          <div className="flex flex-wrap">
            {tech.avantages.map((a) => (
              <Pill key={a} label={a} color="green" />
            ))}
          </div>
        </div>
      </div>

      {/* Points d'attention */}
      <div>
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Points d'attention
        </p>
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <div className="flex flex-wrap">
            {tech.attention.map((a) => (
              <Pill key={a} label={a} color="amber" />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link
        to={tech.link}
        className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-navy"
      >
        En savoir plus <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

// ---------------------------------------------------------------------------
// TechniquesSection
// ---------------------------------------------------------------------------
const TechniquesSection: React.FC = () => {
  return (
    <section className="section">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          {/* Left – intro copy */}
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

            {/* Image */}
            <div className="relative mt-8">
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

          {/* Right – comparison cards */}
          <Reveal as="div" className="md:col-span-7" delay={100}>
            <div className="grid gap-5 sm:grid-cols-2">
              {TECHNIQUES.map((tech) => (
                <TechCard key={tech.label} tech={tech} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TechniquesSection;