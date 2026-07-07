import React from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/layout/Header";
import { PageHero } from "../../components/layout/PageHero";
import Footer from "../../components/layout/Footer";
import VideoSection from "../../components/user/Actualite/VideoSection";

const ActualitesPage: React.FC = () => (
  <>
    <Helmet>
      <title>Actualités · Vision Laser  </title>
      <meta
        name="description"
        content="Retrouvez nos vidéos TikTok, YouTube et Facebook : interventions, conseils et témoignages."
      />
    </Helmet>
    <Header />
    <PageHero
      eyebrow="Actualités"
      title="Nos vidéos"
      intro="Découvrez des interventions filmées, des conseils d'experts et des témoignages de patients sur TikTok, YouTube et Facebook."
    />
    <VideoSection />
    <div className="-mt-15">
      <Footer />
    </div>
  </>
);

export default ActualitesPage;
