import React from "react";
import { Link } from "react-router-dom";

import amarisImage from "../../../assets/Amaris.png";

const FEATURES = [
  {
    title: "Fréquence ultra-rapide",
    description:
      "Le Schwind AMARIS 1050 RS fonctionne avec une fréquence de 1 050 Hz permettant des temps de traitement extrêmement courts.",
  },

  {
    title: "Eyetracker 7D unique au monde",
    description:
      "Le système suit les mouvements oculaires en temps réel avec une précision très avancée afin d’optimiser la sécurité du traitement.",
  },

  {
    title: "Contrôle thermique intelligent",
    description:
      "La technologie thermique avancée aide à limiter la surchauffe cornéenne durant le traitement laser.",
  },

  {
    title: "Technologie SmartSurf ACE",
    description:
      "Traitement personnalisé et sans contact conçu pour améliorer le confort visuel et accélérer la récupération.",
  },
];

const COMPARISON = [
  {
    feature: "Fréquence du pouls",
    amaris1050: "1 050 Hz",
    amaris750: "750 Hz",
    amaris500: "500 Hz",
  },

  {
    feature: "Eyetracking",
    amaris1050: "7D",
    amaris750: "6D",
    amaris500: "5D",
  },

  {
    feature: "Durée du traitement",
    amaris1050: "± 1,3 s / dioptrie",
    amaris750: "± 1,5 s",
    amaris500: "± 2 s",
  },

  {
    feature: "Contrôle thermique",
    amaris1050: "Avancé",
    amaris750: "Standard",
    amaris500: "Basique",
  },

  {
    feature: "Cas complexes",
    amaris1050: "Oui",
    amaris750: "Oui",
    amaris500: "Limité",
  },

  {
    feature: "Confort patient",
    amaris1050: "Très élevé",
    amaris750: "Élevé",
    amaris500: "Moyen",
  },

  {
    feature: "Récupération",
    amaris1050: "Très rapide",
    amaris750: "Rapide",
    amaris500: "Moyenne",
  },
];

const BENEFITS = [
  "Traitement plus rapide",
  "Précision élevée",
  "Confort optimisé",
  "Récupération visuelle accélérée",
  "Correction personnalisée",
  "Adapté aux cas complexes",
];

const AmarisSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-fade-up">

      {/* Hero */}
      <div className="grid items-center gap-10 lg:grid-cols-2">

        {/* Image */}
        <img
          src={amarisImage}
          alt="Schwind AMARIS 1050 RS"
          className="aspect-[5/4] w-full rounded-3xl object-cover"
        />

        {/* Content */}
        <div>
          <p className="eyebrow">Laser Excimer</p>

          <h2 className="mt-4 text-4xl font-semibold">
            Schwind AMARIS 1050 RS
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Nous investissons dans des technologies de dernière
            génération afin d’offrir des traitements de chirurgie
            réfractive précis, rapides et personnalisés.
          </p>

          <p className="mt-4 text-muted-foreground">
            Le Schwind AMARIS 1050 RS est l’un des lasers excimer
            les plus avancés actuellement utilisés en chirurgie
            réfractive moderne.
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
          <p className="eyebrow">Technologies</p>

          <h3 className="mt-3 text-3xl font-semibold">
            Pourquoi l’AMARIS 1050 RS se distingue
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

      {/* Comparison table */}
      <div>
        <div className="mb-8">
          <p className="eyebrow">Comparatif</p>

          <h3 className="mt-3 text-3xl font-semibold">
            Évolution de la technologie AMARIS
          </h3>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-border">
          <table className="w-full min-w-[700px] border-collapse">
            <thead className="bg-[color:var(--cream)]">
              <tr>
                <th className="p-5 text-left font-semibold">
                  Fonctionnalité
                </th>

                <th className="p-5 text-left font-semibold">
                  1050 RS
                </th>

                <th className="p-5 text-left font-semibold">
                  750S
                </th>

                <th className="p-5 text-left font-semibold">
                  500
                </th>
              </tr>
            </thead>

            <tbody>
              {COMPARISON.map((row) => (
                <tr
                  key={row.feature}
                  className="border-t border-border"
                >
                  <td className="p-5 font-medium">
                    {row.feature}
                  </td>

                  <td className="p-5 text-muted-foreground">
                    {row.amaris1050}
                  </td>

                  <td className="p-5 text-muted-foreground">
                    {row.amaris750}
                  </td>

                  <td className="p-5 text-muted-foreground">
                    {row.amaris500}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-3xl border border-border bg-[color:var(--cream)] p-10">
        <p className="eyebrow">Consultation</p>

        <h3 className="mt-3 text-3xl font-semibold">
          Un traitement conçu pour la précision et le confort
        </h3>

        <p className="mt-5 max-w-3xl text-muted-foreground">
          Grâce à ses technologies avancées, le Schwind
          AMARIS 1050 RS permet des traitements rapides,
          personnalisés et adaptés à de nombreux profils visuels,
          y compris les cas plus complexes.
        </p>

        <div className="mt-8">
          <Link to="https://www.doctolib.fr/centre-d-ophtalmologie/maubeuge/laser-vision" className="btn-gold">
            Planifier une consultation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AmarisSection;