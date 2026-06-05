export interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Testimonial {
  name: string;
  age: string;
  rating: number;
  text: string;
  videoUrl?: string;
}

export interface Pillar {
  icon: React.ElementType;
  title: string;
  description: string;
}


export interface PriceRow {
  name: string;
  price: string;
  note: string;
}

export interface TrustBadge {
  title: string;
  subtitle: string;
}

export interface VisualDefect {
  name: string;
  description: string;
}

export interface ContactInfo {
  icon: React.ElementType;
  title: string;
  lines: string[];
}

export type TechKey = "femto" | "tprk";

export type Platform = "tiktok" | "youtube" | "facebook" | "blog";
export type FilterType = "all" | "recent" | "popular" | "video" | "blog";

export interface VideoPost {
  id: string;
  type: "video";
  platform: "tiktok" | "youtube" | "facebook";
  title: string;
  description: string;
  videoId: string;        // ID de la vidéo sur la plateforme
  videoUrl: string;       // URL originale
  thumbnail?: string;     // URL miniature (optionnel)
  date: string;           // ISO date string
  likes: number;
  views?: number;
  tags: string[];
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  date: string;
  likes: number;
  likedByUser: boolean;
}

export interface BlogPost {
  id: string;
  type: "blog";
  platform: "blog";
  category: BlogCategory;
  title: string;
  excerpt: string;
  content: string;        // Contenu complet en markdown/texte
  coverImage?: string;
  date: string;
  likes: number;
  likedByUser: boolean;
  comments: Comment[];
  tags: string[];
  author: {
    name: string;
    role: string;
  };
}

export type ActualitePost = VideoPost | BlogPost;

export interface AnalyticsEvent {
  visitor_id: string;
  page: string;
  browser: string;
  device: string;
  language: string;
  timezone: string;
  created_at: string;
}

export type CookieConsent = "accepted" | "refused" | null;

export type BlogCategory =
  | "all"
  | "defauts-visuels"
  | "maladies-frequentes"
  | "ressources-patients"
  | "chirurgie-refractive";


  export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  category: "laser" | "diagnostic";
}