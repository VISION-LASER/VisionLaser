import React from "react";

const TypesLentillesSection: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <p className="eyebrow">Lentilles de contact</p>
        <h2 className="mt-3 text-4xl font-semibold">
          Différents types de lentilles
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Colonne gauche : explications principales */}
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Il existe deux grands types de lentilles de contact : les lentilles souples et les lentilles rigides.
            Les lentilles de contact peuvent avoir des fonctions correctrices, cosmétiques et thérapeutiques.
          </p>

          {/* Lentilles souples */}
          <div className="rounded-2xl bg-muted/30 p-5">
            <h3 className="text-lg font-semibold mb-2">Lentilles souples</h3>
            <p className="text-muted-foreground">
              Les lentilles souples sont les plus courantes, car adaptables et faciles à utiliser pour la plupart
              des personnes. On trouve des lentilles souples journalières, hebdomadaires, bimensuelles, mensuelles
              et annuelles. La plupart des lentilles cosmétiques et thérapeutiques sont des lentilles souples.
            </p>
          </div>

          {/* Lentilles rigides */}
          <div className="rounded-2xl bg-muted/30 p-5">
            <h3 className="text-lg font-semibold mb-2">Lentilles rigides</h3>
            <p className="text-muted-foreground">
              Deux sortes existent : les premières lentilles rigides en PMMA (anciennes) et les lentilles rigides
              modernes perméables à l'oxygène. Ces dernières conviennent particulièrement aux personnes présentant
              une sécheresse oculaire. La plupart des lentilles rigides sont plus onéreuses que les souples, mais
              leur durée de vie est plus longue : certaines peuvent être utilisées durant un à deux ans.
            </p>
          </div>

          {/* Lentilles à port continu */}
          <div className="rounded-2xl bg-muted/30 p-5">
            <h3 className="text-lg font-semibold mb-2">Lentilles à port continu</h3>
            <p className="text-muted-foreground">
              Certaines lentilles (souples et rigides) peuvent être portées de jour et de nuit grâce aux nouveaux
              matériaux comme le silicone hydrogel. Cependant, la majorité des ophtalmologistes déconseillent le
              port continu car il augmente considérablement le risque d'infection. Le port de nuit nécessite un
              avis médical.
            </p>
          </div>
        </div>

        {/* Colonne droite : fonctions et informations complémentaires */}
        <div className="space-y-6">
          {/* Lentilles correctrices */}
          <div className="rounded-3xl border border-border p-6">
            <h3 className="text-xl font-semibold">Lentilles correctrices</h3>
            <p className="text-muted-foreground mt-2">
              Les lentilles corrigent dans la plupart des cas l'hypermétropie, la myopie, mais également
              l'astigmatisme et la presbytie.
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>• Retrait généralement tous les soirs ou tous les deux jours</li>
              <li>• Certaines lentilles "Night & Day" peuvent être portées sans interruption</li>
              <li>• Lentilles teintées pour certaines déficiences des couleurs (daltonisme)</li>
            </ul>
          </div>

          {/* Lentilles cosmétiques */}
          <div className="rounded-3xl border border-border p-6">
            <h3 className="text-xl font-semibold">Lentilles cosmétiques</h3>
            <p className="text-muted-foreground mt-2">
              Conçues pour changer l'apparence de l'œil. Toutes les couleurs sont possibles (bleu, vert, rouge,
              jaune, orange, etc.). Certaines peuvent également corriger la vision ou masquer des défauts
              comme l'absence (aniridie) ou des dommages de l'iris.
            </p>
          </div>

          {/* Lentilles thérapeutiques */}
          <div className="rounded-3xl border border-border p-6">
            <h3 className="text-xl font-semibold">Lentilles thérapeutiques</h3>
            <p className="text-muted-foreground mt-2">
              Utilisées comme "lentilles pansement" pour protéger la cornée blessée ou malade. Elles sont
              employées dans le traitement de : kératopathie bulleuse, sécheresse oculaire, ulcères,
              érosion de la cornée, kératites, œdèmes de cornées, et après des opérations comme le Lasik
              pour améliorer la cicatrisation.
            </p>
          </div>

          {/* Effets indésirables */}
          <div className="rounded-3xl border border-border p-6 bg-red-50/10">
            <h3 className="text-xl font-semibold text-amber-600">Effets indésirables</h3>
            <p className="text-muted-foreground mt-2">
              Environ 4% des porteurs de lentilles sont touchés par des complications chaque année.
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>• <span className="font-medium">Kératite amibienne</span> : peut aller jusqu'à la perte de l'œil en cas de rinçage à l'eau du robinet</li>
              <li>• <span className="font-medium">Ulcère ou abcès de cornée</span> : favorisés par mauvaise hygiène, port excessif (&gt;10-12h/jour)</li>
              <li>• <span className="font-medium">À long terme</span> : diminution de l'épaisseur de la cornée, augmentation des irrégularités de surface</li>
            </ul>
            <p className="text-muted-foreground mt-3 text-sm italic">
              La mauvaise tolérance apparaissant parfois après quelques années est souvent le motif déclenchant
              la demande pour la chirurgie laser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypesLentillesSection;