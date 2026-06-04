import React, { useMemo, useState } from "react";

import MyopieSection from "./MyopieSection";
import AstigmatismeSection from "./AstigmatismeSection";
import PresbytieSection from "./PresbytieSection";
import HypermetropieSection from "./HypermetropieSection";
import TypesLentillesSection from "./TypesLentillesSection";
import PrescriptionLentillesSection from "./PrescriptionLentillesSection";
import ManipulationLentillesSection from "./ManipulationLentillesSection";

const TABS = [
  "Myopie",
  "Astigmatisme",
  "Presbytie",
  "Hypermétropie",
  "Différents types de lentilles",
  "Prescription et prise en charge",
  "Manipulation des lentilles",
];

const DefautsVisuelsTabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Myopie");

  const currentSection = useMemo(() => {
    switch (activeTab) {
      case "Myopie":
        return <MyopieSection />;

      case "Astigmatisme":
        return <AstigmatismeSection />;

      case "Presbytie":
        return <PresbytieSection />;

      case "Hypermétropie":
        return <HypermetropieSection />;

      case "Différents types de lentilles":
        return <TypesLentillesSection />;

      case "Prescription et prise en charge":
        return <PrescriptionLentillesSection />;

      case "Manipulation des lentilles":
        return <ManipulationLentillesSection />;

      default:
        return <MyopieSection />;
    }
  }, [activeTab]);

  return (
    <section className="py-8">
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

        {/* Dynamic content */}
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

export default DefautsVisuelsTabsSection;