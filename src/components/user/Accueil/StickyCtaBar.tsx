import React, { useEffect, useState } from "react";
import { Phone, ArrowRight, X } from "lucide-react";

interface Props { onOpenBooking?: () => void; }

const StickyCtaBar: React.FC<Props> = ({ onOpenBooking }) => {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            // Apparaît après avoir scrollé 40% de la page
            const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            setVisible(scrollPct > 0.4);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (dismissed || !visible) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-40 transition-all duration-300"
            style={{
                background: "rgba(12,35,64,.97)",
                backdropFilter: "blur(8px)",
                borderTop: "1px solid rgba(201,168,76,.2)",
            }}
        >
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 px-4 py-3">
                {/* Texte */}
                <div className="min-w-0">
                    <p className="text-[13px] font-semibold leading-tight" style={{ color: "white" }}>
                        Bilan visuel gratuit · Sans engagement
                    </p>
                    <p className="text-[11px] mt-0.5 hidden sm:block" style={{ color: "rgba(255,255,255,.5)" }}>
                        Découvrez si la chirurgie laser est faite pour vous
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                    <a
                        href="tel:0759596369"
                        className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium border transition-colors hover:bg-white/10"
                        style={{ borderColor: "rgba(201,168,76,.3)", color: "#C9A84C" }}
                    >
                        <Phone size={13} />
                        +33 7 59 59 63 69
                    </a>
                    <button
                        onClick={onOpenBooking}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all hover:scale-[1.02]"
                        style={{ background: "#C9A84C", color: "#0C2340" }}
                    >
                        Demander un bilan
                        <ArrowRight size={13} />
                    </button>
                    <button
                        onClick={() => setDismissed(true)}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X size={14} style={{ color: "rgba(255,255,255,.4)" }} />
                    </button>
                </div>
            </div>
        </div >
    );
};

export default StickyCtaBar;