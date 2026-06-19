import React from "react";
import { Helmet } from "react-helmet-async";
import ContactFormSection from "../../components/user/Contact/ContactFormSection";
import { Header } from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ContactMap from "../../components/user/Contact/ContactMap";

const ContactPage: React.FC = () => (
  <>
    <Helmet>
      <title>Contact · Bilan visuel · Vision Laser  </title>
      <meta
        name="description"
        content="Demandez votre bilan visuel. Un membre de notre équipe vous recontacte sous 48 h ouvrées."
      />
    </Helmet>
    <Header />
    <div className="-mt-8">
      <ContactFormSection />
    </div>
    <div className="-mt-8">
      <ContactMap />
    </div>
    <div className="-mt-20">
      <Footer />
    </div>
  </>
);

export default ContactPage;
