import React from "react";
import { Helmet } from "react-helmet-async";

// Layout
import Footer from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";

const PolitiqueConfidentialitePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Politique de confidentialité · Vision Laser  </title>
                <meta
                    name="description"
                    content="Politique de confidentialité et protection des données personnelles du centre Vision Laser  ."
                />
            </Helmet>

            {/* ── Navigation ──────────────────────────────── */}
            <Header />

            <main className="bg-gray-50 min-h-screen py-12">
                <div className="container-page max-w-4xl mx-auto px-5">
                    {/* En-tête */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-3">
                            Politique de <span className="text-gold">confidentialité</span>
                        </h1>
                        <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
                        <p className="text-gray-500 text-sm mt-4">
                            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                    </div>

                    {/* Contenu */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-8 text-gray-700 text-sm leading-relaxed">

                        {/* Introduction */}
                        <section>
                            <p>
                                <strong>Centre Vision Laser  </strong> (ci-après « nous ») accorde une importance particulière à la protection de vos données personnelles. Cette politique a pour objectif de vous informer de manière simple, claire et transparente sur la manière dont nous collectons, utilisons et protégeons vos informations personnelles, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés [citation:1][citation:7].
                            </p>
                        </section>

                        <div className="border-t border-gray-100" />

                        {/* Section 1 - Responsable de traitement */}
                        <section>
                            <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gold rounded-full" />
                                1. Responsable du traitement
                            </h2>
                            <p>
                                Le responsable du traitement de vos données personnelles est la société :
                            </p>
                            <p className="mt-2">
                                <strong>Centre Vision Laser  </strong><br />
                                SASU au capital de 10 000 €<br />
                                RCS : Valenciennes<br />
                                SIREN : 930 010 871<br />
                                SIRET : 930 010 871 00018<br />
                                Siège social : 162 Route de Mons, Polyclinique du Parc, 59600 Maubeuge
                            </p>
                        </section>

                        <div className="border-t border-gray-100" />

                        {/* Section 2 - Données collectées */}
                        <section>
                            <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gold rounded-full" />
                                2. Quelles données collectons-nous ?
                            </h2>
                            <p>
                                Nous sommes susceptibles de collecter les catégories de données suivantes :
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                                <li><strong>Données d'identification :</strong> nom, prénom, date de naissance, adresse postale, adresse email, numéro de téléphone [citation:1].</li>
                                <li><strong>Données de santé :</strong> motifs de consultation, informations médicales nécessaires à votre prise en charge [citation:2].</li>
                                <li><strong>Données de connexion :</strong> adresse IP, type de navigateur, pages consultées, date et heure d'accès [citation:1].</li>
                            </ul>
                            <p className="mt-2">
                                La collecte de ces données est strictement limitée à ce qui est nécessaire aux finalités décrites ci-dessous [citation:2].
                            </p>
                        </section>

                        <div className="border-t border-gray-100" />

                        {/* Section 3 - Finalités */}
                        <section>
                            <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gold rounded-full" />
                                3. Pourquoi utilisons-nous vos données ?
                            </h2>
                            <p>
                                Vos données personnelles sont traitées pour les finalités suivantes :
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                                <li><strong>Gestion de votre suivi médical :</strong> prise de rendez-vous, gestion de votre dossier patient, facturation [citation:1][citation:2].</li>
                                <li><strong>Communication :</strong> réponse à vos demandes de contact, envoi d'informations sur nos services [citation:1].</li>
                                <li><strong>Amélioration de nos services :</strong> réalisation de statistiques anonymes, analyse de la fréquentation du site [citation:1].</li>
                                <li><strong>Obligations légales :</strong> respect des exigences légales et réglementaires (conservation des dossiers médicaux, etc.) [citation:1].</li>
                            </ul>
                        </section>

                        <div className="border-t border-gray-100" />

                        {/* Section 4 - Base légale */}
                        <section>
                            <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gold rounded-full" />
                                4. Sur quelles bases légales nous appuyons-nous ?
                            </h2>
                            <p>
                                Conformément au RGPD, chaque traitement repose sur une base légale spécifique [citation:7] :
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                                <li><strong>Exécution d'un contrat :</strong> pour la gestion de votre suivi médical et de vos rendez-vous.</li>
                                <li><strong>Intérêt légitime :</strong> pour l'amélioration de nos services et la réalisation de statistiques [citation:1].</li>
                                <li><strong>Obligation légale :</strong> pour la conservation des dossiers médicaux.</li>
                                <li><strong>Votre consentement :</strong> pour l'utilisation de certains cookies ou pour des communications spécifiques [citation:7].</li>
                            </ul>
                        </section>

                        <div className="border-t border-gray-100" />

                        {/* Section 5 - Destinataires */}
                        <section>
                            <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gold rounded-full" />
                                5. Qui a accès à vos données ?
                            </h2>
                            <p>
                                Vos données personnelles sont accessibles uniquement :
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                                <li>Au personnel médical et administratif de <strong>Centre Vision Laser  </strong>, habilité à les traiter dans le cadre de ses fonctions [citation:1].</li>
                                <li>À nos éventuels sous-traitants techniques (hébergeur du site, prestataire de prise de rendez-vous, etc.) qui agissent selon nos instructions [citation:1].</li>
                            </ul>
                            <p className="mt-2">
                                Nous ne transmettons pas vos données à des tiers à des fins commerciales sans votre consentement explicite [citation:6].
                            </p>
                        </section>

                        <div className="border-t border-gray-100" />

                        {/* Section 6 - Durée de conservation */}
                        <section>
                            <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gold rounded-full" />
                                6. Combien de temps conservons-nous vos données ?
                            </h2>
                            <p>
                                Nous conservons vos données personnelles pour la durée strictement nécessaire aux finalités pour lesquelles elles ont été collectées [citation:1] :
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                                <li><strong>Dossier patient :</strong> 20 ans à compter de la dernière consultation, conformément aux obligations légales [citation:1].</li>
                                <li><strong>Données de contact :</strong> 3 ans à compter du dernier contact, sauf opposition de votre part [citation:1].</li>
                                <li><strong>Données de navigation (cookies) :</strong> 13 mois maximum après leur dépôt sur votre terminal [citation:3].</li>
                            </ul>
                        </section>

                        <div className="border-t border-gray-100" />

                        {/* Section 7 - Cookies */}
                        <section>
                            <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gold rounded-full" />
                                7. Utilisation des cookies
                            </h2>
                            <p>
                                Lors de votre navigation sur le site, des cookies peuvent être déposés sur votre terminal. Il s'agit de petits fichiers texte qui permettent de :
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                                <li>Faciliter votre navigation et mémoriser vos préférences [citation:3].</li>
                                <li>Réaliser des statistiques de fréquentation pour améliorer nos services [citation:8].</li>
                            </ul>
                            <p className="mt-2">
                                Vous pouvez à tout moment gérer vos préférences en matière de cookies via le bandeau de consentement présent sur le site ou dans les paramètres de votre navigateur. Les cookies nécessaires au fonctionnement du site sont exemptés de consentement [citation:7].
                            </p>
                            <p className="mt-2 text-xs text-gray-400">
                                <strong>Cookies tiers :</strong> Des cookies peuvent être déposés par des services intégrés (comme TikTok) conformément à leurs propres politiques [citation:4].
                            </p>
                        </section>

                        <div className="border-t border-gray-100" />

                        {/* Section 8 - Vos droits */}
                        <section>
                            <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gold rounded-full" />
                                8. Quels sont vos droits ?
                            </h2>
                            <p>
                                Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données personnelles [citation:1][citation:6] :
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                                <li><strong>Droit d'accès :</strong> obtenir la confirmation que vos données sont traitées et y accéder.</li>
                                <li><strong>Droit de rectification :</strong> faire modifier les données inexactes ou incomplètes.</li>
                                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données (dans certaines limites).</li>
                                <li><strong>Droit à la limitation :</strong> suspendre l'utilisation de vos données.</li>
                                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré.</li>
                                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données pour des motifs légitimes.</li>
                                <li><strong>Droit de retirer votre consentement :</strong> à tout moment, pour les traitements basés sur le consentement.</li>
                            </ul>
                            <p className="mt-2">
                                Pour exercer vos droits, contactez-nous à l'adresse <a href="mailto:contact@vision-laser.eu" className="text-gold hover:underline">contact@vision-laser.eu</a> ou par courrier à l'adresse de notre siège social, accompagné d'une copie de votre pièce d'identité. Nous nous engageons à répondre dans un délai d'un mois [citation:1].
                            </p>
                            <p className="mt-2 text-xs text-gray-400">
                                Vous avez également le droit d'introduire une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">www.cnil.fr</a>.
                            </p>
                        </section>

                        <div className="border-t border-gray-100" />

                        {/* Section 9 - Sécurité */}
                        <section>
                            <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gold rounded-full" />
                                9. Comment protégeons-nous vos données ?
                            </h2>
                            <p>
                                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation [citation:6].
                            </p>
                            <p className="mt-2">
                                Ces mesures incluent notamment le chiffrement des données sensibles, la gestion stricte des accès, la sécurisation de nos serveurs et la formation de notre personnel [citation:2][citation:6].
                            </p>
                        </section>

                        <div className="border-t border-gray-100" />

                        {/* Section 10 - Contact */}
                        <section>
                            <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gold rounded-full" />
                                10. Nous contacter
                            </h2>
                            <p>
                                Pour toute question concernant cette politique de confidentialité ou l'exercice de vos droits, vous pouvez nous contacter :
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                                <li>Par email : <a href="mailto:contact@vision-laser.eu" className="text-gold hover:underline">contact@vision-laser.eu</a></li>
                                <li>Par courrier : 162 Route de Mons, Polyclinique du Parc, 59600 Maubeuge</li>
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

export default PolitiqueConfidentialitePage;