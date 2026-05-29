import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

// Layout
import { Header } from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

// Sections
import HeroSection from "../../components/user/Accueil/HeroSection";
import SocialProofBar from "../../components/user/Accueil/SocialProofBar";
import ProcessSection from "../../components/user/Accueil/ProcessSection";
import TechniquesSection from "../../components/user/Accueil/TechniquesSection";
import DoctorSection from "../../components/user/Accueil/DoctorSection";
import TestimonialsSection from "../../components/user/Accueil/TestimonialsSection";
import TprkEligibilitySection from "../../components/user/Tprk/TprkEligibilitySection";
import DifferentesEtapes from "../../components/user/DifferentesEtapes/DifferentesEtapesSection";
import FaqSection from "../../components/user/Accueil/FaqSection";
import LeadCaptureSection from "../../components/user/Accueil/LeadCaptureSection";

import StickyCtaBar from "../../components/user/Accueil/StickyCtaBar";
import ExitIntentPopup from "../../components/user/Accueil/ExitIntentPopup";
import BookingModal from "../../components/user/Booking/BookingModal";
import StickyWhatsApp from "../../components/user/Accueil/StickyWhatsApp";
import StickyBooking from "../../components/user/Accueil/StickyBooking";

const HomePage: React.FC = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Vision Laser Hauts-de-France · Chirurgie réfractive au laser</title>
        <meta
          name="description"
          content="Centre ophtalmologique spécialisé dans la chirurgie réfractive au laser (FemtoLASIK, TPRK). Bilan visuel dans les Hauts-de-France."
        />
      </Helmet>

      {/* ── Navigation ──────────────────────────────── */}
      <Header />


      <HeroSection />
      <SocialProofBar />
      <ProcessSection />
      <TestimonialsSection />
      <TechniquesSection />
      <DoctorSection />
      <TprkEligibilitySection />
      <DifferentesEtapes />
      <FaqSection />

      {/* Section lead principale — ancre #bilan-gratuit */}
      <LeadCaptureSection />

      {/*<CtaSection />*/}
      <Footer />


      <StickyWhatsApp />
      <StickyBooking onOpen={() => setBookingOpen(true)} />
      {/* Barre CTA sticky bas de page — après 40% de scroll */}
      <StickyCtaBar onOpenBooking={() => setBookingOpen(true)} />

      {/* Pop-up intention de sortie */}
      <ExitIntentPopup onOpenBooking={() => setBookingOpen(true)} />

      {/* Modal de réservation partagée */}
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
};

export default HomePage;