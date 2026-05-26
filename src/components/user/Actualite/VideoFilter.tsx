import React from "react";
import { LayoutGrid, Clock, Flame } from "lucide-react";

type VideoFilterType = "all" | "recent" | "popular" | "tiktok" | "youtube" | "facebook";

interface FilterOption {
  key: VideoFilterType;
  label: string;
  icon?: React.ElementType;
  color?: string;
}

const OPTIONS: FilterOption[] = [
  { key: "all",      label: "Tout",      icon: LayoutGrid },
  { key: "recent",   label: "Récent",    icon: Clock },
  { key: "popular",  label: "Populaire", icon: Flame },
  { key: "tiktok",   label: "TikTok",   color: "bg-black text-white" },
  { key: "youtube",  label: "YouTube",  color: "bg-red-600 text-white" },
  { key: "facebook", label: "Facebook", color: "bg-blue-600 text-white" },
];

interface VideoFilterProps {
  active: VideoFilterType;
  onChange: (f: VideoFilterType) => void;
}

const VideoFilter: React.FC<VideoFilterProps> = ({ active, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {OPTIONS.map(({ key, label, icon: Icon, color }) => {
      const isActive = active === key;
      const isPlatform = !!color;

      if (isPlatform) {
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? `${color} border-transparent shadow-sm`
                : "border-border bg-white text-navy/70 hover:border-navy hover:text-navy"
            }`}
          >
            {label}
          </button>
        );
      }

      return (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
            isActive
              ? "border-navy bg-navy text-white"
              : "border-border bg-white text-navy/70 hover:border-navy hover:text-navy"
          }`}
        >
          {Icon && <Icon className="h-3.5 w-3.5" />}
          {label}
        </button>
      );
    })}
  </div>
);

export default VideoFilter;