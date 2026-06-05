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

import type { Step, FaqItem, Testimonial, Pillar, EquipmentItem, PriceRow, TrustBadge, ContactInfo, ActualitePost } from "../types/types";

import laser from "../assets/laser-equipment.jpg";
import clinic from "../assets/Acceuil-vision-laser.png";
import surgeon from "../assets/surgeon.png";

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
    rating: 5,
    text: "Une équipe à l'écoute, pédagogue, qui a pris le temps de tout m'expliquer avant l'intervention.",
    videoUrl: "https://www.tiktok.com/@centre.vision.las/video/7433439898901761313?is_from_webapp=1&sender_device=pc"
  },
  {
    name: "Marc D.",
    age: "42 ans",
    rating: 5,
    text: "Bilan rigoureux, ambiance médicale rassurante. J'ai eu réponse à toutes mes questions, sans pression commerciale.",
    videoUrl: "https://www.tiktok.com/@centre.vision.las/video/7632356756890357025?is_from_webapp=1&sender_device=pc"
  },
  {
    name: "Emma T.",
    age: "24 ans",
    rating: 5,
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
      "Le Dr. Anthony Sion et son équipe vous suivent du premier bilan jusqu'aux contrôles post-opératoires.",
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
  "Dr. Anthony Sion",
  "FemtoLASIK",
  "TPRK",
  "Bilan",
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
    id: "laser-femtoseconde",
    category: "laser",
    name: "Laser femtoseconde",
    description:
      "Précision micrométrique pour la création des volets cornéens en FemtoLASIK.",
    image: laser,
    imageAlt: "Laser femtoseconde",
  },

  {
    id: "laser-excimer",
    category: "laser",
    name: "Laser excimer",
    description:
      "Remodelage de la cornée guidé par cartographie, sur les deux techniques chirurgicales.",
    image: clinic,
    imageAlt: "Laser excimer",
  },

  {
    id: "plateau-diagnostique",
    category: "diagnostic",
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

export const ACTUALITES: ActualitePost[] = [
  // ── Blog posts ──────────────────────────────────────────────────────────
  {
    id: "blog-1",
    type: "blog",
    platform: "blog",
    category: "chirurgie-refractive",
    title: "FemtoLASIK ou TPRK : comment le Dr. Anthony Sion choisit la technique adaptée",
    excerpt:
      "Deux patients, deux profils cornéens différents, deux techniques. Voici comment l'indication est posée sur des critères médicaux objectifs.",
    content: `La question revient souvent en consultation : « Docteur, quelle technique me recommandez-vous ? »

La réponse honnête est que ce n'est pas une question de préférence — ni du patient, ni du chirurgien. C'est une question de profil cornéen.

**Les critères décisifs**

Épaisseur cornéenne, topographie, mode de vie, antécédents ophtalmologiques : chaque paramètre pèse dans la balance. Une cornée fine ou irrégulière orientera vers la TPRK. Une cornée d'épaisseur standard, sans contre-indication, permet généralement d'envisager le FemtoLASIK.

**Ce que le bilan révèle**

Le bilan préopératoire, entièrement gratuit dans notre centre, comprend une topographie cornéenne, une pachymétrie et une analyse aberrométrique. Ces examens objectifs sont la seule boussole fiable.

Aucune décision n'est prise avant d'avoir l'ensemble de ces données.`,
    date: "2025-06-10T09:00:00Z",
    likes: 24,
    likedByUser: false,
    tags: ["FemtoLASIK", "TPRK", "Conseil médical"],
    author: { name: "Dr. Anthony Sion", role: "Chirurgien ophtalmologue" },
    comments: [
      {
        id: "c1",
        author: "Marie P.",
        text: "Merci pour ces explications très claires. J'avais justement cette question avant mon bilan.",
        date: "2025-06-11T14:22:00Z",
        likes: 5,
        likedByUser: false,
      },
      {
        id: "c2",
        author: "Thomas R.",
        text: "Article très utile ! Est-ce que l'astigmatisme change le choix de technique ?",
        date: "2025-06-12T08:45:00Z",
        likes: 3,
        likedByUser: false,
      },
    ],
  },
  // ── TikTok videos ────────────────────────────────────────────────────────
  {
    id: "tiktok-1",
    type: "video",
    platform: "tiktok",
    title: "L'opération FemtoLASIK en 60 secondes",
    description:
      "Du laser femtoseconde au laser excimer : on vous montre les 4 étapes de l'intervention.",
    videoId: "7000000000000000001",
    videoUrl: "https://www.tiktok.com/@visionlaser/video/7000000000000000001",
    date: "2025-06-08T18:00:00Z",
    likes: 312,
    views: 4800,
    tags: ["FemtoLASIK", "Chirurgie", "Vidéo"],
  },
  {
    id: "tiktok-2",
    type: "video",
    platform: "tiktok",
    title: "Myopie : comment ça se corrige ?",
    description:
      "Explication simple de la correction de la myopie par laser excimer.",
    videoId: "7000000000000000002",
    videoUrl: "https://www.tiktok.com/@visionlaser/video/7000000000000000002",
    date: "2025-05-30T17:00:00Z",
    likes: 198,
    views: 3100,
    tags: ["Myopie", "Pédagogie", "Vidéo"],
  },
  // ── YouTube videos ───────────────────────────────────────────────────────
  {
    id: "yt-1",
    type: "video",
    platform: "youtube",
    title: "Visite du plateau technique — Laser AMARIS 1050 RS",
    description:
      "Le Dr. Anthony Sion vous présente le laser AMARIS 1050 RS et son plateau technique de chirurgie réfractive.",
    videoId: "dQw4w9WgXcQ",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    date: "2025-05-20T10:00:00Z",
    likes: 87,
    views: 1250,
    tags: ["Équipements", "Visite", "YouTube"],
  },
  // ── Facebook videos ──────────────────────────────────────────────────────
  {
    id: "fb-1",
    type: "video",
    platform: "facebook",
    title: "Témoignage : Sophie retrouve une vision nette",
    description:
      "Sophie, 28 ans, nous raconte son expérience 3 mois après son intervention FemtoLASIK.",
    videoId: "123456789012345",
    videoUrl: "https://www.facebook.com/watch/?v=123456789012345",
    date: "2025-06-01T15:00:00Z",
    likes: 145,
    views: 2300,
    tags: ["Témoignage", "FemtoLASIK", "Facebook"],
  },
  // ── Second blog post ─────────────────────────────────────────────────────
  {
    id: "blog-2",
    type: "blog",
    platform: "blog",
    category: "defauts-visuels",
    title: "Presbytie et chirurgie laser : ce qu'il faut savoir avant 50 ans",
    excerpt:
      "La presbytie est-elle opérable au laser ? Quelles sont les limites réelles ? Le point complet par le Dr. Anthony Sion.",
    content: `La presbytie touche quasiment tout le monde à partir de 45 ans. Et la question arrive souvent : « Peut-on se faire opérer du laser pour ne plus porter de lunettes de lecture ? »

La réponse est nuancée.

**Ce que la chirurgie laser peut corriger**

Le laser excimer remodèle la cornée pour corriger les amétropies statiques : myopie, hypermétropie, astigmatisme. Ces corrections sont stables dans le temps.

**La presbytie est différente**

La presbytie résulte d'une perte d'élasticité du cristallin — une structure interne de l'œil, pas la cornée. Agir sur la cornée ne résout pas le problème à la source.

**Les options existantes**

Certaines techniques de monovision (corriger un œil de loin et l'autre de près) permettent de réduire la dépendance aux lunettes de lecture. Elles ne conviennent pas à tous les profils et nécessitent une adaptation.

Un bilan complet reste la seule façon d'évaluer ce qui est réellement envisageable pour votre situation.`,
    date: "2025-05-15T09:00:00Z",
    likes: 31,
    likedByUser: false,
    tags: ["Presbytie", "Conseil médical", "50 ans"],
    author: { name: "Dr. Anthony Sion", role: "Chirurgien ophtalmologue" },
    comments: [
      {
        id: "c3",
        author: "Françoise M.",
        text: "Enfin un article honnête sur la presbytie ! Beaucoup de sites promettent des miracles.",
        date: "2025-05-16T11:00:00Z",
        likes: 8,
        likedByUser: false,
      },
    ],
  },
  // ── TikTok 3 ─────────────────────────────────────────────────────────────
  {
    id: "tiktok-3",
    type: "video",
    platform: "tiktok",
    title: "J-1 avant l'opération : comment se préparer ?",
    description:
      "Les recommandations pré-opératoires expliquées simplement : ce qu'on peut faire, ce qu'il vaut mieux éviter.",
    videoId: "7000000000000000003",
    videoUrl: "https://www.tiktok.com/@visionlaser/video/7000000000000000003",
    date: "2025-04-28T19:00:00Z",
    likes: 276,
    views: 5100,
    tags: ["Pré-opératoire", "Conseils", "Vidéo"],
  },

];

export const DEFECTS = [
  {
    id: "myopie",
    category: "Défauts visuels",
    name: "Myopie",
    shortDescription:
      "Vision floue de loin due à un œil trop long.",
    content: `
La myopie est un trouble visuel fréquent provoquant une vision floue de loin.
Les objets proches restent nets tandis que les objets éloignés deviennent flous.

La chirurgie réfractive au laser permet souvent de corriger efficacement la myopie.
    `,
  },

  {
    id: "astigmatisme",
    category: "Défauts visuels",
    name: "Astigmatisme",
    shortDescription:
      "Vision déformée causée par une irrégularité de la cornée.",
    content: `
L’astigmatisme entraîne une vision floue ou déformée à toutes les distances.

Il est souvent associé à la myopie ou à l’hypermétropie.
Le traitement laser permet de régulariser la courbure cornéenne.
    `,
  },

  {
    id: "presbytie",
    category: "Défauts visuels",
    name: "Presbytie",
    shortDescription:
      "Difficulté progressive à voir de près avec l’âge.",
    content: `
La presbytie apparaît généralement après 40 ans.

Elle correspond à une perte progressive de la capacité d’accommodation du cristallin.
    `,
  },

  {
    id: "hypermetropie",
    category: "Défauts visuels",
    name: "Hypermétropie",
    shortDescription:
      "Vision difficile de près liée à un œil trop court.",
    content: `
L’hypermétropie provoque une fatigue visuelle importante.

La correction laser peut améliorer la vision de près et de loin.
    `,
  },

  {
    id: "types-lentilles",
    category: "Lentilles",
    name: "Différents types de lentilles",
    shortDescription:
      "Comprendre les différents types de lentilles de contact.",
    content: `
Il existe plusieurs types de lentilles :
- souples
- rigides
- journalières
- mensuelles

Le choix dépend du profil visuel et du confort recherché.
    `,
  },

  {
    id: "prescription-lentilles",
    category: "Lentilles",
    name: "Prescription et prise en charge",
    shortDescription:
      "Informations sur l’ordonnance et le remboursement.",
    content: `
Les lentilles nécessitent une prescription médicale.

Certaines corrections peuvent être prises en charge selon votre contrat mutuelle.
    `,
  },

  {
    id: "manipulation-lentilles",
    category: "Lentilles",
    name: "Manipulation des lentilles",
    shortDescription:
      "Conseils pour poser et retirer correctement ses lentilles.",
    content: `
Une bonne hygiène est indispensable pour éviter les infections.

Toujours laver les mains avant manipulation.
    `,
  },
];