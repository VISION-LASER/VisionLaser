import React from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import TiktokHeaderSection from "../../components/user/TikTok/TiktokHeaderSection";
import TiktokHeroSection from "../../components/user/TikTok/TiktokHeroSection";
import TiktokTrustSection from "../../components/user/TikTok/TiktokTrustSection";
import TiktokStepsSection from "../../components/user/TikTok/TiktokStepsSection";
import TiktokTechniquesSection from "../../components/user/TikTok/TiktokTechniquesSection";
import TiktokQuizSection from "../../components/user/TikTok/TiktokQuizSection";
import TiktokFormSection from "../../components/user/TikTok/TiktokFormSection";

const TiktokPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Vision Laser · Bilan visuel gratuit</title>
        <meta
          name="description"
          content="Myope, astigmate, hypermétrope ? Bilan visuel gratuit en chirurgie réfractive. Réponse sous 48 h."
        />
      </Helmet>

      <Header />
      <div className="min-h-screen bg-white">
        <TiktokHeaderSection />

        <main className="mx-auto max-w-md pb-28">
          <TiktokHeroSection />
          <TiktokTrustSection />
          <TiktokStepsSection />
          <TiktokTechniquesSection />
          <TiktokQuizSection />
          <TiktokFormSection />

          <p className="mt-8 px-5 text-center text-[11px] text-muted-foreground">
            Centre Vision Laser des Hauts-de-France · Informations validées par
            le Dr. Chemla
          </p>
        </main>

        {/* Sticky CTA */}
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-4 py-3 backdrop-blur">
          <a href="#form" className="btn-gold w-full">
            Bilan visuel gratuit
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TiktokPage;