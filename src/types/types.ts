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

export type TechKey = "femto" | "tprk";