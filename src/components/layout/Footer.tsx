import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowRight, Calendar } from "lucide-react";
import { FaYoutube, FaInstagram, FaTiktok, FaFacebook, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/vision-laser-logo.jpg";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "FemtoLASIK", path: "/femtolasik" },
    { name: "TPRK", path: "/tprk" },
    { name: "Équipements", path: "/equipements" },
    { name: "Tarifs", path: "/tarifs" },
    { name: "Défauts visuels", path: "/defauts-visuels" },
    { name: "Actualités", path: "/actu" },
  ];

  const contactInfo = {
    address: "Polyclinique du Val de Sambre, Rte de Mons 162, 59600 Maubeuge",
    phone: "+33 3 27 62 12 34",
    email: "contact@vision-laser.fr",
    hours: "Lun – Ven · 9h – 18h",
  };

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: FaFacebook, 
      url: "https://www.facebook.com/profile.php?id=100057042439718",
      username: "centre vision laser",
      color: "#1877F2" 
    },
    { 
      name: "Instagram", 
      icon: FaInstagram, 
      url: "https://instagram.com/centre_vision_laser",
      username: "centre_vision_laser",
      color: "#E4405F" 
    },
    { 
      name: "TikTok", 
      icon: FaTiktok, 
      url: "https://tiktok.com/@CentreVisionLaser",
      username: "@CentreVisionLaser",
      color: "#000000" 
    },
    { 
      name: "YouTube", 
      icon: FaYoutube, 
      url: "https://youtube.com/@visionlaser",
      username: "Vision Laser",
      color: "#FF0000" 
    },
    { 
      name: "LinkedIn", 
      icon: FaLinkedin, 
      url: "https://linkedin.com/company/vision-laser-hauts-de-france",
      username: "Vision Laser",
      color: "#0A66C2" 
    },
  ];

  return (
    <footer className="relative mt-24 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      {/* Décorations subtiles */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C9A84C] via-[#D4B86A] to-[#C9A84C]" />
      
      <div className="container-page mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Grille principale */}
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-12">
          
          {/* Colonne 1 - Logo & Description - 5 colonnes */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Vision Laser" 
                  width={48} 
                  height={48} 
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[#C9A84C]/20"
                />
              </div>
              <div>
                <span className="text-lg font-bold block" style={{ color: "#0C2340" }}>
                  Vision Laser
                </span>
                <span className="text-xs" style={{ color: "#C9A84C" }}>
                  Hauts-de-France
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#0C2340", opacity: 0.7 }}>
              Centre ophtalmologique spécialisé dans la chirurgie réfractive au laser. 
              Une approche médicale, sobre et personnalisée pour chaque patient.
            </p>
            {/* Badge de confiance */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-[#C9A84C]/10 rounded-full">
                <span className="text-xs font-medium" style={{ color: "#C9A84C" }}>✓</span>
                <span className="text-xs" style={{ color: "#0C2340", opacity: 0.8 }}>Expertise reconnue</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-[#C9A84C]/10 rounded-full">
                <span className="text-xs font-medium" style={{ color: "#C9A84C" }}>✓</span>
                <span className="text-xs" style={{ color: "#0C2340", opacity: 0.8 }}>Équipements de pointe</span>
              </div>
            </div>
          </div>

          {/* Colonne 2 - Liens rapides - 3 colonnes */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "#0C2340" }}>
              <span className="w-1 h-4 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
              Liens rapides
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="group flex items-center gap-2 text-sm transition-all duration-200 hover:translate-x-1"
                    style={{ color: "#0C2340", opacity: 0.7 }}
                  >
                    <ArrowRight size={12} className="transition-all duration-200 group-hover:translate-x-0.5" style={{ color: "#C9A84C" }} />
                    <span className="group-hover:opacity-100">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Contact & Horaires - 4 colonnes */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "#0C2340" }}>
              <span className="w-1 h-4 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
              Contact & Horaires
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 group">
                <MapPin size={16} className="mt-0.5 shrink-0 transition-colors" style={{ color: "#C9A84C" }} />
                <p className="text-sm leading-relaxed" style={{ color: "#0C2340", opacity: 0.7 }}>
                  {contactInfo.address}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" style={{ color: "#C9A84C" }} />
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-sm transition-colors hover:opacity-100"
                  style={{ color: "#0C2340", opacity: 0.7 }}
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="shrink-0" style={{ color: "#C9A84C" }} />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm transition-colors hover:opacity-100"
                  style={{ color: "#0C2340", opacity: 0.7 }}
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="shrink-0" style={{ color: "#C9A84C" }} />
                <p className="text-sm" style={{ color: "#0C2340", opacity: 0.7 }}>
                  {contactInfo.hours}
                </p>
              </div>
            </div>

            {/* Réseaux sociaux - Placés juste après les horaires */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#0C2340", opacity: 0.6 }}>
                Suivez-nous
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative transition-all duration-300 hover:scale-110"
                    aria-label={`Suivez-nous sur ${social.name}`}
                  >
                    <div 
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-md"
                      style={{ 
                        backgroundColor: `${social.color}15`,
                        border: `1px solid ${social.color}30`
                      }}
                    >
                      <social.icon 
                        size={18} 
                        className="transition-all duration-300"
                        style={{ color: social.color }}
                      />
                    </div>
                    {/* Tooltip avec le nom d'utilisateur */}
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      {social.username}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA rapide */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <div 
            className="rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "#F9FAFB" }}
          >
            <div className="text-center md:text-left">
              <p className="text-sm font-semibold mb-1" style={{ color: "#0C2340" }}>
                Prêt à améliorer votre vision ?
              </p>
              <p className="text-xs" style={{ color: "#0C2340", opacity: 0.6 }}>
                Prenez rendez-vous pour un bilan personnalisé
              </p>
            </div>
            <Link
              to="/contact"
              className="group flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-md"
              style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
            >
              <Calendar size={16} />
              <span>Prendre rendez-vous</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <p className="text-xs" style={{ color: "#0C2340", opacity: 0.5 }}>
            © {currentYear} Centre Vision Laser des Hauts-de-France. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="text-xs transition-colors hover:opacity-100" style={{ color: "#0C2340", opacity: 0.5 }}>
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite" className="text-xs transition-colors hover:opacity-100" style={{ color: "#0C2340", opacity: 0.5 }}>
              Politique de confidentialité
            </Link>
            <Link to="/cgv" className="text-xs transition-colors hover:opacity-100" style={{ color: "#0C2340", opacity: 0.5 }}>
              CGV
            </Link>
          </div>
          <p className="text-xs" style={{ color: "#0C2340", opacity: 0.4 }}>
            Informations médicales validées par le Dr. Anthony Sion
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;