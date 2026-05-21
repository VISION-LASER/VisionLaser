import {
  ScanEye,
  Microscope,
  Activity,
  Sun,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import type { Step, FaqItem, Testimonial, Pillar } from "../types/types";

export const STEPS: Step[] = [
  {
    icon: ScanEye,
    title: "Bilan complet",
    description:
      "Examens objectifs de la cornée et de la vision pour évaluer l'indication.",
  },
  {
    icon: Microscope,
    title: "Choix de la technique",
    description:
      "FemtoLASIK ou TPRK : la décision repose uniquement sur des critères médicaux.",
  },
  {
    icon: Activity,
    title: "Intervention au laser",
    description:
      "Quelques minutes par œil, sous gouttes anesthésiantes, en ambulatoire.",
  },
  {
    icon: Sun,
    title: "Récupération suivie",
    description:
      "Contrôles post-opératoires programmés jusqu'à stabilisation de la vision.",
  },
];

export const FAQ: FaqItem[] = [
  {
    q: "La chirurgie laser est-elle douloureuse ?",
    a:
      "L'intervention se déroule sous gouttes anesthésiantes : elle est indolore. Une gêne légère peut être ressentie quelques heures après l'opération, selon la technique.",
  },
  {
    q: "Combien de temps dure une intervention ?",
    a:
      "L'acte laser dure quelques minutes par œil. La présence au centre, examens compris, est généralement de moins d'une heure.",
  },
  {
    q: "Quand puis-je reprendre mon activité ?",
    a:
      "Avec le FemtoLASIK, la reprise est généralement possible en 24 à 48 h. La TPRK demande une récupération plus progressive sur quelques jours.",
  },
  {
    q: "Tout le monde peut-il être opéré ?",
    a:
      "Non. L'éligibilité dépend de critères précis (épaisseur cornéenne, stabilité de la correction, antécédents). Seul un bilan médical complet permet de répondre.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sophie L.",
    age: "28 ans",
    text: "Une équipe à l'écoute, pédagogue, qui a pris le temps de tout m'expliquer avant l'intervention.",
  },
  {
    name: "Marc D.",
    age: "42 ans",
    text: "Bilan rigoureux, ambiance médicale rassurante. J'ai eu réponse à toutes mes questions, sans pression commerciale.",
  },
  {
    name: "Emma T.",
    age: "24 ans",
    text: "Je recommande pour la clarté des explications. On comprend exactement comment ça marche et ce qui est possible.",
  },
];

export const PILLARS: Pillar[] = [
  {
    icon: ShieldCheck,
    title: "Sécurité avant tout",
    description:
      "Indications posées sur des examens objectifs. Aucune chirurgie sans validation médicale complète.",
  },
  {
    icon: Stethoscope,
    title: "Suivi personnalisé",
    description:
      "Le Dr. Chemla et son équipe vous suivent du premier bilan jusqu'aux contrôles post-opératoires.",
  },
  {
    icon: Sparkles,
    title: "Technologies de pointe",
    description:
      "Plateaux techniques renouvelés régulièrement pour offrir des techniques mini-invasives et précises.",
  },
];

export const CTA_BENEFITS = [
  { icon: HeartHandshake, text: "Sans engagement, sans pression commerciale" },
  { icon: ShieldCheck, text: "Données protégées, aucun transfert à des tiers" },
];

export const MARQUEE_ITEMS = [
  "AMARIS 1050 RS",
  "Schwind",
  "Dr. Chemla",
  "FemtoLASIK",
  "TPRK",
  "Bilan gratuit",
  "Suivi post-opératoire",
  "Hauts-de-France",
];