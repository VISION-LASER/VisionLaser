import { Link } from "react-router-dom";
import logo from "../../assets/vision-laser-logo.jpg";

function Footer() {

  return (
    <footer id="site-footer" className="mt-20 border-t border-border bg-[color:var(--cream)]">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Vision Laser" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
            <span className="text-sm font-medium text-navy">Vision Laser · Hauts-de-France</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Centre ophtalmologique spécialisé dans la chirurgie réfractive au laser.
            Une approche médicale, sobre et personnalisée pour chaque patient.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-navy">Le centre</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/femtolasik">FemtoLASIK</Link></li>
            <li><Link to="/tprk">TPRK</Link></li>
            <li><Link to="/equipements">Équipements</Link></li>
            <li><Link to="/tarifs">Tarifs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-navy">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Hauts-de-France</li>
            <li>Lun – Ven · 9h – 18h</li>
            <li><Link to="/contact" className="underline-offset-4 hover:underline">Demander un bilan</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Centre Vision Laser des Hauts-de-France. Tous droits réservés.</p>
          <p>Informations médicales validées par le Dr. Chemla.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer