import React from "react";
import { Link } from "react-router-dom";

import siriusImage from "../../../assets/sirius.jpg";

const FEATURES = [
  {
    title: "Caméra 3D Scheimpflug",
    description:
      "Technologie avancée permettant une analyse détaillée du segment antérieur de l’œil avec une grande précision.",
  },

  {
    title: "Topographie Placido",
    description:
      "Mesure précise de la courbure cornéenne afin d’obtenir une cartographie complète de la surface de l’œil.",
  },

  {
    title: "Cartographie jusqu’à 16 mm",
    description:
      "Visualisation étendue de la cornée avec des images haute définition couvrant une large zone d’analyse.",
  },

  {
    title: "100 coupes de pachymétrie",
    description:
      "Chaque examen biométrique intègre jusqu’à 100 sections afin d’évaluer précisément l’épaisseur cornéenne.",
  },
];

const BENEFITS = [
  "Analyse biométrique complète",
  "Images haute définition",
  "Diagnostic précis",
  "Préparation chirurgicale optimisée",
  "Mesures personnalisées",
  "Cartographie cornéenne avancée",
];

const ADVANTAGES = [
  "Analyse détaillée de la pachymétrie",
  "Étude de l’élévation cornéenne",
  "Mesure précise de la courbure",
  "Analyse de la puissance dioptrique",
  "Étude des faces antérieure et postérieure",
  "Correction statique de la cyclotorsion",
];

const SiriusSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-fade-up">

      {/* Hero */}
      <div className="grid items-center gap-10 lg:grid-cols-2">

        {/* Image */}
        <img
          src={siriusImage}
          alt="Topographe SIRIUS"
          className="aspect-[5/4] w-full rounded-3xl object-cover"
        />

        {/* Content */}
        <div>
          <p className="eyebrow">Topographie cornéenne</p>

          <h2 className="mt-4 text-4xl font-semibold">
            Topographe SIRIUS
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Une technologie de pointe permettant une analyse
            complète et détaillée du segment antérieur de l’œil.
          </p>

          <p className="mt-4 text-muted-foreground">
            Le système combine une caméra 3D Scheimpflug
            haute précision et une topographie Placido afin
            d’obtenir des données biométriques extrêmement fines.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {BENEFITS.map((benefit) => (
              <span
                key={benefit}
                className="rounded-full border border-border px-4 py-2 text-sm"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <div className="mb-8">
          <p className="eyebrow">Technologie</p>

          <h3 className="mt-3 text-3xl font-semibold">
            Une analyse complète en un seul examen
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-border p-8"
            >
              <h4 className="text-xl font-semibold">
                {feature.title}
              </h4>

              <p className="mt-4 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Precision section */}
      <div className="grid gap-10 lg:grid-cols-2">

        {/* Left */}
        <div className="rounded-3xl border border-border p-10">
          <p className="eyebrow">Précision</p>

          <h3 className="mt-3 text-3xl font-semibold">
            Des données biométriques extrêmement détaillées
          </h3>

          <div className="mt-6 space-y-5 text-muted-foreground">
            <p>
              Grâce à sa technologie avancée, le système
              SIRIUS permet une cartographie très précise
              de la cornée sur les faces antérieure et postérieure.
            </p>

            <p>
              Les mesures recueillies améliorent l’évaluation
              préopératoire et permettent une planification
              plus précise des traitements réfractifs.
            </p>

            <p>
              L’analyse peut également être adaptée selon
              les besoins spécifiques de chaque patient.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="rounded-3xl border border-border p-10">
          <p className="eyebrow">Avantages</p>

          <h3 className="mt-3 text-3xl font-semibold">
            Les principaux bénéfices
          </h3>

          <ul className="mt-8 space-y-4 text-muted-foreground">
            {ADVANTAGES.map((advantage) => (
              <li
                key={advantage}
                className="flex items-start gap-3"
              >
                <span className="mt-1 text-sm">✓</span>

                <span>{advantage}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-3xl border border-border bg-[color:var(--cream)] p-10">
        <p className="eyebrow">Diagnostic</p>

        <h3 className="mt-3 text-3xl font-semibold">
          Une précision indispensable pour vos soins visuels
        </h3>

        <p className="mt-5 max-w-3xl text-muted-foreground">
          Que ce soit pour un bilan préopératoire, un contrôle
          visuel ou une analyse approfondie, cette technologie
          permet un diagnostic fiable, complet et parfaitement
          adapté à votre profil visuel.
        </p>

        <div className="mt-8">
          <Link to="/contact" className="btn-gold">
            Prendre rendez-vous
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SiriusSection;