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
  text: string;
}

export interface Pillar {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface EquipmentItem {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
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