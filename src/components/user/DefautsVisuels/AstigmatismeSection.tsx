import React from "react";

const AstigmatismeSection: React.FC = () => {
  const videoId = "GtpPHSd0wQ8";

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <p className="eyebrow">Défaut visuel</p>

        <h2 className="mt-3 text-4xl font-semibold">
          Astigmatisme
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Colonne gauche : explications */}
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Dans l'astigmatisme, la courbure de la cornée n'est pas la même dans tous les axes :
            au lieu d'être ronde comme un ballon de football, la cornée est aplatie comme un ballon de rugby.
            Cela induit une distorsion des images aussi bien de loin que de près.
          </p>

          <p className="text-muted-foreground">
            Souvent, la myopie et l'hypermétropie sont associées avec un certain degré d'astigmatisme.
          </p>

          <p className="text-muted-foreground">
            L'opération de l'astigmatisme est possible, qu'il soit isolé ou associé à un autre défaut optique.
            Nous pouvons corriger des astigmatismes jusqu'à 6 dioptries, même associés à d'autres défauts visuels
            tels que la myopie, l'hypermétropie et la presbytie.
          </p>

          <p className="text-muted-foreground">
            Les techniques de choix sont là encore le Lasik, laser Femto seconde, PKR, ou Trans PKR.
            Comme pour les autres défauts visuels, la correction au laser prendra de 20 à 30 secondes par œil,
            avec notre laser Schwind Amaris 1050, le plus rapide au monde.
          </p>
        </div>

        {/* Colonne droite : symptômes + vidéo */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-border p-8">
            <h3 className="text-xl font-semibold">
              Symptômes fréquents
            </h3>

            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li>• Vision floue et déformée</li>
              <li>• Fatigue visuelle</li>
              <li>• Maux de tête</li>
              <li>• Difficulté à lire ou à voir de près</li>
              <li>• Distorsion des images (de loin comme de près)</li>
            </ul>
          </div>

          {/* Vidéo YouTube explicative */}
          <div className="rounded-3xl border border-border overflow-hidden bg-muted/20">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Vidéo explicative sur l'astigmatisme"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="p-3 text-center text-sm text-muted-foreground">
              Vidéo : comprendre l'astigmatisme et sa correction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstigmatismeSection;