import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/vision-laser-logo.jpg";

const TiktokHeaderSection: React.FC = () => (
  <header className="sticky top-0 z-30 border-b border-border bg-white/90 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-md items-center justify-between px-5">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="Vision Laser"
          width={36}
          height={36}
          className="h-9 w-9 rounded-full object-cover"
        />
        <span className="text-xs font-medium text-navy">Vision Laser</span>
      </Link>
      <a href="#form" className="text-xs font-medium text-[color:var(--gold)]">
        Bilan gratuit
      </a>
    </div>
  </header>
);

export default TiktokHeaderSection;