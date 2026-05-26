import React, { useMemo, useState } from "react";

import AmarisSection from "./AmarisSection";
import FemtoSection from "./FemtoSection";
import SiriusSection from "./SiriusSection";
import WaveFrontSection from "./WavefrontSection";

const TABS = [
  "Schwind AMARIS 1050 RS",
  "Laser FEMTOSECONDE LDC Crystal LINE de Ziemer",
  "Topographe SIRIUS",
  "Aberromètre Schwind Ocular Wavefront Analyzer",
];

const EquipementsTabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(
    "Schwind AMARIS 1050 RS"
  );

  const currentSection = useMemo(() => {
    switch (activeTab) {
      case "Schwind AMARIS 1050 RS":
        return <AmarisSection />;

      case "Laser FEMTOSECONDE LDC Crystal LINE de Ziemer":
        return <FemtoSection />;

      case "Topographe SIRIUS":
        return <SiriusSection />;

      case "Aberromètre Schwind Ocular Wavefront Analyzer":
        return <WaveFrontSection />;

      default:
        return <AmarisSection />;
    }
  }, [activeTab]);

  return (
    <section className="section">
      <div className="container-page">

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-3">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                rounded-full border px-5 py-3 text-sm transition-all duration-300
                ${
                  activeTab === tab
                    ? "bg-navy text-white border-navy"
                    : "border-border hover:border-navy"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic section */}
        <div
          key={activeTab}
          className="animate-fade-up rounded-3xl border border-border p-8 md:p-12"
        >
          {currentSection}
        </div>
      </div>
    </section>
  );
};

export default EquipementsTabsSection;