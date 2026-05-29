import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/vision-laser-logo.jpg";
import { TopBar } from "./TopBar";
import BookingModal from "../user/Booking/BookingModal";

const NAV = [
  { to: "/femtolasik",      label: "FEMTOLASIK" },
  { to: "/tprk",            label: "TPRK" },
  { to: "/equipements",     label: "ÉQUIPEMENTS" },
  { to: "/tarifs",          label: "TARIFS" },
  { to: "/defauts-visuels", label: "DÉFAUTS VISUELS" },
  // { to: "/blog",            label: "BLOG" },
  { to: "/actu",            label: "ACTUALITÉS" },
  // { to: "/contact",         label: "CONTACT" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40">
        {/*<TopBar />*/}

        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "border-b border-border bg-white/95 shadow-[0_8px_30px_-20px_rgba(12,35,64,0.25)] backdrop-blur-sm"
              : "border-b border-border/50 bg-white/90 backdrop-blur-sm"
          }`}
        >
          <div className="container-page flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center gap-3"
              onClick={() => setOpen(false)}
            >
              <img
                src={logo}
                alt="Vision Laser Hauts-de-France"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover ring-1 ring-gold/20 transition-all duration-300 group-hover:scale-[1.04] group-hover:ring-gold/50"
              />
              <span className="hidden text-xs font-semibold tracking-tight text-navy sm:block">
                VISION-LASER{" "}
                <br />
                <span className="font-normal text-muted-foreground text-[11px]">
                  HAUTS-DE-FRANCE
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `nav-link relative text-xs font-medium transition-colors duration-200 hover:text-navy ${
                      isActive ? "is-active text-navy" : "text-navy/70 hover:text-navy"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA — ouvre la modale */}
            <div className="hidden md:block">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="btn-gold py-2.5 px-6 text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-300"
              >
                PRENDRE RENDEZ-VOUS
              </button>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden rounded-full border border-border bg-white/50 p-2 text-navy backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="border-t border-border bg-white md:hidden">
              <div className="container-page flex flex-col py-4">
                {NAV.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="border-b border-border/50 py-3 text-sm font-medium text-navy transition-colors last:border-0 hover:text-gold"
                  >
                    {n.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => { setOpen(false); setBookingOpen(true); }}
                  className="btn-gold mt-4 text-center text-sm"
                >
                  PRENDRE RENDEZ-VOUS
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Booking modal — monté en dehors du header pour éviter le z-index */}
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}