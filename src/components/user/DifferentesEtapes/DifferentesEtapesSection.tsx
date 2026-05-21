// import React from "react";
// import { Link } from "react-router-dom";
// import { DEFECTS } from "../../../data/data";

// const DifferentesEtapesSection: React.FC = () => (
//   <section className="section">
//     <div className="container-page">
//       {/* Defect cards grid */}
//       <div className="grid gap-6 md:grid-cols-2">
//         {DEFECTS.map(({ name, description }, i) => (
//           <article key={name} className="card-soft">
//             <p className="eyebrow">0{i + 1}</p>
//             <h3 className="mt-3">{name}</h3>
//             <p className="mt-3 text-muted-foreground">{description}</p>
//           </article>
//         ))}
//       </div>

//       {/* Disclaimer banner */}
//       <div className="mt-12 rounded-2xl border border-border bg-[color:var(--cream)] p-8 md:p-10">
//         <p className="eyebrow">À retenirrrrrrrrrrrrrrrrr</p>
//         <p className="mt-3 max-w-2xl text-navy">
//           Aucun diagnostic ne peut être posé à distance. Le bilan visuel gratuit
//           est l'étape indispensable pour évaluer votre profil et déterminer si
//           une correction au laser est envisageable.
//         </p>
//         <h1>TESTETSETSTSSE</h1>
//         <div className="mt-6">
//           <Link to="/contact" className="btn-gold">
//             Demander un bilan visuel gratuit
//           </Link>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// export default DifferentesEtapesSection;

import React from "react";
import { Link } from "react-router-dom";
import laser from "../../../assets/laser-equipment.jpg";

const DifferentesEtapesSection: React.FC = () => {
  const steps = [
    {
      step: "Step One",
      title: "MEET AND GREET",
      description:
        "You will have measurements taken and you will meet with Dr. Caster, our Lasik/PRK/Smile specialist. He will answer all your questions, address all your concerns, and carefully explain the pros and cons of all your options. You will feel welcomed and valued.",
      info: "Bilan gratuit • 1h",
    },
    {
      step: "Step Two",
      title: "LIFE CHANGED",
      description:
        "You're in and out with a pain-free 5 minute procedure. The laser portion is only 30 seconds per eye! So easy. No needles, no pain! Stand up, see clearer than before, and go home.",
      info: "5 min • 30 sec par œil",
    },
    {
      step: "Step Three",
      title: "ENJOY YOUR NEW VISION",
      description:
        "Patients typically have an overnight recovery and are back to most normal activities the very next day. Except you can now see with your own eyes and better than you have for many many years!",
      info: "Récupération • 24h",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section avec photo centrale + phrase + flèches */}
        <div className="relative mb-16">
          {/* Photo centrale en haut */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-lg z-10 relative bg-white">
              <img 
                src={laser} 
                alt="Centre Vision Laser" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Phrase juste en dessous de la photo */}
          <div className="text-center mb-8">
            <h2 
              className="text-lg md:text-xl font-bold leading-tight"
              style={{ color: "#0C2340" }}
            >
              FIND OUT IF YOU ARE A GOOD CANDIDATE & GET ALL OF YOUR
              <br />
              QUESTIONS ANSWERED AT A FREE CONSULTATION
            </h2>
          </div>

          {/* Conteneur SVG pour la flèche avec polygone vers le bas */}
          <div className="relative h-32 md:h-40 w-full">
            <svg 
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 160" 
              preserveAspectRatio="none"
              style={{ pointerEvents: "none" }}
            >
              {/* Ligne verticale qui descend de la phrase - fine et pointillée */}
              <line 
                x1="400" 
                y1="0" 
                x2="400" 
                y2="50" 
                stroke="#C9A84C" 
                strokeWidth="1.5" 
                strokeDasharray="4 6"
              />
              
              {/* Polygone (pointe de flèche) vers le bas */}
              <polygon 
                points="394,50 400,62 406,50" 
                fill="#C9A84C"
              />
              
              {/* Ligne horizontale vers la gauche - fine et pointillée */}
              <line 
                x1="400" 
                y1="62" 
                x2="150" 
                y2="62" 
                stroke="#C9A84C" 
                strokeWidth="1.5" 
                strokeDasharray="4 6"
              />
              
              {/* Ligne horizontale vers la droite - fine et pointillée */}
              <line 
                x1="400" 
                y1="62" 
                x2="650" 
                y2="62" 
                stroke="#C9A84C" 
                strokeWidth="1.5" 
                strokeDasharray="4 6"
              />

              {/* Ligne verticale vers la gauche - fine et pointillée */}
              <line 
                x1="150" 
                y1="62" 
                x2="150" 
                y2="130" 
                stroke="#C9A84C" 
                strokeWidth="1.5" 
                strokeDasharray="4 6"
              />

              {/* Ligne verticale vers le centre - fine et pointillée */}
              <line 
                x1="400" 
                y1="62" 
                x2="400" 
                y2="130" 
                stroke="#C9A84C" 
                strokeWidth="1.5" 
                strokeDasharray="4 6"
              />

              {/* Ligne verticale vers la droite - fine et pointillée */}
              <line 
                x1="650" 
                y1="62" 
                x2="650" 
                y2="130" 
                stroke="#C9A84C" 
                strokeWidth="1.5" 
                strokeDasharray="4 6"
              />
            </svg>
          </div>
        </div>

        {/* 3 colonnes horizontales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col h-full">
              {/* Photo en bas */}
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src={laser} 
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Step One / Step Two / Step Three */}
              <div 
                className="text-sm font-semibold tracking-wider text-center mb-2"
                style={{ color: "#C9A84C" }}
              >
                {step.step}
              </div>

              {/* Titre principal */}
              <h3 
                className="text-xl font-bold text-center mb-4"
                style={{ color: "#0C2340" }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p 
                className="text-base leading-relaxed text-center mb-6 flex-grow"
                style={{ color: "#0C2340", opacity: 0.8 }}
              >
                {step.description}
              </p>

              {/* Informations en bas */}
              <div 
                className="text-center pt-4 border-t-2"
                style={{ borderColor: "#C9A84C" }}
              >
                <span 
                  className="text-sm font-medium"
                  style={{ color: "#C9A84C" }}
                >
                  {step.info}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bandeau CTA en bas */}
        <div 
          className="rounded-2xl p-8 text-center"
          style={{ backgroundColor: "#F8F7F4" }}
        >
          <div 
            className="w-12 h-0.5 mx-auto mb-4"
            style={{ backgroundColor: "#C9A84C" }}
          />
          <p className="text-sm mb-4" style={{ color: "#0C2340", opacity: 0.7 }}>
            Prêt à voir clair ?
          </p>
          <Link to="/contact">
            <button 
              className="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ 
                backgroundColor: "#0C2340", 
                color: "white",
              }}
            >
              DEMANDER UN BILAN VISUEL GRATUIT →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DifferentesEtapesSection;