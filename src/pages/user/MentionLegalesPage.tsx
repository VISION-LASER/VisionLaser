import React from "react";
import { Helmet } from "react-helmet-async";

import Footer from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";

const MentionLegalesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Mentions légales · Vision Laser Hauts-de-France</title>
        <meta
          name="description"
          content="Mentions légales du centre Vision Laser Hauts-de-France - Chirurgie réfractive au laser."
        />
      </Helmet>

      {/* ── Navigation ──────────────────────────────── */}
      <Header />

      <main className="bg-gray-50 min-h-screen py-12">
        <div className="container-page max-w-4xl mx-auto px-5">
          {/* En-tête */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-3">
              Mentions <span className="text-gold">légales</span>
            </h1>
            <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
            <p className="text-gray-500 text-sm mt-4">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          {/* Contenu */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-8 text-gray-700 text-sm leading-relaxed">
            
            {/* Section 1 - Éditeur */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                1. Éditeur du site
              </h2>
              <p className="mb-1"><strong>Centre Vision Laser Hauts-de-France</strong></p>
              <p>Société par actions simplifiée à associé unique (SASU)  </p>
              <p>Capital social : 10 000 €  </p>
              <p>RCS : Valenciennes  </p>
              <p>N° SIREN : 930 010 871  </p>
              <p>N° SIRET : 930 010 871 00018 (siège)  </p>
              <p>N° TVA intracommunautaire : FR91 930010871  </p>
              <p>Code NAF / APE : 4774Z (commerce de détail d'articles médicaux et orthopédiques en magasin spécialisé)  </p>
              <p className="mt-2">
                <strong>Siège social :</strong><br />
                162 Route de Mons, Polyclinique du Parc<br />
                59600 Maubeuge, France  
              </p>
              <p className="mt-2 text-xs text-gray-500">
                (Ancienne adresse : Centre Hospitalier de Maubeuge, Rue Simone Veil, 59600 Maubeuge - Transfert effectif au 01/03/2026)  
              </p>
              <p className="mt-2">
                <strong>Téléphone :</strong> <a href="tel:+33759507184" className="text-gold hover:underline">+33 7 59 50 71 84</a><br />
                <strong>Email :</strong> <a href="mailto:contact@vision-laser.eu" className="text-gold hover:underline">contact@vision-laser.eu</a>
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Section 2 - Hébergeur */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                2. Hébergeur
              </h2>
              <p><strong>Hébergeur du site :</strong></p>
              <p>
                OvH <br />
                2 rue Kellermann59100 Roubaix<br />
                Téléphone : +33 9 72 10 10 07<br />
                Site web : <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">https://www.ovh.com</a>
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Section 3 - Propriété intellectuelle */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                3. Propriété intellectuelle
              </h2>
              <p>
                L'ensemble du contenu du site <strong>visionlaser.eu</strong> (textes, images, vidéos, logos, icônes, 
                mise en page, base de données, etc.) est la propriété exclusive de <strong>Centre Vision Laser Hauts-de-France</strong>, 
                sauf mention contraire explicite.
              </p>
              <p className="mt-2">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des 
                éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation 
                écrite préalable de la société.
              </p>
              <p className="mt-2">
                <strong>Marques :</strong> Les marques "Vision Laser", le logo associé, ainsi que toutes les 
                marques citées sur le site sont des marques déposées. Toute reproduction non autorisée constitue 
                une contrefaçon.
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Section 4 - Données personnelles */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                4. Protection des données personnelles
              </h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 
                "Informatique et Libertés" du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, 
                de rectification, de suppression et d'opposition aux données vous concernant.
              </p>
              <p className="mt-2">
                <strong>Responsable du traitement :</strong> Centre Vision Laser Hauts-de-France<br />
                <strong>Finalités :</strong> Gestion des demandes de rendez-vous, informations médicales, 
                statistiques internes.
              </p>
              <p className="mt-2">
                <strong>Durée de conservation :</strong> Les données sont conservées pendant une durée de 
                3 ans à compter du dernier contact, sauf obligation légale contraire.
              </p>
              <p className="mt-2">
                Pour exercer vos droits, contactez-nous à :<br />
                <a href="mailto:contact@vision-laser.eu" className="text-gold hover:underline">contact@vision-laser.eu</a>
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Vous avez également le droit d'introduire une réclamation auprès de la CNIL : 
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline ml-1">www.cnil.fr</a>
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Section 5 - Cookies */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                5. Cookies
              </h2>
              <p>
                Le site <strong>visionlaser.eu</strong> utilise des cookies pour améliorer l'expérience utilisateur, 
                réaliser des statistiques de fréquentation et personnaliser le contenu.
              </p>
              <p className="mt-2">
                Vous pouvez à tout moment gérer vos préférences de cookies via le bandeau présent lors de 
                votre première visite ou via les paramètres de votre navigateur.
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Section 6 - Informations médicales */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                6. Informations médicales
              </h2>
              <p>
                Les informations médicales diffusées sur ce site sont à caractère informatif et ne sauraient 
                se substituer à une consultation médicale personnalisée. Seul un examen ophtalmologique 
                approfondi permet de déterminer l'éligibilité d'un patient à une intervention.
              </p>
              <p className="mt-2">
                <strong>Recommandation :</strong> Consultez toujours un professionnel de santé avant toute décision 
                concernant votre santé visuelle.
              </p>
              <p className="mt-2">
                <strong>Ordre des médecins :</strong> Le Dr. Anthony Sion est inscrit au tableau de l'Ordre 
                des médecins sous le numéro 10101269354.<br />
                <a href="https://www.conseil-national.medecin.fr" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  www.conseil-national.medecin.fr
                </a>
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Section 7 - Responsabilité */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                7. Limitation de responsabilité
              </h2>
              <p>
                <strong>Centre Vision Laser Hauts-de-France</strong> met tout en œuvre pour assurer l'exactitude des 
                informations diffusées sur ce site, mais ne saurait garantir l'exhaustivité ou l'absence 
                d'erreurs.
              </p>
              <p className="mt-2">
                Le site peut contenir des liens vers des sites tiers. La responsabilité de <strong>Centre Vision 
                Laser Hauts-de-France</strong> ne saurait être engagée quant au contenu de ces sites.
              </p>
              <p className="mt-2">
                <strong>Responsabilité technique :</strong> L'utilisateur est informé des risques liés à 
                l'utilisation d'Internet (virus, intrusions, etc.). Le site est hébergé dans des conditions 
                de sécurité conformes aux standards du secteur.
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Section 8 - Droit applicable */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                8. Droit applicable
              </h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. En cas de litige, et à défaut 
                de résolution amiable, les tribunaux français seront seuls compétents.
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Section 9 - Contact */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                9. Nous contacter
              </h2>
              <p>
                Pour toute question relative aux présentes mentions légales ou au traitement de vos données, 
                vous pouvez nous contacter :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                <li>Par email : <a href="mailto:contact@vision-laser.eu" className="text-gold hover:underline">contact@vision-laser.eu</a></li>
                <li>Par téléphone : <a href="tel:+33759507184" className="text-gold hover:underline">+33 7 59 50 71 84</a></li>
                <li>Par courrier : 162 Route de Mons, Polyclinique du Parc, 59600 Maubeuge  </li>
              </ul>
            </section>

          </div>

          {/* Bouton retour */}
          <div className="mt-10 text-center">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-full hover:bg-opacity-90 transition-colors text-sm font-medium"
            >
              ← Retour à l'accueil
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default MentionLegalesPage;