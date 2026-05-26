import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/vision-laser-logo.jpg";
import { TopBar } from "./TopBar";

const NAV = [
  { to: "/femtolasik", label: "FEMTOLASIK" },
  { to: "/tprk", label: "TPRK" },
  { to: "/equipements", label: "EQUIPEMENTS" },
  { to: "/tarifs", label: "TARIFS" },
  { to: "/defauts-visuels", label: "DEFAUTS VISUELS" },
  { to: "/blog", label: "BLOG" },
  { to: "/actu", label: "ACTUALITÉS" },
  { to: "/contact", label: "CONTACT" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* TopBar */}
      <TopBar />

      {/* Main Header */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-white/95 shadow-[0_8px_30px_-20px_rgba(12,35,64,0.25)] backdrop-blur-sm"
            : "border-b border-border/50 bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container-page flex h-20 items-center justify-between">
          <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <img
              src={logo}
              alt="Vision Laser Hauts-de-France"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover ring-1 ring-gold/20 transition-all duration-300 group-hover:scale-[1.04] group-hover:ring-gold/50"
            />
            <span className="hidden text-sm font-semibold tracking-tight text-navy sm:block">
              VISION-LASER <br /><span className="font-normal text-muted-foreground">HAUTS-DE-FRANCE</span>
            </span>
          </Link>
          
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `nav-link relative text-sm font-medium transition-colors duration-200 hover:text-navy ${
                    isActive ? "is-active text-navy" : "text-navy/70 hover:text-navy"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          
          <div className="hidden md:block">
            <Link 
              to="https://www.doctolib.fr/centre-d-ophtalmologie/maubeuge/laser-vision/booking/motives?specialityId=4&telehealth=false&placeId=practice-610316&profile_skipped=true&source=external_referral" 
              className="btn-gold py-2.5 px-6 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300"
            >
              PRENDRE RENDEZ-VOUS
            </Link>
          </div>
          
          <button
            className="md:hidden rounded-full border border-border bg-white/50 p-2 text-navy backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {open && (
          <div className="border-t border-border bg-white md:hidden animate-fade-in">
            <div className="container-page flex flex-col py-4">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-medium text-navy transition-colors hover:text-gold border-b border-border/50 last:border-0"
                >
                  {n.label}
                </Link>
              ))}
              <Link 
                to="https://www.doctolib.fr/centre-d-ophtalmologie/maubeuge/laser-vision/booking/motives?specialityId=4&telehealth=false&placeId=practice-610316&profile_skipped=true&source=external_referral" 
                onClick={() => setOpen(false)} 
                className="btn-gold mt-4 text-center"
              >
                PRENDRE RENDEZ-VOUS
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}