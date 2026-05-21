import React from "react";
import type { EquipmentItem } from "../../../types/types";

interface EquipementCardProps {
  item: EquipmentItem;
  index: number;
}

const EquipementCard: React.FC<EquipementCardProps> = ({ item, index }) => {
  const isReversed = index % 2 !== 0;

  return (
    <article className="grid items-center gap-10 md:grid-cols-2">
      <img
        src={item.image}
        alt={item.imageAlt}
        width={1400}
        height={1000}
        loading="lazy"
        className={`aspect-[5/4] w-full rounded-3xl object-cover ${
          isReversed ? "md:order-2" : ""
        }`}
      />
      <div>
        <p className="eyebrow">0{index + 1}</p>
        <h2 className="mt-3">{item.name}</h2>
        <p className="mt-5 text-muted-foreground">{item.description}</p>
        <div className="mt-6 gold-rule" />
      </div>
    </article>
  );
};

export default EquipementCard;