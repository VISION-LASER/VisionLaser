import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowRight, Calendar, ExternalLink } from "lucide-react";
import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { useState } from "react";
import logo from "../../assets/vision-laser-logo.jpeg";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [mapLoaded, setMapLoaded] = useState(false);

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
    phone: "+33 7 59 50 71 84",
    email: "contact@vision-laser.eu",
  };

  // Nouveaux horaires d'ouverture - Version améliorée
  const openingHours = [
    { day: "Lundi", hours: "09:00 – 13:00", hours2: "14:00 – 18:30", isClosed: false },
    { day: "Mardi", hours: "09:30 – 16:30", hours2: null, isClosed: false },
    { day: "Mercredi", hours: "09:30 – 16:15", hours2: null, isClosed: false },
    { day: "Jeudi", hours: "09:00 – 16:30", hours2: null, isClosed: false },
    { day: "Vendredi", hours: "Fermé", hours2: null, isClosed: true },
    { day: "Samedi", hours: "Fermé", hours2: null, isClosed: true },
  ];

  const socialLinks = [
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
      url: "https://tiktok.com/@centre.vision.las",
      username: "@CentreVisionLaser",
      color: "#000000" 
    },
    { 
      name: "YouTube", 
      icon: FaYoutube, 
      url: "https://youtube.com/@Centrevisionlaser",
      username: "Vision Laser",
      color: "#FF0000" 
    },
  ];

  const MAPS_EMBED_URL = 
    "https://maps.google.com/maps?q=Polyclinique+du+Val+de+Sambre+162+Rte+de+Mons+59600+Maubeuge&output=embed&z=16&t=k";

  return (
    <footer className="relative mt-2 bg-linear-to-b from-white to-gray-50 border-t border-gray-100">
      
      <div className="container-page mx-auto pt-0 px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-4">
          
          {/* Colonne 1 - Logo & Description */}
          <div className="space-y-4">
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
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#0C2340", opacity: 0.7 }}>
              Centre ophtalmologique spécialisé dans la chirurgie réfractive au laser. <br />
              Une approche médicale, sobre et personnalisée pour chaque patient.
            </p>
            
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-[#C9A84C]/10 rounded-full">
                <span className="text-xs font-medium" style={{ color: "#C9A84C" }}>✓</span>
                <span className="text-xs" style={{ color: "#0C2340", opacity: 0.8 }}>Expertise reconnue</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-[#C9A84C]/10 rounded-full">
                <span className="text-xs font-medium" style={{ color: "#C9A84C" }}>✓</span>
                <span className="text-xs" style={{ color: "#0C2340", opacity: 0.8 }}>Équipements de pointe</span>
              </div>
            </div>

            <div className="pt-4">
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
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      {social.username}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div>
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

          {/* Colonne 3 - Contact & Horaires - AMÉLIORÉ */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "#0C2340" }}>
              <span className="w-1 h-4 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
              Contact & Horaires
            </h3>
            
            <div className="space-y-4">
              {/* Contact */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 group">
                  <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "#C9A84C" }} />
                  <div>
                    <p className="text-sm leading-relaxed" style={{ color: "#0C2340", opacity: 0.7 }}>
                      {contactInfo.address}
                    </p>
                    <a
                      href="https://www.google.com/maps/dir//Polyclinique+du+Val+de+Sambre,+162+Rte+de+Mons,+59600+Maubeuge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs mt-1 transition-colors hover:opacity-100"
                      style={{ color: "#C9A84C", opacity: 0.8 }}
                    >
                      Itinéraire <ExternalLink size={12} />
                    </a>
                  </div>
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
              </div>

              {/* Horaires d'ouverture - NOUVELLE DISPOSITION */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="shrink-0" style={{ color: "#C9A84C" }} />
                  <span className="text-sm font-medium" style={{ color: "#0C2340" }}>
                    Horaires d'ouverture
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium ml-auto">
                    En semaine
                  </span>
                </div>

                <div className="space-y-2">
                  {openingHours.map((item, index) => (
                    <div 
                      key={index} 
                      className={`
                        flex items-center justify-between p-1.5 rounded-lg transition-all duration-200
                        ${item.isClosed ? 'hover:bg-red-50' : 'hover:bg-gray-50'}
                      `}
                    >
                      <span 
                        className="text-xs font-medium"
                        style={{ 
                          color: item.isClosed ? "#EF4444" : "#0C2340",
                          opacity: item.isClosed ? 0.8 : 0.7
                        }}
                      >
                        {item.day}
                      </span>
                      
                      <div className="flex flex-col items-end gap-0.5">
                        {item.isClosed ? (
                          <span className="text-xs font-semibold text-red-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                            Fermé
                          </span>
                        ) : (
                          <>
                            <span className="text-xs font-medium" style={{ color: "#0C2340", opacity: 0.8 }}>
                              {item.hours}
                            </span>
                            {item.hours2 && (
                              <span className="text-[10px]" style={{ color: "#0C2340", opacity: 0.5 }}>
                                {item.hours2}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Badge d'information */}
                <div className="mt-3 flex items-center gap-1.5 p-2 bg-blue-50 rounded-lg border border-blue-100">
                  <Clock size={12} className="text-blue-500 shrink-0" />
                  <p className="text-[10px] leading-relaxed" style={{ color: "#0C2340", opacity: 0.6 }}>
                    Consultation sur rendez-vous uniquement
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne 4 - Carte Satellite */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "#0C2340" }}>
              <span className="w-1 h-4 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
              Nous trouver
            </h3>

            <div className="relative w-full overflow-hidden rounded-xl shadow-md" style={{ aspectRatio: "4/3" }}>
              {!mapLoaded && (
                <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center gap-3 border border-gray-200">
                  <MapPin className="h-8 w-8" style={{ color: "#C9A84C", opacity: 0.3 }} />
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                    Chargement…
                  </span>
                </div>
              )}

              <iframe
                title="Localisation Vision Laser - Maubeuge"
                src={MAPS_EMBED_URL}
                className={[
                  "absolute inset-0 w-full h-full border-0 transition-opacity duration-500",
                  mapLoaded ? "opacity-100" : "opacity-0",
                ].join(" ")}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
              />

              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none"
                style={{ background: "#C9A84C" }}
              />

              <a
                href="https://www.google.com/maps/dir//Polyclinique+du+Val+de+Sambre,+162+Rte+de+Mons,+59600+Maubeuge"
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "absolute bottom-4 right-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all duration-500 hover:scale-105",
                  "bg-white text-[#0C2340] hover:bg-[#C9A84C] hover:text-white shadow-md",
                  mapLoaded ? "opacity-100" : "opacity-0",
                ].join(" ")}
              >
                Itinéraire <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <p className="text-xs mt-3 flex items-center gap-1.5" style={{ color: "#0C2340", opacity: 0.5 }}>
              <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: "#C9A84C" }} />
              Maubeuge
            </p>
          </div>
        </div>

        {/* CTA rapide */}
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div 
            className="rounded-2xl p-2 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-300 hover:shadow-lg"
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
            © {currentYear} Centre Vision Laser. Tous droits réservés.
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;