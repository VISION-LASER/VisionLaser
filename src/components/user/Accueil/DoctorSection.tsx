import React from "react";
import surgeon from "../../../assets/surgeon.png";
import { Reveal } from "../../layout/Reveal";

// ---------------------------------------------------------------------------
// Credential item
// ---------------------------------------------------------------------------
interface CredentialProps {
  title: string;
  subtitle: string;
}

const Credential: React.FC<CredentialProps> = ({ title, subtitle }) => (
  <div className="border-l-2 border-[color:var(--gold)] pl-4">
    <p className="font-medium text-navy">{title}</p>
    <p className="text-muted-foreground">{subtitle}</p>
  </div>
);

// ---------------------------------------------------------------------------
// DoctorSection
// ---------------------------------------------------------------------------
const DoctorSection: React.FC = () => {
  return (
    <section className="bg-[color:var(--cream)] section">
      <div className="container-page grid gap-12 md:grid-cols-2 md:items-center">
        {/* Copy */}
        <Reveal>
          <div>
            <p className="eyebrow">L'équipe médicale</p>
            <h2 className="mt-3">
              Une expertise dirigée par le Dr. Anthony Sion et son équipe.
            </h2>
            <p className="mt-5 text-muted-foreground text-justify">
              Le centre s’appuie sur une équipe médicale expérimentée et spécialisée en chirurgie réfractive, coordonnée par le Dr. Anthony Sion. Ensemble, ils assurent un accompagnement personnalisé à chaque étape du parcours patient, du bilan préopératoire jusqu’au suivi post-intervention.

              <br />L’ensemble des consultations, examens et interventions est réalisé selon des protocoles rigoureux afin de garantir sécurité, précision et excellence des soins. Tous les contenus médicaux du site sont validés par le Dr. Anthony Sion.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <Credential
                title="Diplômé en ophtalmologie"
                subtitle="Faculté de Médecine"
              />
              <Credential
                title="Chirurgie réfractive"
                subtitle="Pratique exclusive"
              />
              <Credential
                title="Expertise en chirurgie réfractive"
                subtitle="Spécialisation et expérience"
              />
              <Credential
                title="Équipe médicale spécialisée"
                subtitle="Professionnalisme et compétence"
              />
              <Credential
                title="Accompagnement personnalisé"
                subtitle="Suivi individualisé"
              />
              <Credential
                title="Technologie de pointe"
                subtitle="Innovations médicales"
              />
              <Credential
                title="Pratique dédiée à la correction visuelle"
                subtitle="Focus sur les résultats optimaux"
              />
            </div>
          </div>
        </Reveal>

        {/* Image */}
        <Reveal delay={120}>
          <img
            src={surgeon}
            alt="Équipe chirurgicale"
            width={1400}
            height={1000}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
};

export default DoctorSection;