import React from "react";
import { Link } from "react-router-dom";

const pricingData = [
  {
    name: "Consultation préopératoire",
    price: "100 €",
    note:
      "Non remboursé par la Sécurité Sociale. Certaines mutuelles peuvent prendre en charge une partie.",
  },
  {
    name: "TransPKR - Technique NO TOUCH",
    price: "1300 € / œil • 2200 € / deux yeux",
    note: "Technique 100% laser sans contact avec l'œil.",
  },
  {
    name: "PKR",
    price: "1200 € / œil • 2000 € / deux yeux",
    note: "Technique de surface adaptée à certains profils.",
  },
  {
    name: "Femto LASIK",
    price: "2000 € / œil • 2800 € / deux yeux",
    note:
      "Découpe du capot cornéen au laser femtoseconde puis correction laser.",
  },
  {
    name: "PresbyLASIK",
    price: "2200 € / œil • 3600 € / deux yeux",
    note: "Correction de la presbytie avec technologie PresbyMAX.",
  },
  {
    name: "Traitement TOPO LINK",
    price: "+100 € / œil",
    note: "Traitement personnalisé selon la topographie cornéenne.",
  },
  {
    name: "PTK",
    price: "800 € / œil",
    note: "Photokératectomie thérapeutique.",
  },
  {
    name: "Cross Linking",
    price: "1000 € / œil",
    note: "Renforcement de la cornée.",
  },
];

const TarifsPricingSection: React.FC = () => {
  return (
    <section className="section bg-white">
      <div className="container-page">

        {/* Pricing Table */}
        <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
          <table className="w-full">
            <thead className="bg-[color:var(--cream)]">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-navy">
                  Intervention
                </th>

                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-navy">
                  Tarif
                </th>

                <th className="hidden px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-navy lg:table-cell">
                  Informations
                </th>
              </tr>
            </thead>

            <tbody>
              {pricingData.map((item) => (
                <tr
                  key={item.name}
                  className="border-t border-border transition-colors hover:bg-muted/30"
                >
                  <td className="px-6 py-5 font-semibold text-navy">
                    {item.name}
                  </td>

                  <td className="px-6 py-5 font-medium text-[color:var(--gold)]">
                    {item.price}
                  </td>

                  <td className="hidden px-6 py-5 text-sm text-muted-foreground lg:table-cell">
                    {item.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Options */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border p-6">
            <h3 className="mb-3 text-lg font-semibold text-navy">
              Options disponibles
            </h3>

            <ul className="space-y-2 text-muted-foreground">
              <li>• Monovision</li>
              <li>• PresbyMAX hybride</li>
              <li>• Micromonovision</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border p-6">
            <h3 className="mb-3 text-lg font-semibold text-navy">
              Suivi post-opératoire
            </h3>

            <p className="text-muted-foreground">
              Les consultations de suivi sont offertes pendant les 3 mois
              suivant l’intervention.
            </p>
          </div>

          <div className="rounded-2xl border border-border p-6">
            <h3 className="mb-3 text-lg font-semibold text-navy">
              Mutuelle & devis
            </h3>

            <p className="text-muted-foreground">
              Un devis détaillé vous sera remis afin de demander une éventuelle
              prise en charge à votre mutuelle.
            </p>
          </div>
        </div>

        {/* Follow-up section */}
        <div className="mt-16 rounded-3xl bg-[color:var(--cream)] p-8 md:p-10">
          <h3 className="text-2xl font-bold text-navy">
            Déroulement du suivi après l’opération
          </h3>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-5">
              <span className="text-sm font-semibold text-[color:var(--gold)]">
                Étape 1
              </span>

              <p className="mt-2 text-muted-foreground">
                Contrôle le lendemain pour le FemtoLASIK ou PresbyLASIK.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <span className="text-sm font-semibold text-[color:var(--gold)]">
                Étape 2
              </span>

              <p className="mt-2 text-muted-foreground">
                Vérification de la cicatrisation et évolution de la vision.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <span className="text-sm font-semibold text-[color:var(--gold)]">
                Étape 3
              </span>

              <p className="mt-2 text-muted-foreground">
                Contrôle à 1 mois afin d’évaluer le résultat final.
              </p>
            </div>
          </div>
        </div>

        {/* Legal note */}
        <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            La chirurgie réfractive n’est généralement pas remboursée par la
            Sécurité Sociale. Certaines mutuelles proposent cependant une prise
            en charge partielle selon votre contrat.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5 text-center">
          <h3 className="text-2xl font-bold text-navy">
            Besoin d’un devis personnalisé ?
          </h3>

          <p className="max-w-2xl text-muted-foreground">
            Contactez notre équipe afin d’obtenir des informations adaptées à
            votre correction visuelle et à votre situation.
          </p>

          <Link to="/contact" className="btn-gold">
            Demander un devis
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TarifsPricingSection;