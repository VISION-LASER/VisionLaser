import React from "react";
import surgeon from "../../../assets/surgeon.png";
import { Reveal } from "../../layout/Reveal";
import doctolibBtn from "../../../assets/bouton-doctolib-rdv.png";

interface CredentialProps {
  title: string;
  subtitle: string;
}

const Credential: React.FC<CredentialProps> = ({ title, subtitle }) => (
  <div className="border-l-2 border-[color:var(--gold)] pl-3">
    <p className="font-medium text-navy text-xs leading-tight">{title}</p>
    <p className="text-muted-foreground text-xs leading-tight">{subtitle}</p>
  </div>
);

const DoctorSection: React.FC = () => {
  return (
    <section className="bg-[color:var(--cream)]px-5 py-3">
      <div className="container-page grid gap-8 md:grid-cols-2 md:items-center">
        {/* Copy */}
        <Reveal>
          <div>
            <p className="eyebrow">L'équipe médicale</p>
            <h2 className="mt-2 text-2xl md:text-3xl leading-snug">
              Une expertise portée par une équipe médicale spécialisée.

            </h2>
            <p className="mt-3 text-muted-foreground text-justify text-sm leading-relaxed">
              Le centre s'appuie sur une équipe médicale expérimentée et spécialisée en chirurgie réfractive. Ensemble, ses praticiens assurent un accompagnement personnalisé à chaque étape du parcours patient pour assurer une prise en charge optimale.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <Credential
                title="Diplômé en ophtalmologie"
                subtitle="Faculté de Médecine"
              />
              <Credential
                title="Chirurgie réfractive"
                subtitle="Pratique exclusive"
              />
              <Credential
                title="Expertise réfractive"
                subtitle="Spécialisation et expérience"
              />
              <Credential
                title="Équipe spécialisée"
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
            </div>
          </div>

          {/* Bouton Doctolib */}
            <div className="mt-5 flex justify-center">
              <a
                href="https://www.doctolib.fr/centre-d-ophtalmologie/maubeuge/laser-vision/booking/availabilities?specialityId=4&telehealth=false&placeId=practice-610316&motiveIds%5B%5D=17084285&source=profile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Prendre rendez-vous sur Doctolib"
                className="inline-block rounded-lg transition-transform duration-200 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <img
                  src={doctolibBtn}
                  alt="Prendre rendez-vous sur Doctolib"
                  className="block h-auto w-full max-w-[260px]"
                />
              </a>
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
            className="aspect-[4/5] w-full max-h-[70vh] rounded-3xl object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
};

export default DoctorSection;