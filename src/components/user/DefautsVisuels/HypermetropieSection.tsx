import React from "react";

const HypermetropieSection: React.FC = () => {
  const videoId = "-uwt52Z4I84";

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <p className="eyebrow">Défaut visuel</p>
        <h2 className="mt-3 text-4xl font-semibold">
          Hypermétropie
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Colonne gauche : explications */}
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Dans l'hypermétropie, l'œil est trop court et les rayons lumineux sont focalisés
            derrière la rétine : on voit flou de près, voire même de loin, et cela occasionne
            de la fatigue.
          </p>

          <p className="text-muted-foreground">
            Le patient jeune ne s'en aperçoit pas immédiatement car les efforts d'accommodation
            de son cristallin – encore souple – lui permettent de compenser cette hypermétropie.
          </p>

          <p className="text-muted-foreground">
            L'hypermétropie s'opère très bien par chirurgie réfractive (jusqu'à 6 dioptries),
            qu'elle soit associée ou non à un astigmatisme ou à une presbytie.
          </p>

          <p className="text-muted-foreground">
            Les conditions, risques et précautions de l'opération de l'hypermétropie sont
            superposables à celles de la myopie. Les complications graves sont exceptionnelles,
            surtout lorsque l'on a pratiqué au préalable un bilan d'éligibilité complet et
            rigoureux pour s'assurer de l'absence de contre-indication.
          </p>

          <div className="rounded-2xl bg-muted/30 p-5 mt-2">
            <h4 className="font-semibold mb-2">Procédures applicables</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Lasik</li>
              <li>• Laser femto seconde</li>
              <li>• Trans PKR – la seule opération vraiment 100% laser et sans aucun contact avec l'œil du patient</li>
            </ul>
          </div>

          <p className="text-muted-foreground text-sm italic">
            Comme pour toutes les opérations de chirurgie réfractive, le risque zéro n'existe pas,
            mais dans l'ensemble, les complications graves sont exceptionnelles.
          </p>
        </div>

        {/* Colonne droite : symptômes + vidéo */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-border p-8">
            <h3 className="text-xl font-semibold">
              Symptômes fréquents
            </h3>

            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li>• Difficulté à voir de près</li>
              <li>• Vision floue de près, parfois aussi de loin</li>
              <li>• Fatigue visuelle</li>
              <li>• Maux de tête</li>
              <li>• Nécessité de cligner des yeux souvent</li>
            </ul>
          </div>

          {/* Vidéo YouTube explicative */}
          <div className="rounded-3xl border border-border overflow-hidden bg-muted/20">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Vidéo explicative sur l'hypermétropie - œil trop court"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="p-3 text-center text-sm text-muted-foreground">
              Vidéo : comprendre l'hypermétropie (œil trop court)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HypermetropieSection;