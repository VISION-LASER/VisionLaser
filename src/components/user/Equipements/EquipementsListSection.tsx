import React from "react";
import { EQUIPMENT_ITEMS } from "../../../data/data";
import EquipementCard from "./EquipementCard";

const EquipementsListSection: React.FC = () => {
  return (
    <section className="section">
      <div className="container-page space-y-20">
        {EQUIPMENT_ITEMS.map((item, index) => (
          <EquipementCard key={item.name} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default EquipementsListSection;