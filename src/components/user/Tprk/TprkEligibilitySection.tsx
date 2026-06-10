import React from "react";
import { Quiz } from "../../layout/Quiz";

const TprkEligibilitySection: React.FC = () => {
  return (
    <section className="bg-[color:var(--cream)]">
      <div className="container-page grid gap-10 md:grid-cols-2 md:items-center p-5">
        {/* Copy */}
        <div>
          <p className="eyebrow">Suis-je éligible&nbsp;?</p>
          <h2 className="mt-3">Quelques questions pour mieux comprendre.</h2>
        </div>

        {/* Quiz widget */}
        <Quiz />
      </div>
    </section>
  );
};

export default TprkEligibilitySection;