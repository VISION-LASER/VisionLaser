import React from "react";
import { Helmet } from "react-helmet-async";
import { PageHero } from "../../components/layout/PageHero";
import TarifsPricingSection from "../../components/user/Tarifs/TarifsPricingSection";
import { Header } from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
const TarifsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Tarifs · Vision Laser  </title>
        <meta
          name="description"
          content="Tarifs transparents pour la chirurgie réfractive au laser. Bilan visuel, devis personnalisé après examen médical."
        />
      </Helmet>
      <Header />
      <PageHero
        eyebrow="Transparence"
        title="Tarifs"
        intro="Le bilan visuel est obligatoire et sans engagement. Le tarif des interventions est communiqué après l'examen médical, en fonction du protocole adapté à votre vision."
      />

      <TarifsPricingSection />
      <div className="-mt-15">
        <Footer />
      </div>
    </>
  );
};

export default TarifsPage;
