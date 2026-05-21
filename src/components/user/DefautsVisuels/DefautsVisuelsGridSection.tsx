import React from "react";
import { Link } from "react-router-dom";
import { DEFECTS } from "../../../data/data";

const DefautsVisuelsGridSection: React.FC = () => (
  <section className="section">
    <div className="container-page">
      {/* Defect cards grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {DEFECTS.map(({ name, description }, i) => (
          <article key={name} className="card-soft">
            <p className="eyebrow">0{i + 1}</p>
            <h3 className="mt-3">{name}</h3>
            <p className="mt-3 text-muted-foreground">{description}</p>
          </article>
        ))}
      </div>

      {/* Disclaimer banner */}
      <div className="mt-12 rounded-2xl border border-border bg-[color:var(--cream)] p-8 md:p-10">
        <p className="eyebrow">À retenir</p>
        <p className="mt-3 max-w-2xl text-navy">
          Aucun diagnostic ne peut être posé à distance. Le bilan visuel gratuit
          est l'étape indispensable pour évaluer votre profil et déterminer si
          une correction au laser est envisageable.
        </p>
        <div className="mt-6">
          <Link to="/contact" className="btn-gold">
            Demander un bilan visuel gratuit
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default DefautsVisuelsGridSection;