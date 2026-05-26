import React from "react";
import type { VideoPost } from "../../../types/types";

const PLATFORM_CONFIG = {
  tiktok: {
    label: "TikTok",
    bg: "bg-black",
    text: "text-white",
  },
  youtube: {
    label: "YouTube",
    bg: "bg-red-600",
    text: "text-white",
  },
  facebook: {
    label: "Facebook",
    bg: "bg-blue-600",
    text: "text-white",
  },
} as const;

interface PlatformBadgeProps {
  platform: VideoPost["platform"];
}

const PlatformBadge: React.FC<PlatformBadgeProps> = ({ platform }) => {
  const cfg = PLATFORM_CONFIG[platform];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${cfg.bg} ${cfg.text}`}
    >
      {cfg.label}
    </span>
  );
};

export default PlatformBadge;