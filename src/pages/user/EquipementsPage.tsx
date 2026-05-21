import React from "react";
import { Helmet } from "react-helmet-async";
import { PageHero } from "../../components/layout/PageHero";
import EquipementsListSection from "../../components/user/Equipements/EquipementsListSection";
import { Header } from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const EquipementsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Équipements · Vision Laser Hauts-de-France</title>
        <meta
          name="description"
          content="Plateau technique d'ophtalmologie : lasers femtoseconde et excimer, équipements de diagnostic de dernière génération."
        />
      </Helmet>
      <Header />
      <PageHero
        eyebrow="Plateau technique"
        title="Nos équipements"
        intro="Le centre s'appuie sur des technologies de référence en chirurgie réfractive et un plateau diagnostique complet, renouvelé régulièrement."
      />

      <EquipementsListSection />
      <Footer />
    </>
  );
};

export default EquipementsPage;