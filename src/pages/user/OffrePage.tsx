import { useEffect, useState } from "react";
import { CheckCircle, Gift, Users, Eye, ChevronDown, Phone, MapPin, ArrowRight, Star, Zap } from "lucide-react";
import Footer from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import BookingModal from "../../components/user/Booking/BookingModal";

/* ── Bouton CTA réutilisable ── */
function CtaButton({
    label = "Prendre rendez-vous",
    size = "md",
    onClick,
    className = ""
}: {
    label?: string;
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    className?: string;
}) {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl";

    const sizeStyles = {
        sm: "px-5 py-2.5 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-3.5 text-lg"
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${baseStyles} ${sizeStyles[size]} ${className}`}
            style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #e4c26a 50%, #C9A84C 100%)",
                backgroundSize: "200% auto",
                color: "#0C2340"
            }}
        >
            {label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
    );
}

/* ── Pill badge ── */
function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
            style={{ borderColor: "#C9A84C44", color: "#C9A84C", background: "#C9A84C10" }}>
            {children}
        </span>
    );
}

/* ── Section divider ── */
function Divider() {
    return <div className="mx-auto my-16 h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />;
}

/* ── Accordion item ── */
function AccordionItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b" style={{ borderColor: "#0C234015" }}>
            <button
                className="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-colors"
                style={{ color: open ? "#C9A84C" : "#0C2340" }}
                onClick={() => setOpen(!open)}
            >
                {question}
                <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    style={{ color: "#C9A84C" }} />
            </button>
            {open && (
                <p className="pb-4 text-sm leading-relaxed" style={{ color: "#0C234080" }}>
                    {answer}
                </p>
            )}
        </div>
    );
}

/* ━━━━━━━━━━━━━━━━━━ Wrapper réutilisable pour le BookingModal inline ━━━━━━━━━━━━━━━━━━
   order="first"  -> sur desktop, se place dans la colonne de GAUCHE (mais reste 2e dans le DOM,
                      donc toujours affiché APRÈS le contenu sur mobile)
   order absent   -> sur desktop, reste dans la colonne de DROITE (comportement par défaut)
*/
function InlineBooking({
    className = "",
    order
}: {
    className?: string;
    order?: "first";
}) {
    return (
        <div className={`w-full ${order === "first" ? "lg:order-1" : "lg:order-2"} ${className}`}>
            <BookingModal open={true} onClose={() => { }} inline={true} />
        </div>
    );
}

/* ═══════════════════════════════════════════
   PAGE PRINCIPALE
═══════════════════════════════════════════ */
export default function OffresPage() {
    const [bookingOpen, setBookingOpen] = useState(false);

    useEffect(() => {
        const openModal = () => setBookingOpen(true);
        window.addEventListener("open-booking-modal", openModal);
        return () => window.removeEventListener("open-booking-modal", openModal);
    }, []);

    return (
        <>
            <Header />

            <main className="overflow-x-hidden">

                {/* ━━━━━━━━━━━━━━━━━━ HERO (booking à DROITE) ━━━━━━━━━━━━━━━━━━ */}
                <section className="relative isolate py-16" style={{ background: "#0C2340" }}>
                    <div className="container-page relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            {/* ── Colonne gauche (contenu) ── */}
                            <div className="flex flex-col text-center lg:text-left">
                                <div className="flex justify-center lg:justify-start">
                                    <Pill><Gift className="h-3 w-3" /> Offre exclusive</Pill>
                                </div>

                                <h1 className="mt-6 font-bold leading-[1.1] tracking-tight text-white"
                                    style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
                                    Voyez mieux,{" "}
                                    <span style={{
                                        background: "linear-gradient(135deg, #C9A84C, #e4c26a)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}>
                                        dès aujourd'hui
                                    </span>
                                </h1>

                                {/* Badges de confiance */}
                                <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
                                    {["Consultation gratuite", "Bilan préopératoire offert", "Devis sans engagement"].map((b) => (
                                        <span key={b} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                                            style={{ background: "#ffffff10", color: "#ffffffcc", border: "1px solid #ffffff15" }}>
                                            <CheckCircle className="h-3 w-3" style={{ color: "#C9A84C" }} />
                                            {b}
                                        </span>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border w-full max-w-lg mx-auto lg:mx-0"
                                    style={{ borderColor: "#ffffff15", background: "#ffffff08" }}>
                                    {[
                                        { value: "98 %", label: "de satisfaction" },
                                        { value: "15 ans", label: "d'expertise" },
                                        { value: "0 €", label: "de consultation" },
                                    ].map((s) => (
                                        <div key={s.label} className="flex flex-col items-center py-5 px-3" style={{ background: "#ffffff05" }}>
                                            <span className="text-xl font-bold" style={{ color: "#C9A84C" }}>{s.value}</span>
                                            <span className="mt-0.5 text-[11px]" style={{ color: "#ffffff60" }}>{s.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="mt-6 text-[11px]" style={{ color: "#ffffff50" }}>
                                    Ouverture de la plateforme Doctolib · Aucune carte bancaire requise
                                </p>
                            </div>

                            {/* ── Colonne droite (booking) ── */}
                            <InlineBooking />
                        </div>
                    </div>
                </section>

                {/* ━━━━━━━━━━━━━━━━━━ AVANTAGES INTERNET (booking à GAUCHE) ━━━━━━━━━━━━━━━━━━ */}
                <section className="py-20" style={{ background: "#fafafa" }}>
                    <div className="container-page">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            {/* ── Booking (gauche en desktop, après le contenu en mobile) ── */}
                            <InlineBooking order="first" />

                            {/* ── Contenu (droite en desktop) ── */}
                            <div className="lg:order-2">
                                <Pill><Zap className="h-3 w-3" /> Votre avantage</Pill>
                                <h2 className="mt-4 text-3xl font-bold" style={{ color: "#0C2340" }}>
                                    Ce que vous obtenez <span style={{ color: "#C9A84C" }}>en réservant ici</span>
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#0C234070" }}>
                                    Quatre bénéfices immédiats, accessibles uniquement aux patients qui passent par cette page.
                                </p>

                                <div className="mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2">
                                    {[
                                        {
                                            icon: Eye,
                                            title: "Test d'aptitude laser",
                                            desc: "Un bilan complet pour évaluer si vous êtes éligible à la chirurgie réfractive. Offert.",
                                            tag: "Gratuit",
                                        },
                                        {
                                            icon: Star,
                                            title: "Dépistage gratuit",
                                            desc: "Un assistant effectue un premier dépistage. Le chirurgien analyse ensuite votre dossier et vous recontacte sous 7 jours pour vous indiquer si vous êtes éligible. La technique définitive sera choisie après un examen au microscope.",
                                            tag: "Gratuit",
                                        },
                                        {
                                            icon: CheckCircle,
                                            title: "Devis détaillé",
                                            desc: "Un document clair, sans mauvaise surprise, sans engagement de votre part.",
                                            tag: "Sans engagement",
                                        },
                                        {
                                            icon: Gift,
                                            title: "Remise exclusive",
                                            desc: "Une réduction appliquée directement sur le montant de votre intervention.",
                                            tag: "Exclusif internet",
                                        },
                                    ].map((item) => (
                                        <div key={item.title}
                                            className="group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                            style={{ borderColor: "#0C234010", background: "#fff" }}>
                                            <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl transition-all duration-300 group-hover:h-1"
                                                style={{ background: "linear-gradient(90deg, #C9A84C, #e4c26a)" }} />
                                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                                                style={{ background: "#C9A84C15" }}>
                                                <item.icon className="h-5 w-5" style={{ color: "#C9A84C" }} />
                                            </div>
                                            <span className="mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#C9A84C" }}>
                                                {item.tag}
                                            </span>
                                            <h3 className="mb-2 text-sm font-bold" style={{ color: "#0C2340" }}>{item.title}</h3>
                                            <p className="text-xs leading-relaxed" style={{ color: "#0C234070" }}>{item.desc}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8">
                                    <CtaButton
                                        label="Je profite de cette offre"
                                        size="md"
                                        onClick={() => setBookingOpen(true)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Divider />

                {/* ━━━━━━━━━━━━━━━━━━ TROUBLES TRAITÉS (booking à DROITE) ━━━━━━━━━━━━━━━━━━ */}
                <section className="pb-20">
                    <div className="container-page">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            {/* ── Contenu (gauche) ── */}
                            <div>
                                <Pill>Indications</Pill>
                                <h2 className="mt-4 text-3xl font-bold leading-tight" style={{ color: "#0C2340" }}>
                                    Quel trouble visuel <br />
                                    <span style={{ color: "#C9A84C" }}>peut-on corriger ?</span>
                                </h2>
                                <p className="mt-4 text-sm leading-relaxed" style={{ color: "#0C234070" }}>
                                    La chirurgie réfractive au laser traite la grande majorité des défauts visuels.
                                    Lors de votre consultation gratuite, le chirurgien déterminera si vous êtes éligible.
                                </p>

                                <ul className="mt-6 space-y-3">
                                    {[
                                        { label: "Myopie", desc: "Difficulté à voir de loin" },
                                        { label: "Hypermétropie", desc: "Difficulté à voir de près" },
                                        { label: "Astigmatisme", desc: "Vision floue ou dédoublée" },
                                        { label: "Presbytie", desc: "Difficulté à lire avec l'âge" },
                                        { label: "Troubles combinés", desc: "Associations des défauts ci-dessus" },
                                    ].map((item) => (
                                        <li key={item.label} className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                                                style={{ background: "#C9A84C20" }}>
                                                <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#C9A84C" }} />
                                            </div>
                                            <div>
                                                <span className="text-sm font-semibold" style={{ color: "#0C2340" }}>{item.label}</span>
                                                <span className="text-xs" style={{ color: "#0C234060" }}> — {item.desc}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Techniques disponibles */}
                                <div className="mt-8 rounded-2xl border overflow-hidden" style={{ borderColor: "#0C234012" }}>
                                    <div className="px-6 py-4" style={{ background: "#0C2340" }}>
                                        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#C9A84C" }}>
                                            Techniques disponibles
                                        </p>
                                    </div>
                                    {[
                                        { name: "FemtoLASIK", desc: "La référence pour la myopie et l'astigmatisme", tag: "Le plus courant" },
                                        { name: "TPRK", desc: "Sans découpe du tissu cornéen, idéal pour les cornées fines", tag: "Sans lame" },
                                        { name: "PKR", desc: "Technique de surface, très sûre", tag: "Chirurgie de surface" },
                                    ].map((t, i) => (
                                        <div key={t.name} className={`px-6 py-4 ${i !== 2 ? "border-b" : ""}`}
                                            style={{ borderColor: "#0C234010", background: "#fff" }}>
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="text-sm font-bold" style={{ color: "#0C2340" }}>{t.name}</p>
                                                    <p className="mt-1 text-xs leading-relaxed" style={{ color: "#0C234065" }}>{t.desc}</p>
                                                </div>
                                                <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
                                                    style={{ background: "#C9A84C15", color: "#C9A84C" }}>
                                                    {t.tag}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="px-6 py-4" style={{ background: "#f9f7f3" }}>
                                        <p className="text-xs leading-relaxed" style={{ color: "#0C234070" }}>
                                            La technique adaptée est choisie lors de votre consultation gratuite avec le chirurgien.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <CtaButton
                                        label="Vérifier mon éligibilité"
                                        size="md"
                                        onClick={() => setBookingOpen(true)}
                                    />
                                </div>
                            </div>

                            {/* ── Booking (droite) ── */}
                            <InlineBooking />
                        </div>
                    </div>
                </section>

                {/* ━━━━━━━━━━━━━━━━━━ TARIFS DÉGRESSIFS (booking à GAUCHE) ━━━━━━━━━━━━━━━━━━ */}
                <section className="py-20" style={{ background: "#0C2340" }}>
                    <div className="container-page">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            {/* ── Booking (gauche en desktop) ── */}
                            <InlineBooking order="first" />

                            {/* ── Contenu (droite en desktop) ── */}
                            <div className="lg:order-2 text-center lg:text-left">
                                <div className="flex justify-center lg:justify-start">
                                    <Pill><Users className="h-3 w-3" /> Tarifs de groupe</Pill>
                                </div>
                                <h2 className="mt-4 text-3xl font-bold text-white">
                                    Venez à plusieurs,{" "}
                                    <span style={{ color: "#C9A84C" }}>économisez ensemble</span>
                                </h2>
                                <p className="mt-3 text-sm" style={{ color: "#ffffff70" }}>
                                    Pour plusieurs interventions programmées le même jour.
                                </p>

                                <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
                                    {[
                                        { n: "2 personnes", pct: "5 %", highlight: false },
                                        { n: "3 personnes", pct: "7 %", highlight: false },
                                        { n: "4 personnes", pct: "10 %", highlight: true },
                                        { n: "5 personnes ou +", pct: "12 %", highlight: false },
                                    ].map((item) => (
                                        <div key={item.n}
                                            className="relative flex flex-col items-center rounded-2xl px-6 py-5 text-center transition-all duration-300 hover:-translate-y-1"
                                            style={{
                                                background: item.highlight ? "linear-gradient(135deg, #C9A84C, #e4c26a)" : "#ffffff0f",
                                                border: item.highlight ? "none" : "1px solid #ffffff15",
                                                minWidth: "140px",
                                            }}>
                                            {item.highlight && (
                                                <span className="absolute -top-3 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                                                    style={{ background: "#0C2340", color: "#C9A84C" }}>
                                                    Populaire
                                                </span>
                                            )}
                                            <span className="text-3xl font-black" style={{ color: item.highlight ? "#0C2340" : "#C9A84C" }}>
                                                {item.pct}
                                            </span>
                                            <span className="mt-1 text-xs font-medium" style={{ color: item.highlight ? "#0C234090" : "#ffffff70" }}>
                                                de remise · {item.n}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 rounded-2xl border p-6 text-center lg:text-left"
                                    style={{ borderColor: "#C9A84C30", background: "#C9A84C08" }}>
                                    <Gift className="mx-auto lg:mx-0 h-6 w-6 mb-3" style={{ color: "#C9A84C" }} />
                                    <h3 className="text-sm font-bold text-white">Programme de parrainage</h3>
                                    <p className="mt-2 text-xs leading-relaxed" style={{ color: "#ffffff70" }}>
                                        Recommandez un proche et bénéficiez d'avantages exclusifs selon notre programme de parrainage.
                                        Demandez les détails lors de votre consultation.
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <CtaButton
                                        label="Réserver pour mon groupe"
                                        size="md"
                                        onClick={() => setBookingOpen(true)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ━━━━━━━━━━━━━━━━━━ CONDITIONS (booking à DROITE) ━━━━━━━━━━━━━━━━━━ */}
                <section className="py-20" style={{ background: "#fafafa" }}>
                    <div className="container-page">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            {/* ── Contenu (gauche) ── */}
                            <div>
                                <h2 className="text-2xl font-bold" style={{ color: "#0C2340" }}>
                                    Conditions de l'offre
                                </h2>
                                <p className="mt-2 text-sm" style={{ color: "#0C234060" }}>
                                    Transparence totale, sans surprise.
                                </p>

                                <div className="mt-8 rounded-2xl border overflow-hidden" style={{ borderColor: "#0C234010" }}>
                                    {[
                                        { q: "Sur quoi s'applique la remise ?", a: "La remise s'applique sur présentation du devis établi lors de la consultation." },
                                        { q: "Cumulable avec un autre tarif préférentiel ?", a: "Non — elle n'est pas valable si un tarif préférentiel a déjà été accordé." },
                                        { q: "Les honoraires du chirurgien sont-ils inclus ?", a: "Les honoraires libres du chirurgien ne sont pas inclus dans la réduction." },
                                        { q: "Quels actes sont exclus ?", a: "Les actes thérapeutiques non liés à la chirurgie réfractive (ex. Cross-Linking, anneaux intra-cornéens) sont exclus." },
                                        { q: "Cumulable avec d'autres promotions ?", a: "Non — l'offre n'est pas cumulable avec d'autres promotions en cours." },
                                    ].map((item) => (
                                        <AccordionItem key={item.q} question={item.q} answer={item.a} />
                                    ))}
                                </div>
                            </div>

                            {/* ── Booking (droite) ── */}
                            <InlineBooking />
                        </div>
                    </div>
                </section>

                {/* ━━━━━━━━━━━━━━━━━━ CTA FINAL (booking à GAUCHE) ━━━━━━━━━━━━━━━━━━ */}
                <section className="py-20">
                    <div className="container-page">
                        <div className="relative isolate overflow-hidden rounded-3xl px-8 py-16 md:px-16"
                            style={{ background: "linear-gradient(135deg, #0C2340 0%, #0f2d54 100%)" }}>
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <div className="h-[600px] w-[600px] rounded-full border opacity-[0.06]"
                                    style={{ borderColor: "#C9A84C" }} />
                            </div>

                            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                                {/* ── Booking (gauche en desktop) ── */}
                                <InlineBooking order="first" />

                                {/* ── Contenu (droite en desktop) ── */}
                                <div className="lg:order-2 text-center lg:text-left">
                                    <div className="flex justify-center lg:justify-start">
                                        <Pill><Eye className="h-3 w-3" /> Prêt(e) à franchir le pas ?</Pill>
                                    </div>
                                    <h2 className="mt-5 text-3xl font-bold leading-tight text-white"
                                        style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}>
                                        Votre consultation gratuite vous attend
                                    </h2>
                                    <p className="mt-4 text-sm leading-relaxed" style={{ color: "#ffffffaa" }}>
                                        Les examens préopératoires et la consultation d'éligibilité sont entièrement gratuits.
                                        Aucun engagement, aucune avance.
                                    </p>

                                    <div className="mt-8 flex flex-col items-center lg:items-start gap-4 sm:flex-row">
                                        <CtaButton
                                            label="Prendre rendez-vous"
                                            size="lg"
                                            onClick={() => setBookingOpen(true)}
                                        />
                                        <a href="tel:+33759507184"
                                            className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-base font-bold text-white transition-all hover:scale-[1.02] hover:bg-white/10"
                                            style={{ borderColor: "#ffffff25" }}>
                                            <Phone className="h-4 w-4" style={{ color: "#C9A84C" }} />
                                            +33 7 59 50 71 84
                                        </a>
                                    </div>

                                    <div className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-xs" style={{ color: "#ffffff50" }}>
                                        <MapPin className="h-3.5 w-3.5" />
                                        CH de Maubeuge · Rue Simone Veil, 59600 Maubeuge
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />

            {/* Modal classique pour les CTA des autres sections */}
            <div className="w-full">
                <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
            </div>

        </>
    );
}