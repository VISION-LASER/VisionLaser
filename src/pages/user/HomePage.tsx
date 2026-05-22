import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../../components/user/Accueil/HeroSection";
import PillarsSection from "../../components/user/Accueil/PillarsSection";
import ProcessSection from "../../components/user/Accueil/ProcessSection";
import TechniquesSection from "../../components/user/Accueil/TechniquesSection";
import DoctorSection from "../../components/user/Accueil/DoctorSection";
import TestimonialsSection from "../../components/user/Accueil/TestimonialsSection";
import FaqSection from "../../components/user/Accueil/FaqSection";
import CtaSection from "../../components/user/Accueil/CtaSection";
import DifferentesEtapes from "../../components/user/DifferentesEtapes/DifferentesEtapesSection";
import { Header } from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import TprkEligibilitySection from "../../components/user/Tprk/TprkEligibilitySection";

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>
          Vision Laser Hauts-de-France · Chirurgie réfractive au laser
        </title>
        <meta
          name="description"
          content="Centre ophtalmologique spécialisé dans la chirurgie réfractive au laser (FemtoLASIK, TPRK). Bilan visuel gratuit dans les Hauts-de-France."
        />
      </Helmet>
      <Header />
      <HeroSection />
      <PillarsSection />
      <ProcessSection />
      <TechniquesSection />
      <DoctorSection />
      <TestimonialsSection />
      <TprkEligibilitySection />
      <DifferentesEtapes/>
      <FaqSection />
      <CtaSection />
      
      <Footer />
    </>
  );
};

export default HomePage;
