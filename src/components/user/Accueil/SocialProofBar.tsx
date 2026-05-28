import React, { useEffect, useState } from "react";
import { Users, Star, Award, Clock } from "lucide-react";

const ITEMS = [
  { icon: Users,  text: "+10 000 patients opérés" },
  { icon: Star,   text: "4.9/5 · 340 avis vérifiés" },
  { icon: Award,  text: "+15 ans d'expertise" },
  { icon: Clock,  text: "Réponse sous 48h" },
];

const SocialProofBar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{ background: "#0C2340", height: "36px" }}
    >
      <div className="h-full flex items-center justify-center overflow-hidden">
        {/* Marquee continu */}
        <div className="flex items-center gap-0 animate-none overflow-hidden w-full">
          <div
            className="flex items-center gap-12 whitespace-nowrap"
            style={{ animation: "marquee-lp 18s linear infinite" }}
          >
            {[...ITEMS, ...ITEMS].map((item, i) => {
              const Icon = item.icon;
              return (
                <span key={i} className="flex items-center gap-2 text-[11px] font-medium"
                      style={{ color: "#C9A84C" }}>
                  <Icon size={12} />
                  {item.text}
                  <span className="mx-4 opacity-30">·</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-lp {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default SocialProofBar;