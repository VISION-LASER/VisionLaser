import React from "react";

import femtoVideo from "../../../assets/video.mp4";
import femtoPoster from "../../../assets/Femto.png";

const FEATURES = [
  {
    title: "Technologie 100% laser",
    description:
      "La chirurgie femto-LASIK est réalisée exclusivement au laser afin d’améliorer la précision et le confort du traitement.",
  },

  {
    title: "Volet cornéen ultra-fin",
    description:
      "Le laser Ziemer LDV Crystal Line permet de créer un volet cornéen très fin d’environ 110 micromètres.",
  },

  {
    title: "Précision micrométrique",
    description:
      "L’énergie laser est appliquée à des emplacements extrêmement précis de la cornée à l’échelle du micron.",
  },

  {
    title: "Sécurité renforcée",
    description:
      "Cette technologie permet d’éviter certaines complications rares pouvant survenir avec les microkératomes mécaniques.",
  },
];

const BENEFITS = [
  "Technologie suisse",
  "Précision élevée",
  "Traitement sans lame",
  "Confort optimisé",
  "Volet cornéen fin",
  "Récupération rapide",
];

const FemtoSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-fade-up">

      {/* Hero */}
      <div className="grid items-center gap-10 lg:grid-cols-2">

        {/* Video */}
        <div className="overflow-hidden rounded-3xl border border-border">
          <video
            className="aspect-[5/4] w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={femtoPoster}
          >
            <source src={femtoVideo} type="video/mp4" />
          </video>
        </div>

        {/* Content */}
        <div>
          <p className="eyebrow">Laser Femtoseconde</p>

          <h2 className="mt-4 text-4xl font-semibold">
            Laser FEMTOSECONDE LDC Crystal LINE de Ziemer
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Cette chirurgie réfractive, réalisée exclusivement
            au laser, est appelée femto-LASIK.
          </p>

          <p className="mt-4 text-muted-foreground">
            Le laser Ziemer LDV Crystal Line, développé en Suisse,
            utilise une technologie femtoseconde avancée permettant
            une découpe extrêmement précise du volet cornéen.
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
            Une chirurgie réfractive de haute précision
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

      {/* Detailed section */}
      <div className="rounded-3xl border border-border p-10">
        <p className="eyebrow">Précision</p>

        <h3 className="mt-3 text-3xl font-semibold">
          Une technologie pensée pour la sécurité
        </h3>

        <div className="mt-6 space-y-5 text-muted-foreground">
          <p>
            Le laser femtoseconde agit avec une précision
            micrométrique afin de créer un volet cornéen
            extrêmement régulier et homogène.
          </p>

          <p>
            Contrairement aux techniques mécaniques plus anciennes,
            cette technologie entièrement laser améliore la précision
            chirurgicale tout en renforçant la sécurité du traitement.
          </p>

          <p>
            Grâce à une énergie calibrée et appliquée à des points
            extrêmement précis de la cornée, le traitement permet
            une récupération visuelle rapide et un excellent confort
            post-opératoire.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FemtoSection;