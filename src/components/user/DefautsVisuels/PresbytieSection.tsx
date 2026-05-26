import React from "react";

const PresbytieSection: React.FC = () => {
  const videoId = "mqRJ0NoT69M";

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <p className="eyebrow">Défaut visuel</p>

        <h2 className="mt-3 text-4xl font-semibold">
          Presbytie
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Colonne gauche : explications */}
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Autour de l'âge de 45 ans, nous devenons tous presbytes. Cette presbytie est liée à
            la perte d'élasticité du cristallin, elle entraîne une perte progressive de
            l'accommodation et implique le port d'une correction de lecture.
          </p>

          <p className="text-muted-foreground">
            Les myopes atteints de presbytie sont souvent capables de lire sans verres, car dans
            une certaine mesure la presbytie vient compenser la myopie de près. Mais en vision de loin,
            la personne gardera toujours le même degré de myopie, malgré la presbytie.
          </p>

          <p className="text-muted-foreground">
            La presbytie peut être soit isolée (démarrant autour de 45 ans), soit venir se surajouter
            à un défaut préexistant (myopie, hypermétropie ou astigmatisme).
          </p>

          <p className="text-muted-foreground">
            La correction chirurgicale de la presbytie a fait beaucoup de progrès et elle est aujourd'hui
            très performante. Néanmoins, tous les malades ne sont pas opérables et seul le bilan préalable
            permettra de tirer les bonnes indications.
          </p>

          <div className="rounded-2xl bg-muted/30 p-5 mt-2">
            <h4 className="font-semibold mb-2">Techniques de correction</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <span className="font-medium text-foreground">Lasik ou laser femto seconde</span> – les techniques de référence</li>
              <li>• <span className="font-medium text-foreground">Monovision</span> – un œil corrigé pour la vision de loin, l'autre pour la vision de près</li>
              <li>• <span className="font-medium text-foreground">Presbymax</span> – correction multifocale, très bons résultats si la sélection des patients est bien faite</li>
            </ul>
          </div>

          <p className="text-muted-foreground">
            Une simulation de la vision future est réalisée avant l'opération, soit sur verres correcteurs d'essai,
            soit au mieux avec des lentilles de contact fournies pour essai préalable.
          </p>

          <p className="text-muted-foreground">
            L'opération se fait sur notre laser Schwind Amaris 1050 RS et dure environ une vingtaine de secondes
            par œil. Le résultat est acquis dès le lendemain, mais il faut souvent quelques jours voire quelques
            semaines pour que le patient s'habitue à cette nouvelle vision. En cas de non-accoutumance, une retouche
            est toujours envisageable.
          </p>
        </div>

        {/* Colonne droite : symptômes + vidéo */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-border p-8">
            <h3 className="text-xl font-semibold">
              Symptômes fréquents
            </h3>

            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li>• Difficulté à lire ou à voir de près</li>
              <li>• Fatigue visuelle</li>
              <li>• Maux de tête</li>
              <li>• Nécessité de tenir les objets plus éloignés pour les voir clairement</li>
              <li>• Perte progressive de l'accommodation après 40-45 ans</li>
            </ul>
          </div>

          {/* Vidéo YouTube explicative */}
          <div className="rounded-3xl border border-border overflow-hidden bg-muted/20">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Vidéo explicative sur la presbytie"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="p-3 text-center text-sm text-muted-foreground">
              Vidéo : comprendre la presbytie et ses corrections
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresbytieSection;