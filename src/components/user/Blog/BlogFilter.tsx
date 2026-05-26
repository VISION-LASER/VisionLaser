import React from "react";
import { LayoutGrid, Clock, Flame, Eye, Activity, BookOpen, Stethoscope } from "lucide-react";

export type BlogCategory =
  | "all"
  | "defauts-visuels"
  | "maladies-frequentes"
  | "ressources-patients"
  | "chirurgie-refractive";

export type BlogSortType = "recent" | "popular";

const CATEGORIES = [
  { key: "all"                  as BlogCategory, label: "Tous",                   icon: LayoutGrid  },
  { key: "chirurgie-refractive" as BlogCategory, label: "Chirurgie réfractive",   icon: Stethoscope },
  { key: "defauts-visuels"      as BlogCategory, label: "Défauts visuels",        icon: Eye         },
  { key: "maladies-frequentes"  as BlogCategory, label: "20 maladies fréquentes", icon: Activity    },
  { key: "ressources-patients"  as BlogCategory, label: "Ressources patients",    icon: BookOpen    },
];

const SORTS = [
  { key: "recent"  as BlogSortType, label: "Plus récents", icon: Clock },
  { key: "popular" as BlogSortType, label: "Plus aimés",   icon: Flame },
];

interface BlogFilterProps {
  activeCategory: BlogCategory;
  activeSort: BlogSortType;
  onCategoryChange: (c: BlogCategory) => void;
  onSortChange: (s: BlogSortType) => void;
  totalCount: number;
}

const BlogFilter: React.FC<BlogFilterProps> = ({
  activeCategory,
  activeSort,
  onCategoryChange,
  onSortChange,
  totalCount,
}) => (
  <div className="space-y-3">
    {/* Category pills */}
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onCategoryChange(key)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
            activeCategory === key
              ? "border-navy bg-navy text-white"
              : "border-border bg-white text-navy/70 hover:border-navy hover:text-navy"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>

    {/* Sort + count */}
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        {SORTS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onSortChange(key)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              activeSort === key
                ? "border-[color:var(--gold)] bg-[color:var(--gold-soft)] text-navy"
                : "border-border bg-white text-navy/50 hover:text-navy"
            }`}
          >
            <Icon className="h-3 w-3" />
            {label}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {totalCount} article{totalCount > 1 ? "s" : ""}
      </p>
    </div>
  </div>
);

export default BlogFilter;