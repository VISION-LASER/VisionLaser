import React from "react";
import { Helmet } from "react-helmet-async";
import { PageHero } from "../../components/layout/PageHero";
import ContactFormSection from "../../components/user/Contact/ContactFormSection";
import { Header } from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
const ContactPage: React.FC = () => (
  <>
    <Helmet>
      <title>Contact · Bilan visuel gratuit · Vision Laser Hauts-de-France</title>
      <meta
        name="description"
        content="Demandez votre bilan visuel gratuit. Un membre de notre équipe vous recontacte sous 48 h ouvrées."
      />
    </Helmet>
    <Header />
    <PageHero
      eyebrow="Bilan visuel gratuit"
      title="Parlons de votre vision."
      intro="Remplissez ce formulaire : un membre de notre équipe vous recontacte sous 48 h ouvrées pour planifier votre bilan, sans engagement."
    />

    <ContactFormSection />
    <Footer />
  </>
);

export default ContactPage;