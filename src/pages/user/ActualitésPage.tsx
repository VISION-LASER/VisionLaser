import React from "react";
import { Helmet } from "react-helmet-async";
import { PageHero } from "../../components/layout/PageHero";
import { Header } from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ActualiteSection from "../../components/user/Actualite/ActualiteSection";

const ActualitesPage: React.FC = () => (
  <>
    <Helmet>
      <title>Actualités · Vision Laser Hauts-de-France</title>
      <meta
        name="description"
        content="Découvrez les dernières actualités de Vision Laser Hauts-de-France."
      />
    </Helmet>
    <Header />
    <PageHero
      eyebrow="Actualités"
      title="Les dernières nouvelles de Vision Laser"
      intro="Restez informé des dernières actualités et événements de notre cabinet."
    />

    <ActualiteSection />
    <Footer />
  </>
);

export default ActualitesPage;