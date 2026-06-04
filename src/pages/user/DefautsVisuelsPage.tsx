import React from "react";
import { Helmet } from "react-helmet-async";
import { PageHero } from "../../components/layout/PageHero";
import { Header } from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import DefautsVisuelsGridSection from "../../components/user/DefautsVisuels/DefautsVisuelsGridSection";
const DefautsVisuelsPage: React.FC = () => (
  <>
    <Helmet>
      <title>Défauts visuels · Vision Laser Hauts-de-France</title>
      <meta
        name="description"
        content="Myopie, hypermétropie, astigmatisme, presbytie : comprendre les défauts visuels qui peuvent être corrigés par chirurgie réfractive."
      />
    </Helmet>
    <Header />
    <PageHero
      eyebrow="Comprendre"
      title="Les défauts visuels"
      intro="La chirurgie réfractive permet de corriger plusieurs amétropies. Toutes ne sont pas opérables : seul un bilan complet permet de poser une indication."
    />

    <DefautsVisuelsGridSection />

    <div className="-mt-18">
      <Footer />
    </div>
  </>
);

export default DefautsVisuelsPage;
