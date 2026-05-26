import React from "react";

const ManipulationLentillesSection: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <p className="eyebrow">Manipulation des lentilles</p>
        <h2 className="mt-3 text-4xl font-semibold">
          Comment manipuler les lentilles de contact
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Colonne gauche : pose des lentilles */}
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Pour les novices, la pose de lentilles paraît si compliquée que beaucoup d'entre vous n'osent même
            pas essayer ! Il vous suffirait pourtant de répéter ces gestes cinq ou six fois pour faire aussi
            vite et aussi bien qu'un vrai "pro" !
          </p>

          {/* Étapes de pose */}
          <div className="rounded-3xl border border-border p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-2xl"></span> Mettre la lentille
            </h3>
            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium">1</span>
                <p className="text-muted-foreground">Lavez <span className="font-medium text-foreground">soigneusement vos mains</span>.</p>
              </div>

              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium">2</span>
                <p className="text-muted-foreground">
                  Placez la lentille au bout de l'index. Installez-vous sur une chaise, devant une table bien propre
                  et convenablement éclairée. Placez la lentille préalablement rincée avec votre solution de nettoyage
                  sur la pulpe de l'index droit ou gauche (selon que vous êtes droitier ou gaucher).
                </p>
              </div>

              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium">3</span>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Abaissez la paupière inférieure.</span> Avec le majeur de la même main,
                  tirez légèrement vers le bas votre paupière inférieure.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium">4</span>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Soulevez la paupière supérieure.</span> Sans lâcher la paupière inférieure,
                  tirez légèrement sur la paupière supérieure vers le haut avec le majeur de l'autre main.
                  Grâce à cette manœuvre, le blanc de l'œil est alors apparent.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium">5</span>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Posez la lentille sur la cornée.</span> Sans lâcher vos paupières,
                  regardez loin devant vous et posez délicatement la lentille sur l'œil.
                  <span className="block mt-1 text-green-400">✓ Contrairement à une idée reçue, cela ne fait absolument pas mal !</span>
                </p>
              </div>

              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium">6</span>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Clignez de l'œil.</span> Regardez légèrement vers le bas avant de relâcher
                  les paupières, puis clignez plusieurs fois jusqu'à obtenir une vision parfaite.
                  La lentille se centre automatiquement sur votre œil.
                </p>
              </div>
            </div>
            <div className="mt-5 p-3 bg-primary/10 rounded-xl text-center">
              <p className="text-sm font-medium">L'opération a duré moins d'une minute !</p>
            </div>
          </div>

          {/* Retrait des lentilles */}
          <div className="rounded-3xl border border-border p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-2xl">Retirer la lentille</span> 
            </h3>
            <p className="text-muted-foreground mt-2">
              Méthode du <span className="font-medium text-foreground">"pincement"</span> :
            </p>
            <div className="mt-3 space-y-3 text-muted-foreground">
              <div className="flex gap-3">
                <span className="text-lg">1 -</span>
                <p>Regardez vers le haut, puis à l'aide de l'index faites glisser la lentille sur la partie inférieure de l'œil.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">2-</span>
                <p>Pincez délicatement la lentille entre le pouce et l'index.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite : entretien des lentilles */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-border p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-2xl">Entretien des lentilles</span> 
            </h3>
            <p className="text-muted-foreground mt-2">
              Pour stocker des lentilles de contact, il existe des solutions proposant un étui ainsi qu'une
              solution de désinfection et de conservation. La lentille se met dans l'étui rempli de cette solution.
            </p>

            <div className="mt-4 p-3 bg-amber-50/10 rounded-xl border border-amber-200/20">
              <p className="text-sm">
                <span className="font-medium">Attention :</span> Si les lentilles jetables ne nécessitent pas de nettoyage,
                d'autres types exigent un nettoyage régulier et une désinfection pour conserver une vision claire
                et éviter les infections (bactéries, champignons, <span className="font-semibold">Acanthamoeba</span> qui forment un biofilm).
              </p>
            </div>
          </div>

          {/* Produits d'entretien */}
          <div className="rounded-3xl border border-border p-6">
            <h3 className="text-lg font-semibold">Produits d'entretien</h3>
            <div className="mt-3 space-y-4">
              <div className="border-b border-border pb-3">
                <p className="font-medium text-foreground">💧 Solution polyvalente</p>
                <p className="text-sm text-muted-foreground">
                  La plus répandue et populaire. Utilisée pour le rinçage, la désinfection, le nettoyage
                  et la conservation. Élimine le besoin de comprimés enzymatiques dans la plupart des cas.
                </p>
              </div>

              <div className="border-b border-border pb-3">
                <p className="font-medium text-foreground">💧 Solution saline</p>
                <p className="text-sm text-muted-foreground">
                  Utilisée pour le rinçage des lentilles après le nettoyage et avant l'insertion.
                  <span className="block text-amber-400"> Ne désinfecte pas les lentilles.</span>
                </p>
              </div>

              <div className="border-b border-border pb-3">
                <p className="font-medium text-foreground">💧 Solution de peroxyde d'hydrogène</p>
                <p className="text-sm text-muted-foreground">
                  Utilisée pour la désinfection des lentilles. Disponible en "deux étapes" ou "une étape".
                </p>
              </div>

              <div>
                <p className="font-medium text-foreground">💧 Nettoyeur enzymatique</p>
                <p className="text-sm text-muted-foreground">
                  Utilisé pour le nettoyage des dépôts de protéines sur les lentilles, le plus souvent
                  de façon hebdomadaire, si le nettoyage quotidien n'est pas suffisant.
                </p>
              </div>
            </div>
          </div>

          {/* Rappel important */}
          <div className="rounded-3xl border border-blue-500/30 bg-blue-500/5 p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Conseil :</span> Ne touchez jamais la lentille avec les ongles pour éviter de l'endommager.
              Lavez-vous toujours les mains avant toute manipulation. Respectez scrupuleusement les durées
              de port et de remplacement indiquées par votre opticien ou ophtalmologiste.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManipulationLentillesSection;