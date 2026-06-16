import React from "react";
import { Helmet } from "react-helmet-async";

// Layout
import Footer from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";

const CGVPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Conditions Générales de Vente · Vision Laser Hauts-de-France</title>
        <meta
          name="description"
          content="Conditions Générales de Vente du centre Vision Laser Hauts-de-France pour la vente de prestations et de matériel d'optique."
        />
      </Helmet>

      {/* ── Navigation ──────────────────────────────── */}
      <Header />

      <main className="bg-gray-50 min-h-screen py-12">
        <div className="container-page max-w-4xl mx-auto px-5">
          {/* En-tête */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-3">
              Conditions Générales <span className="text-gold">de Vente</span>
            </h1>
            <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
            <p className="text-gray-500 text-sm mt-4">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          {/* Contenu */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-8 text-gray-700 text-sm leading-relaxed">

            {/* Préambule et Identité */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Préambule
              </h2>
              <p>
                Les présentes Conditions Générales de Vente (ci-après « CGV ») s'appliquent à l'ensemble des ventes de prestations de services (consultations, bilans, interventions chirurgicales) et de produits (matériel médical, optique) proposés par la société <strong>Centre Vision Laser Hauts-de-France</strong> à ses clients particuliers, que ce soit sur son site internet <strong>visionlaser.eu</strong> ou en son établissement.
              </p>
              <p className="mt-2">
                Toute commande ou réservation de prestation implique l'acceptation pleine et entière des présentes CGV par le client.
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold text-navy">Éditeur et vendeur :</p>
                <p><strong>Centre Vision Laser Hauts-de-France</strong></p>
                <p>SASU au capital de 10 000 €</p>
                <p>RCS Valenciennes - SIREN : 930 010 871</p>
                <p>Siège social : 162 Route de Mons, Polyclinique du Parc, 59600 Maubeuge [citation:1]</p>
                <p>TVA intracommunautaire : FR91 930010871</p>
                <p className="mt-1">Contact : contact@vision-laser.eu</p>
              </div>
            </section>

            <div className="border-t border-gray-100" />

            {/* Article 1 - Objet et champ d'application */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Article 1 - Objet et champ d'application
              </h2>
              <p>
                Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le cadre de la vente en ligne et en magasin des prestations et produits proposés par <strong>Centre Vision Laser Hauts-de-France</strong>.
              </p>
              <p className="mt-2">
                Elles sont applicables à toute personne physique majeure, non commerçante, agissant pour ses besoins personnels (ci-après « le Client ») [citation:4][citation:7].
              </p>
              <p className="mt-2">
                Le Client déclare avoir pris connaissance des présentes CGV et les avoir acceptées sans réserve, notamment en cochant la case prévue à cet effet lors de la validation d'une commande en ligne [citation:4][citation:10]. Les CGV applicables sont celles en vigueur au jour de la commande [citation:4][citation:7].
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Article 2 - Prestations et Produits */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Article 2 - Prestations et Produits
              </h2>
              <p>
                <strong>2.1. Prestations médicales</strong><br />
                Le site présente les prestations de chirurgie réfractive (FemtoLASIK, TPRK) et les bilans visuels. Ces informations sont à caractère informatif. Seul un examen médical personnalisé permet de déterminer l'éligibilité d'un patient. La relation contractuelle pour les actes médicaux est régie par les dispositions du Code de la santé publique et les devis personnalisés.
              </p>
              <p className="mt-2">
                <strong>2.2. Produits d'optique et médicaux</strong><br />
                Les produits commercialisés (matériel optique, lentilles, etc.) sont décrits avec la plus grande exactitude. Les photographies et illustrations ont une valeur indicative et ne sont pas contractuelles [citation:9]. L'offre est valable dans la limite des stocks disponibles [citation:9][citation:10].
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Article 3 - Tarifs */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Article 3 - Tarifs
              </h2>
              <p>
                Les prix sont indiqués en euros, toutes taxes comprises (TTC), incluant la TVA au taux en vigueur [citation:9][citation:10]. Ils ne comprennent pas les frais de livraison, qui sont indiqués séparément avant la validation de la commande.
              </p>
              <p className="mt-2">
                <strong>Centre Vision Laser Hauts-de-France</strong> se réserve le droit de modifier ses tarifs à tout moment. Les produits sont facturés sur la base du tarif en vigueur au moment de la validation de la commande [citation:4].
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Article 4 - Commande */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Article 4 - Commande / Prise de rendez-vous
              </h2>
              <p>
                <strong>Pour les prestations :</strong> La prise de rendez-vous se fait en ligne ou par téléphone. La réservation est confirmée par un email récapitulatif. Un devis personnalisé peut être établi avant toute intervention.
              </p>
              <p className="mt-2">
                <strong>Pour les produits :</strong> Le processus de commande en ligne comprend la sélection du produit, la validation du panier, le choix de la livraison, l'acceptation des CGV et le paiement. La commande est définitive après la confirmation de paiement [citation:7][citation:9].
              </p>
              <p className="mt-2">
                <strong>Centre Vision Laser Hauts-de-France</strong> se réserve le droit de refuser ou d'annuler toute commande en cas de litige, d'incident de paiement ou de fraude présumée [citation:4][citation:9].
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Article 5 - Paiement */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Article 5 - Paiement
              </h2>
              <p>
                Le paiement est exigible immédiatement lors de la validation de la commande ou de la prestation. Les moyens de paiement acceptés sont : [Listez vos moyens : CB, virement, etc.].
              </p>
              <p className="mt-2">
                Les transactions en ligne sont sécurisées via un prestataire de paiement agréé. Le Client garantit qu'il est autorisé à utiliser le moyen de paiement choisi [citation:4].
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Article 6 - Livraison */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Article 6 - Livraison
              </h2>
              <p>
                Les produits sont livrés à l'adresse indiquée par le Client lors de la commande, dans les délais annoncés. Les frais de livraison sont à la charge du Client, sauf mention contraire.
              </p>
              <p className="mt-2">
                En cas de retard de livraison, le Client en sera informé. Si le retard excède 7 jours ouvrés, le Client peut demander l'annulation de la commande et le remboursement des sommes versées.
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Article 7 - Droit de rétractation */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Article 7 - Droit de rétractation
              </h2>
              <p>
                Conformément à l'article L. 221-18 du Code de la consommation, le Client dispose d'un délai de <strong>quatorze (14) jours</strong> à compter de la réception du produit pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités [citation:4][citation:9].
              </p>
              <p className="mt-2">
                Le produit doit être retourné dans son emballage d'origine, en parfait état, accompagné de la facture. Les frais de retour sont à la charge du Client [citation:9].
              </p>
              <p className="mt-2">
                <span className="text-red-600 font-medium">Exception :</span> Conformément à la loi, ce droit ne s'applique pas aux produits personnalisés ou périssables. Il ne s'applique pas non plus aux prestations de service médical, dont la réservation est régie par des conditions spécifiques (annulation possible jusqu'à 24h avant le rendez-vous).
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Article 8 - Garantie légale */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Article 8 - Garantie légale de conformité et des vices cachés
              </h2>
              <p>
                Conformément aux articles L. 217-4 et suivants du Code de la consommation, le Client bénéficie d'une garantie légale de conformité pour tous les produits achetés.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                <li><strong>Durée :</strong> 2 ans à compter de la délivrance du produit [citation:4].</li>
                <li><strong>Option :</strong> Le Client peut choisir entre la réparation ou le remplacement du produit, sous réserve des conditions de coût prévues par la loi.</li>
              </ul>
              <p className="mt-2">
                Le Client bénéficie également de la garantie légale contre les vices cachés (art. 1641 du Code civil).
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Article 9 - Responsabilité */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Article 9 - Responsabilité
              </h2>
              <p>
                <strong>Centre Vision Laser Hauts-de-France</strong> met tout en œuvre pour assurer la conformité des informations et des produits, mais ne saurait être tenu responsable des dommages indirects (perte de données, perte de bénéfice, etc.) liés à l'utilisation du site ou des produits.
              </p>
              <p className="mt-2">
                La responsabilité médicale est celle du professionnel de santé exerçant au sein de la structure, conformément aux règles déontologiques et légales.
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Article 10 - Données personnelles */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Article 10 - Protection des données personnelles
              </h2>
              <p>
                Les données personnelles collectées dans le cadre des commandes ou des rendez-vous font l'objet d'un traitement informatisé. Pour en savoir plus sur la manière dont nous traitons vos données, nous vous invitons à consulter notre <a href="/politique-confidentialite" className="text-gold hover:underline">Politique de confidentialité</a>.
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Article 11 - Propriété intellectuelle */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Article 11 - Propriété intellectuelle
              </h2>
              <p>
                Tous les éléments du site <strong>visionlaser.eu</strong> (textes, logos, images, vidéos) sont la propriété exclusive de <strong>Centre Vision Laser Hauts-de-France</strong>. Toute reproduction est interdite sans autorisation préalable.
              </p>
            </section>

            <div className="border-t border-gray-100" />

            {/* Article 12 - Loi applicable */}
            <section>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Article 12 - Loi applicable et juridiction compétente
              </h2>
              <p>
                Les présentes CGV sont soumises au droit français [citation:9]. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux français seront compétents [citation:4].
              </p>
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

export default CGVPage;