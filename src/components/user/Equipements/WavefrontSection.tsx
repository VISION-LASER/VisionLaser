import React from "react";
import { Link } from "react-router-dom";

import wavefrontImage from "../../../assets/wavefront.png";

const FEATURES = [
  {
    title: "Analyse ultra précise",
    description:
      "Le Schwind Ocular Wavefront Analyzer étudie l’ensemble des aberrations optiques de l’œil avec une très grande précision.",
  },

  {
    title: "Détection des aberrations complexes",
    description:
      "L’appareil identifie les aberrations de bas et de haut degré souvent invisibles lors d’un examen visuel classique.",
  },

  {
    title: "Traitement laser personnalisé",
    description:
      "La technologie permet de planifier des traitements wavefront-guided adaptés au profil visuel unique de chaque patient.",
  },

  {
    title: "Examen rapide et confortable",
    description:
      "La mesure est non invasive, rapide et particulièrement adaptée aux bilans préopératoires.",
  },
];

const BENEFITS = [
  "Analyse des aberrations optiques",
  "Traitement wavefront-guided",
  "Vision nocturne améliorée",
  "Réduction des halos",
  "Meilleur contraste visuel",
  "Diagnostic personnalisé",
];

const ADVANTAGES = [
  "Analyse des aberrations cornéennes",
  "Étude des aberrations internes de l’œil",
  "Amélioration des traitements réfractifs",
  "Réduction des éblouissements",
  "Optimisation de la qualité visuelle",
  "Confort d’examen élevé",
];

const WaveFrontSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-fade-up">

      {/* Hero */}
      <div className="grid items-center gap-10 lg:grid-cols-2">

        {/* Image */}
        <img
          src={wavefrontImage}
          alt="Aberromètre Schwind Ocular Wavefront Analyzer"
          className="aspect-[5/4] w-full rounded-3xl object-cover"
        />

        {/* Content */}
        <div>
          <p className="eyebrow">Aberrométrie</p>

          <h2 className="mt-4 text-4xl font-semibold">
            Aberromètre Schwind Ocular Wavefront Analyzer
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Une technologie avancée permettant une analyse
            extrêmement précise de la qualité optique de l’œil.
          </p>

          <p className="mt-4 text-muted-foreground">
            Cet appareil étudie les aberrations optiques
            cornéennes et internes afin d’obtenir une vision
            globale et détaillée du système visuel.
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
            Une vision sur mesure grâce à l’aberrométrie
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
          <p className="eyebrow">Analyse visuelle</p>

          <h3 className="mt-3 text-3xl font-semibold">
            Une évaluation complète de la qualité optique
          </h3>

          <div className="mt-6 space-y-5 text-muted-foreground">
            <p>
              Le Schwind Ocular Wavefront Analyzer permet
              une analyse détaillée des imperfections visuelles
              qui ne peuvent pas toujours être détectées
              lors d’un examen classique.
            </p>

            <p>
              Cette technologie améliore la compréhension
              de la qualité optique globale de l’œil afin
              d’optimiser les traitements réfractifs.
            </p>

            <p>
              Les données recueillies permettent également
              une personnalisation avancée des traitements
              laser selon les caractéristiques propres à
              chaque patient.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="rounded-3xl border border-border p-10">
          <p className="eyebrow">Avantages</p>

          <h3 className="mt-3 text-3xl font-semibold">
            Les bénéfices pour votre vision
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
        <p className="eyebrow">Diagnostic avancé</p>

        <h3 className="mt-3 text-3xl font-semibold">
          Une technologie conçue pour optimiser la qualité visuelle
        </h3>

        <p className="mt-5 max-w-3xl text-muted-foreground">
          Grâce à l’analyse avancée des aberrations optiques,
          cette technologie permet des traitements laser plus
          personnalisés, une meilleure qualité de vision et une
          réduction des phénomènes de halos et d’éblouissements.
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

export default WaveFrontSection;