import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/vision-laser-logo.jpg";

const NAV = [
  { to: "/femtolasik", label: "FemtoLASIK" },
  { to: "/tprk", label: "TPRK" },
  { to: "/equipements", label: "Équipements" },
  { to: "/tarifs", label: "Tarifs" },
  { to: "/defauts-visuels", label: "Défauts visuels" },
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
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-white/85 shadow-[0_8px_30px_-20px_rgba(12,35,64,0.25)] backdrop-blur"
          : "border-b border-transparent bg-white/60 backdrop-blur"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Vision Laser Hauts-de-France"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover ring-1 ring-border transition-transform group-hover:scale-[1.04]"
          />
          <span className="hidden text-sm font-medium tracking-wide text-navy sm:block">
            Vision Laser <span className="text-muted-foreground">· Hauts-de-France</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `nav-link relative text-sm transition-colors hover:text-navy ${
                  isActive ? "is-active text-navy font-medium" : "text-navy/75"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link to="/contact" className="btn-gold !py-2.5 !px-5 text-sm">Bilan visuel gratuit</Link>
        </div>
        <button
          className="md:hidden rounded-full border border-border p-2 text-navy"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-white md:hidden">
          <div className="container-page flex flex-col py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-navy"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-3">
              Bilan visuel gratuit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
