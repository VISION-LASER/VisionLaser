import React from "react";
import { Helmet } from "react-helmet-async";import { PageHero } from "../../components/layout/PageHero";
import FemtoLasikProcedureSection from "../../components/user/FemtoLasik/FemtoLasikProcedureSection";
import FemtoLasikEligibilitySection from "../../components/user/FemtoLasik/FemtoLasikEligibilitySection";
import { Header } from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const FemtoLasikPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>FemtoLASIK · Vision Laser Hauts-de-France</title>
        <meta
          name="description"
          content="FemtoLASIK : technique de chirurgie réfractive au laser, indolore, à récupération rapide. Évaluation médicale personnalisée."
        />
      </Helmet>
      <Header />
      <PageHero
        eyebrow="Technique chirurgicale"
        title="FemtoLASIK"
        intro="Une technique mini-invasive associant deux lasers pour corriger myopie, hypermétropie et astigmatisme, avec une récupération visuelle rapide."
      />

      <FemtoLasikProcedureSection />
      <FemtoLasikEligibilitySection />
      <Footer />
    </>
  );
};

export default FemtoLasikPage;