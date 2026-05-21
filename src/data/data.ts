import {
  ScanEye,
  Microscope,
  Activity,
  Sun,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  HeartHandshake,
  Zap,
  Eye,
  MapPin,
  Clock,
  Mail,
} from "lucide-react";

import type { Step, FaqItem, Testimonial, Pillar, EquipmentItem, PriceRow, TrustBadge, VisualDefect, ContactInfo } from "../types/types";

import laser from "../assets/laser-equipment.jpg";
import clinic from "../assets/clinic-interior.jpg";
import surgeon from "../assets/surgeon.jpg";

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
    videoUrl: "https://www.tiktok.com/@centre.vision.las/video/7433439898901761313?is_from_webapp=1&sender_device=pc"
  },
  {
    name: "Marc D.",
    age: "42 ans",
    text: "Bilan rigoureux, ambiance médicale rassurante. J'ai eu réponse à toutes mes questions, sans pression commerciale.",
    videoUrl: "https://www.tiktok.com/@centre.vision.las/video/7632356756890357025?is_from_webapp=1&sender_device=pc"
  },
  {
    name: "Emma T.",
    age: "24 ans",
    text: "Je recommande pour la clarté des explications. On comprend exactement comment ça marche et ce qui est possible.",
    videoUrl: "https://www.tiktok.com/@centre.vision.las/video/7567424386215513376?is_from_webapp=1&sender_device=pc"

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

export const FEMTO_BENEFITS: string[] = [
  "Indolore, sous gouttes anesthésiantes",
  "Récupération visuelle généralement en 24 à 48 h",
  "Précision micrométrique du laser femtoseconde",
  "Suivi post-opératoire programmé",
];

export const TPRK_BENEFITS: string[] = [
  "Sans découpe cornéenne",
  "Adaptée à certaines cornées fines",
  "Récupération visuelle progressive sur quelques jours",
  "Suivi rapproché post-opératoire",
];

export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    name: "Laser femtoseconde",
    description:
      "Précision micrométrique pour la création des volets cornéens en FemtoLASIK.",
    image: laser,
    imageAlt: "Laser femtoseconde",
  },
  {
    name: "Laser excimer",
    description:
      "Remodelage de la cornée guidé par cartographie, sur les deux techniques chirurgicales.",
    image: clinic,
    imageAlt: "Laser excimer",
  },
  {
    name: "Plateau diagnostique",
    description:
      "Topographie cornéenne, pachymétrie, aberrométrie et examens complets avant toute décision.",
    image: surgeon,
    imageAlt: "Plateau diagnostique",
  },
];

export const PRICES: PriceRow[] = [
  {
    name: "Bilan visuel pré-opératoire",
    price: "Gratuit",
    note: "Sur rendez-vous, sans engagement",
  },
  {
    name: "FemtoLASIK",
    price: "Sur devis",
    note: "Tarif communiqué après bilan médical complet",
  },
  {
    name: "TPRK",
    price: "Sur devis",
    note: "Tarif communiqué après bilan médical complet",
  },
  {
    name: "Consultation de contrôle",
    price: "Incluse",
    note: "Suivi post-opératoire programmé",
  },
];

export const FEMTO_STEPS: Step[] = [
  {
    icon: ScanEye,
    title: "Préparation",
    description: "Examen, anesthésie par gouttes.",
  },
  {
    icon: Zap,
    title: "Femtolaser",
    description: "Création d'un volet cornéen ultra-fin.",
  },
  {
    icon: Eye,
    title: "Laser excimer",
    description: "Remodelage de la cornée selon ta correction.",
  },
  {
    icon: Sun,
    title: "Récupération",
    description: "Vision qui s'éclaircit en quelques heures.",
  },
];

export const TRUST_BADGES: TrustBadge[] = [
  { title: "Médical", subtitle: "Pas de vente" },
  { title: "Mini-invasif", subtitle: "Sans contact" },
  { title: "Personnalisé", subtitle: "Bilan adapté" },
];

export const DEFECTS: VisualDefect[] = [
  {
    name: "Myopie",
    description:
      "Vision floue de loin. La cornée focalise les images en avant de la rétine.",
  },
  {
    name: "Hypermétropie",
    description:
      "Vision floue de près. Les images se forment en arrière de la rétine.",
  },
  {
    name: "Astigmatisme",
    description:
      "Vision déformée à toutes les distances, liée à une courbure cornéenne irrégulière.",
  },
  {
    name: "Presbytie",
    description:
      "Difficulté progressive de mise au point de près, liée à l'âge.",
  },
];

export const CONTACT_INFOS: ContactInfo[] = [
  {
    icon: MapPin,
    title: "Centre Vision Laser",
    lines: ["Hauts-de-France"],
  },
  {
    icon: Clock,
    title: "Horaires",
    lines: ["Lundi – Vendredi", "9h00 – 18h00"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["contact@vision-laser.fr"],
  },
];