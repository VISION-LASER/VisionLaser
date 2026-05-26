import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    let scrolled = false;
    const onScroll = () => {
      scrolled = window.scrollY > 400;
      const footerVisible = footer
        ? footer.getBoundingClientRect().top < window.innerHeight - 60
        : false;
      setVisible(scrolled && !footerVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-4 py-3 backdrop-blur transition-transform md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link to="/contact" className="btn-gold w-full">
        Contactez-nous
      </Link>
    </div>
  );
}
