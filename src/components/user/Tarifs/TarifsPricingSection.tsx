import React from "react";
import { Link } from "react-router-dom";
import { PRICES } from "../../../data/data";

const TarifsPricingSection: React.FC = () => {
  return (
    <section className="section">
      <div className="container-page">
        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left">
            <thead className="bg-[color:var(--cream)]">
              <tr>
                <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-navy">
                  Prestation
                </th>
                <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-navy">
                  Tarif
                </th>
                <th className="hidden px-6 py-5 text-xs font-semibold uppercase tracking-wider text-navy md:table-cell">
                  Précisions
                </th>
              </tr>
            </thead>
            <tbody>
              {PRICES.map((row) => (
                <tr key={row.name} className="border-t border-border">
                  <td className="px-6 py-5 font-medium text-navy">{row.name}</td>
                  <td className="px-6 py-5 text-[color:var(--gold)]">{row.price}</td>
                  <td className="hidden px-6 py-5 text-sm text-muted-foreground md:table-cell">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legal note */}
        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
          La chirurgie réfractive n'est pas remboursée par la Sécurité Sociale.
          Certaines mutuelles proposent une prise en charge partielle : nous
          vous remettons un devis détaillé que vous pourrez transmettre à la
          vôtre.
        </p>

        {/* CTA */}
        <div className="mt-10">
          <Link to="/contact" className="btn-gold">
            Demander un bilan visuel gratuit
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TarifsPricingSection;