import React from "react";

const MyopieSection: React.FC = () => {
  // Remplacez les ID ci-dessous par les vôtres
  const videoClarificationId = "YpNMuYDw60Q";
  const videoCorrectionId = "MT9uWGqgYzQ";

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <p className="eyebrow">Défaut visuel</p>

        <h2 className="mt-3 text-4xl font-semibold">
          Myopie
        </h2>
      </div>

      {/* Première ligne : explication + vidéo clarification */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            La myopie est un trouble de la vision où la personne voit les objets flous de loin,
            car le cristallin est trop bombé, donc trop convergent, et les rayons lumineux se
            rencontrent devant la rétine. Autrement dit, le myope voit moins bien de loin que de près.
          </p>
          <p className="text-muted-foreground">
            Ceci peut être corrigé par des lunettes, lentilles de contact ou par la chirurgie réfractive.
            26 % de la population mondiale est myope, avec une nette tendance à l’augmentation.
            Dans les pays industrialisés on parle même parfois d’épidémie de myopie.
          </p>
        </div>

        <div className="rounded-3xl border border-border overflow-hidden bg-muted/20">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${videoClarificationId}`}
              title="Vidéo explicative sur la myopie"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="p-3 text-center text-sm text-muted-foreground">
            Vidéo : comprendre la myopie
          </p>
        </div>
      </div>

      {/* Deuxième bloc : correction + déroulement opération */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-border p-6">
          <h3 className="text-xl font-semibold">La correction de la myopie</h3>
          <ul className="space-y-3 text-muted-foreground list-disc pl-5">
            <li>
              <span className="font-medium text-foreground">Lunettes :</span> Plus la correction est importante,
              plus le verre est épais. Le port constant peut être contraignant (sport, champ de vision rétréci…)
            </li>
            <li>
              <span className="font-medium text-foreground">Lentilles de contact :</span> Champ visuel dégagé
              et confort accru. Un examen ophtalmologique avec essais préalables est nécessaire.
            </li>
            <li>
              <span className="font-medium text-foreground">Chirurgie réfractive :</span> Très performante.
              Un examen d’éligibilité vérifie votre vue, l’épaisseur de la cornée, etc.
            </li>
          </ul>
          <p className="text-muted-foreground">
            La myopie forte se corrige très bien au Lasik jusqu’à 10–12 dioptries (même avec astigmatisme)
            si la cornée est suffisamment épaisse.
          </p>
          <p className="text-muted-foreground">
            Techniques possibles : Lasik, FEMTO Lasik, PKR, Trans PKR, extraction lenticulaire.
            Si aucune n’est applicable, on peut envisager l’implantation d’un implant devant le cristallin
            ou d’un implant artificiel (opération plus lourde, similaire à la cataracte).
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-border p-6">
          <h3 className="text-xl font-semibold">Déroulement de l’opération</h3>
          <p className="text-muted-foreground">
            L’opération au laser est très rapide et indolore, sauf avec la technique PKR/TransPKR où
            des douleurs post-opératoires sont possibles les 2 premiers jours.
          </p>
          <p className="text-muted-foreground">
            La vue est récupérée très rapidement, souvent immédiatement après l’intervention.
            Les résultats sont durables.
          </p>
          <p className="text-muted-foreground">
            Le risque zéro n’existe pas, mais la stérilisation, l’hygiène et la sélection rigoureuse
            des patients réduisent fortement les risques.
          </p>

          {/* Deuxième vidéo YouTube */}
          <div className="mt-4 rounded-xl overflow-hidden border border-border">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoCorrectionId}`}
                title="Vidéo sur la correction de la myopie par laser"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="p-2 text-center text-xs text-muted-foreground">
              Vidéo : correction laser de la myopie
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyopieSection;