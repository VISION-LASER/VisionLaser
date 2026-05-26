import { useState, useMemo } from "react";
import type { VideoPost } from "../types/types";
import { ACTUALITES } from "../data/data";

type VideoFilterType = "all" | "recent" | "popular" | "tiktok" | "youtube" | "facebook";

export function useVideos() {
  const allVideos = ACTUALITES.filter((p) => p.type === "video") as VideoPost[];
  const [posts] = useState<VideoPost[]>(allVideos);
  const [filter, setFilter] = useState<VideoFilterType>("all");

  const filtered = useMemo(() => {
    let list = [...posts];

    if (filter === "recent") {
      list = [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (filter === "popular") {
      list = [...list].sort((a, b) => b.likes - a.likes);
    } else if (filter === "tiktok" || filter === "youtube" || filter === "facebook") {
      list = list.filter((p) => p.platform === filter);
    }

    return list;
  }, [posts, filter]);

  return { posts: filtered, filter, setFilter };
}