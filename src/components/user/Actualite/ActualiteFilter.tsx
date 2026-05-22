import React from "react";
import { Clock, Flame, Video, BookOpen, LayoutGrid } from "lucide-react";
import type { FilterType } from "../../../types/types";

interface FilterOption {
  key: FilterType;
  label: string;
  icon: React.ElementType;
}

const OPTIONS: FilterOption[] = [
  { key: "all",     label: "Tout",       icon: LayoutGrid },
  { key: "recent",  label: "Plus récent", icon: Clock },
  { key: "popular", label: "Populaire",  icon: Flame },
  { key: "video",   label: "Vidéos",     icon: Video },
  { key: "blog",    label: "Articles",   icon: BookOpen },
];

interface ActualiteFilterProps {
  active: FilterType;
  onChange: (f: FilterType) => void;
}

const ActualiteFilter: React.FC<ActualiteFilterProps> = ({ active, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {OPTIONS.map(({ key, label, icon: Icon }) => (
      <button
        key={key}
        type="button"
        onClick={() => onChange(key)}
        className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
          active === key
            ? "border-navy bg-navy text-white"
            : "border-border bg-white text-navy/70 hover:border-navy hover:text-navy"
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
        {label}
      </button>
    ))}
  </div>
);

export default ActualiteFilter;