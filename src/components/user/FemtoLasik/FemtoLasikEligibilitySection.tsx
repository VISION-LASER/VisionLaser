import React from "react";
import { Quiz } from "../../layout/Quiz";

const FemtoLasikEligibilitySection: React.FC = () => {
  return (
    <section className="bg-[color:var(--cream)] section">
      <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
        {/* Copy */}
        <div>
          <p className="eyebrow">Suis-je éligible&nbsp;?</p>
          <h2 className="mt-3">Un quiz pédagogique en 3 questions.</h2>
          <p className="mt-5 text-muted-foreground">
            Ce questionnaire ne pose aucun diagnostic. Il vous aide à comprendre
            les critères généraux pris en compte avant un bilan complet.
          </p>
        </div>

        {/* Quiz widget */}
        <Quiz />
      </div>
    </section>
  );
};

export default FemtoLasikEligibilitySection;