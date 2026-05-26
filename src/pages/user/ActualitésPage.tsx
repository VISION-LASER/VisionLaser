import React from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/layout/Header";
import { PageHero } from "../../components/layout/PageHero";
import Footer from "../../components/layout/Footer";
import VideoSection from "../../components/user/Actualite/VideoSection";

const ActualitesPage: React.FC = () => (
  <>
    <Helmet>
      <title>Actualités · Vision Laser Hauts-de-France</title>
      <meta
        name="description"
        content="Retrouvez nos vidéos TikTok, YouTube et Facebook : interventions, conseils et témoignages."
      />
    </Helmet>
    <Header />
    <PageHero
      eyebrow="Actualités"
      title="Nos vidéos"
      intro="Interventions filmées, conseils du Dr. Anthony Sion et témoignages patients sur TikTok, YouTube et Facebook."
    />
    <VideoSection />
    <Footer />
  </>
);

export default ActualitesPage;