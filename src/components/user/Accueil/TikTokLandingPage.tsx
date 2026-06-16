import { useEffect, useState, useRef } from "react";

/* ─────────────────────────────────────────────
   Données
───────────────────────────────────────────── */
const VIDEOS = [
    { id: 1, videoId: "7650541721960353056" },
    { id: 2, videoId: "7623821983570070816" },
    { id: 3, videoId: "7611227751936281888" },
    { id: 4, videoId: "7644989465387207968" },
    { id: 5, videoId: "7644602536078445856" },
    { id: 6, videoId: "7643860394745826592" },
    { id: 7, videoId: "7641278259438685473" },
    { id: 8, videoId: "7640156976155987232" },
    { id: 9, videoId: "7650541721960353056" },
    { id: 10, videoId: "7623821983570070816" },
    { id: 11, videoId: "7611227751936281888" },
    { id: 12, videoId: "7644989465387207968" },
];

/* ─────────────────────────────────────────────
   Icônes
───────────────────────────────────────────── */
const TikTokIcon = ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.87a8.18 8.18 0 0 0 4.78 1.52V7.01a4.85 4.85 0 0 1-1.01-.32z" />
    </svg>
);

const ChevronLeft = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M15 18l-6-6 6-6" />
    </svg>
);

const ChevronRight = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M9 18l6-6-6-6" />
    </svg>
);
 
/* ─────────────────────────────────────────────
   Composant — carousel TikTok seul
───────────────────────────────────────────── */
const TikTokLandingPage: React.FC = () => {
    const [scrollIndex, setScrollIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    // Charger TOUTES les vidéos immédiatement pour éviter le problème
    const [loadedVideos] = useState<Set<number>>(new Set(VIDEOS.map((_, i) => i)));
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w >= 1280) setItemsPerPage(4);
            else if (w >= 1024) setItemsPerPage(3);
            else if (w >= 640) setItemsPerPage(2);
            else setItemsPerPage(1);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const maxIndex = Math.max(0, VIDEOS.length - itemsPerPage);

    const goPrev = () => {
        setScrollIndex(Math.max(0, scrollIndex - 1));
    };

    const goNext = () => {
        setScrollIndex(Math.min(maxIndex, scrollIndex + 1));
    };

    const visibleVideos = VIDEOS.slice(scrollIndex, scrollIndex + itemsPerPage);

    return (
        <section className="m-5 p-5">
            <div className="container-page">

                {/* En-tête */}
                <div style={{ textAlign: "center", marginBottom: "28px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "8px", opacity: 0.45 }}>
                        <TikTokIcon size={12} />
                        <span style={{ fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            @centre.vision.las
                        </span>
                    </div>
                    <h2 style={{ fontSize: "clamp(3rem, 2.5vw, 1.35rem)", fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.3px", color: "var(--navy)" }}>
                        Nos vidéos <span style={{ color: "var(--gold)" }}>TikTok</span>
                    </h2>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", margin: "0 auto", maxWidth: "280px" }}>
                        Chirurgie, témoignages et coulisses de notre équipe
                    </p>
                    <div style={{ width: "28px", height: "2px", background: "var(--gold)", margin: "12px auto 0" }} />
                </div>

                {/* Carousel */}
                <div style={{ position: "relative" }} ref={containerRef}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
                        gap: "clamp(10px, 2vw, 18px)",
                    }}>
                        {visibleVideos.map((video, idx) => {
                            const globalIdx = scrollIndex + idx;
                            // Toutes les vidéos sont chargées maintenant
                            return (
                                <div key={`${video.id}-${scrollIndex}-${idx}`}>
                                    <div style={{
                                        position: "relative",
                                        width: "100%",
                                        aspectRatio: "9 / 16",
                                        backgroundColor: "#f3f4f6",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
                                    }}>
                                        <iframe
                                            src={`https://www.tiktok.com/embed/v2/${video.videoId}`}
                                            title={`Vidéo TikTok ${globalIdx + 1}`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            scrolling="no"
                                            loading={globalIdx < itemsPerPage ? "eager" : "lazy"}
                                            style={{
                                                position: "absolute",
                                                top: 0, left: 0,
                                                width: "100%", height: "100%",
                                                border: "none",
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Flèche gauche */}
                    {scrollIndex > 0 && (
                        <button
                            onClick={goPrev}
                            aria-label="Vidéos précédentes"
                            style={{
                                position: "absolute", top: "35%", left: "-18px",
                                transform: "translateY(-50%)",
                                background: "#fff", border: "1px solid #e5e7eb",
                                borderRadius: "999px", width: "38px", height: "38px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: "pointer", color: "#374151",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)", zIndex: 2,
                            }}
                        >
                            <ChevronLeft />
                        </button>
                    )}

                    {/* Flèche droite */}
                    {scrollIndex < maxIndex && (
                        <button
                            onClick={goNext}
                            aria-label="Vidéos suivantes"
                            style={{
                                position: "absolute", top: "35%", right: "-18px",
                                transform: "translateY(-50%)",
                                background: "#fff", border: "1px solid #e5e7eb",
                                borderRadius: "999px", width: "38px", height: "38px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: "pointer", color: "#374151",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)", zIndex: 2,
                            }}
                        >
                            <ChevronRight />
                        </button>
                    )}

                    {/* Dots */}
                    {maxIndex > 0 && (
                        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "18px" }}>
                            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setScrollIndex(idx)}
                                    aria-label={`Page ${idx + 1}`}
                                    style={{
                                        width: idx === scrollIndex ? "22px" : "6px",
                                        height: "6px", borderRadius: "999px", border: "none",
                                        background: idx === scrollIndex ? "var(--gold)" : "#d1d5db",
                                        cursor: "pointer", transition: "width 0.2s", padding: 0,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* CTA TikTok */}
                <div style={{ marginTop: "24px", textAlign: "center" }}>
                    <a
                        href="https://www.tiktok.com/@centre.vision.las"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "7px",
                            padding: "9px 22px", background: "#010101", color: "#fff",
                            borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600,
                            textDecoration: "none",
                        }}
                    >
                        <TikTokIcon size={13} />
                        Voir toutes nos vidéos sur TikTok
                    </a>
                </div>

            </div>
        </section>
    );
};

export default TikTokLandingPage;