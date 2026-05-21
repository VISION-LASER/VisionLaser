import { MapPin, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const TopBar = () => (
    <div className="hidden md:block bg-navy text-white/90 border-b border-white/10">
        <div className="container-page flex items-center justify-between py-2.5 text-[11px] font-medium uppercase tracking-wider">
            <Link
                to="/nous-trouver"
                className="flex items-center gap-1.5 text-gold transition-colors duration-200"
            >
                <MapPin className="h-3 w-3" /> VISION LASER, Polyclinique du Val de Sambre, Rte de Mons 162, 59600 Maubeuge
            </Link>

            <div className="flex items-center gap-4">
                <Link
                    to="/contact"
                    className="flex items-center gap-1.5 text-gold transition-colors duration-200"
                >
                    <Mail className="h-3 w-3" /> Contact
                </Link>

                <a
                    href="https://wa.me/33759596369"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-all duration-200"
                >
                    <MessageCircle className="h-3 w-3" /> WhatsApp
                </a>
            </div>
        </div>
    </div>
);