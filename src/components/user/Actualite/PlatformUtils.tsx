import type { VideoPost } from "../../../types/types";

export function buildEmbedUrl(post: VideoPost): string {
  switch (post.platform) {
    case "tiktok":
      return `https://www.tiktok.com/embed/v2/${post.videoId}`;
    case "youtube":
      return `https://www.youtube.com/embed/${post.videoId}?autoplay=1&rel=0`;
    case "facebook":
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        post.videoUrl
      )}&show_text=false&autoplay=true`;
  }
}

export function relativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Aujourd'hui";
  if (days === 1) return "Hier";
  if (days < 7) return `Il y a ${days} jours`;
  if (days < 30) return `Il y a ${Math.floor(days / 7)} semaines`;
  if (days < 365) return `Il y a ${Math.floor(days / 30)} mois`;
  return `Il y a ${Math.floor(days / 365)} ans`;
}

export function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}