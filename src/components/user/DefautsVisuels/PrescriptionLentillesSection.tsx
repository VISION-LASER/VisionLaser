import React from "react";

const PrescriptionLentillesSection: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <p className="eyebrow">Prescription et prise en charge</p>
        <h2 className="mt-3 text-4xl font-semibold">
          Prescription et prise en charge des lentilles de contact
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Colonne gauche : prescription et essais */}
        <div className="space-y-4">
          <p className="text-muted-foreground">
            C'est l'ophtalmologiste qui fait les essais, adapte et prescrit les lentilles après
            les avoir fait essayer au patient.
          </p>

          {/* Deux situations */}
          <div className="rounded-2xl bg-muted/30 p-5">
            <h3 className="text-lg font-semibold mb-3">Deux situations possibles</h3>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground">Situation 1 : Lentilles déjà connues</p>
                <p className="text-muted-foreground text-sm">
                  La personne a déjà des lentilles dont elle connaît les références exactes et détaillées.
                  Une seule consultation suffit pour contrôler, adapter et éventuellement améliorer les lentilles
                  déjà portées.
                </p>
              </div>

              <div>
                <p className="font-medium text-foreground">Situation 2 : Premiers essais ou références inconnues</p>
                <p className="text-muted-foreground text-sm">
                  Il faut reprendre les essais à zéro :
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                  <li><span className="font-medium text-foreground">1er essai court</span> : environ 1h</li>
                  <li><span className="font-medium text-foreground">2ème essai long</span> : 4h pour vérifier la bonne tolérance</li>
                </ul>
                <p className="text-muted-foreground text-sm mt-2">
                  Les lentilles sont fournies par le Centre. Si les tests sont satisfaisants,
                  l'ophtalmologiste prescrit les lentilles définitives.
                </p>
              </div>
            </div>
          </div>

          {/* Commande et adaptation */}
          <div className="rounded-2xl bg-muted/30 p-5">
            <h3 className="text-lg font-semibold mb-2">Commande et adaptation</h3>
            <p className="text-muted-foreground">
              Le patient va commander ses lentilles chez son opticien, qui lui précisera les durées de port,
              l'entretien et la manipulation.
            </p>
            <div className="mt-3 p-3 bg-blue-50/10 rounded-xl border border-blue-200/20">
              <p className="text-sm font-medium text-blue-400">Règle de port progressive</p>
              <p className="text-sm text-muted-foreground mt-1">
                Le 1er jour : porter les lentilles 4 heures<br />
                Augmenter ensuite d'une heure par jour pour habituer l'œil<br />
                <span className="font-semibold">Sans jamais dépasser 10/12 heures par jour de port continu.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Colonne droite : remboursement et informations complémentaires */}
        <div className="space-y-6">
          {/* Remboursement Sécurité Sociale */}
          <div className="rounded-3xl border border-border p-6">
            <h3 className="text-xl font-semibold">Remboursement par la Sécurité Sociale</h3>
            <p className="text-muted-foreground mt-2">
              Les lentilles peuvent être remboursées dans certains cas spécifiques :
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
              <li>Astigmatisme irrégulier</li>
              <li>Kératocône</li>
              <li>Myopie supérieure ou égale à 8 dioptries</li>
              <li>Aphakie</li>
              <li>Anisométrie supérieure à 3 dioptries non corrigeable par lunettes</li>
              <li>Strabisme accommodatif</li>
            </ul>

            <div className="mt-4 p-3 bg-green-50/10 rounded-xl border border-green-200/20">
              <p className="text-sm font-medium text-green-400">Montant du remboursement (2024)</p>
              <p className="text-sm text-muted-foreground mt-1">
                L'Assurance Maladie rembourse à <span className="font-semibold">65%</span> sur la base d'un forfait annuel
                de <span className="font-semibold">39,48€</span> par œil, soit environ <span className="font-semibold">25,70€</span>.
                <br />(Que les lentilles soient réutilisables ou non, journalières ou hebdomadaires)
              </p>
            </div>

            <p className="text-muted-foreground mt-3">
              La plupart des <span className="font-medium">mutuelles</span> proposent un forfait lentilles variable
              selon les cas (consulter sa mutuelle).
            </p>
          </div>

          {/* Différence acuité visuelle / dioptries */}
          <div className="rounded-3xl border border-border p-6">
            <h3 className="text-xl font-semibold">Acuité visuelle vs Correction en dioptries</h3>
            <div className="mt-3 space-y-2 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Acuité visuelle</span> : se mesure <span className="italic">sans correction</span>.
                Elle s'exprime en dixièmes (ex: 2/10, 7/10) ou en d'autres unités internationales.
              </p>
              <p>
                <span className="font-medium text-foreground">Correction visuelle</span> : s'exprime en <span className="font-semibold">dioptries</span>.
                C'est le nombre de dioptries qu'il faut ajouter pour corriger au mieux la vue et atteindre la meilleure acuité
                (10/10 le plus souvent, parfois moins, rarement plus).
              </p>
            </div>
            <div className="mt-3 p-3 bg-amber-50/10 rounded-xl border border-amber-200/20">
              <p className="text-xs text-muted-foreground">
                Exemple : Une myopie de -3 dioptries signifie qu'il faut ajouter une correction de -3 pour que le patient
                atteigne 10/10 de vision.
              </p>
            </div>
          </div>

          {/* Rappel important */}
          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/5 p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Important :</span> La prescription des lentilles est un acte médical.
              Ne portez jamais de lentilles sans avis et prescription d'un ophtalmologiste.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionLentillesSection;