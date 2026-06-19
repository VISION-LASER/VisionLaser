import React from "react";
import { Helmet } from "react-helmet-async";
import { PageHero } from "../../components/layout/PageHero";
import TprkProcedureSection from "../../components/user/Tprk/TprkProcedureSection";
import TprkEligibilitySection from "../../components/user/Tprk/TprkEligibilitySection";
import Footer from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
const TprkPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>TPRK · Vision Laser  </title>
        <meta
          name="description"
          content="TPRK : photoablation de surface guidée, sans découpe cornéenne. Une alternative pour certaines cornées fines ou profils sportifs."
        />
      </Helmet>
      <Header />
      <PageHero
        eyebrow="Technique chirurgicale"
        title="TPRK"
        intro="Une technique de surface, sans découpe, où le laser excimer remodèle directement la cornée. Souvent indiquée pour des cornées fines ou des modes de vie spécifiques."
      />

      <TprkProcedureSection />
      <TprkEligibilitySection />
      <div className="-mt-12">
        <Footer />
      </div>
    </>
  );
};

export default TprkPage;
