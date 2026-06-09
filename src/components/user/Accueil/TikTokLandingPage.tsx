import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";

/* ─────────────────────────────────────────────
   Données : vidéos simples
───────────────────────────────────────────── */
const VIDEOS = [
    { id: 1, videoId: "7649040183299525920" },
    { id: 2, videoId: "7647215926110162209" },
    { id: 3, videoId: "7646465414205082912" },
    { id: 4, videoId: "7644989465387207968" },
    { id: 5, videoId: "7644602536078445856" },
    { id: 6, videoId: "7643860394745826592" },
    { id: 7, videoId: "7641278259438685473" },
    { id: 8, videoId: "7640156976155987232" },
    { id: 9, videoId: "7649040183299525920" },
    { id: 10, videoId: "7647215926110162209" },
    { id: 11, videoId: "7646465414205082912" },
    { id: 12, videoId: "7644989465387207968" },
];

/* ─────────────────────────────────────────────
   Icône TikTok SVG inline
───────────────────────────────────────────── */
const TikTokIcon = ({ size = 12 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.87a8.18 8.18 0 0 0 4.78 1.52V7.01a4.85 4.85 0 0 1-1.01-.32z" />
    </svg>
);

const ChevronLeft = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 18l-6-6 6-6" />
    </svg>
);

const ChevronRight = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6-6-6" />
    </svg>
);

/* ─────────────────────────────────────────────
   Composant principal
───────────────────────────────────────────── */
const TikTokLandingPage: React.FC = () => {
    const [scrollIndex, setScrollIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width >= 1280) setItemsPerPage(5);
            else if (width >= 1024) setItemsPerPage(4);
            else if (width >= 768) setItemsPerPage(3);
            else if (width >= 640) setItemsPerPage(2);
            else setItemsPerPage(1);
        };
        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);
        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    const maxIndex = Math.max(0, VIDEOS.length - itemsPerPage);
    
    const goPrev = () => {
        if (scrollIndex > 0) {
            setScrollIndex(scrollIndex - 1);
        }
    };
    
    const goNext = () => {
        if (scrollIndex < maxIndex) {
            setScrollIndex(scrollIndex + 1);
        }
    };

    const visibleVideos = VIDEOS.slice(scrollIndex, scrollIndex + itemsPerPage);

    return (
        <>
            <Helmet>
                <title>Vidéos TikTok · Vision Laser Hauts-de-France</title>
                <meta name="description" content="Découvrez nos vidéos TikTok sur la chirurgie laser FemtoLASIK et TPRK." />
            </Helmet>

            <div style={{ margin: 0, padding: 0, background: "#fff" }}>
                <section style={{ margin: 0, padding: 0 }}>
                    <div style={{ maxWidth: "1400px", margin: "0 auto"}}>

                        {/* En-tête */}
                        <div style={{ textAlign: "center", marginBottom: "28px" }}>
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
                                <TikTokIcon size={12} />
                            </div>
                            <h2 style={{ fontSize: "1.35rem", fontWeight: 500, margin: "0 0 6px 0", letterSpacing: "-0.3px", color: "#0a1a2f" }}>
                                Vidéos <span style={{ color: "#c6a43f" }}>TikTok</span>
                            </h2>
                            <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: "0 auto", maxWidth: "300px" }}>
                                Retrouvez toutes nos actualités
                            </p>
                            <div style={{ width: "32px", height: "2px", background: "#c6a43f", margin: "12px auto 0" }} />
                        </div>

                        {/* Carrousel */}
                        <div style={{ position: "relative" }}>
                            <div
                                ref={containerRef}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
                                    gap: "16px",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {visibleVideos.map((video, idx) => (
                                    <div key={`${video.id}-${scrollIndex}-${idx}`} style={{ overflow: "hidden" }}>
                                        <div
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                aspectRatio: "9 / 16",
                                                backgroundColor: "#f3f4f6",
                                                borderRadius: "10px",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <iframe
                                                src={`https://www.tiktok.com/embed/v2/${video.videoId}`}
                                                title="TikTok video"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen
                                                scrolling="no"
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    border: "none",
                                                    overflow: "hidden",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Flèche gauche */}
                            {maxIndex > 0 && scrollIndex > 0 && (
                                <button
                                    onClick={goPrev}
                                    style={{
                                        position: "absolute",
                                        top: "25%",
                                        left: "-16px",
                                        transform: "translateY(-50%)",
                                        background: "#fff",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "999px",
                                        width: "36px",
                                        height: "36px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        color: "#374151",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    <ChevronLeft />
                                </button>
                            )}

                            {/* Flèche droite */}
                            {maxIndex > 0 && scrollIndex < maxIndex && (
                                <button
                                    onClick={goNext}
                                    style={{
                                        position: "absolute",
                                        top: "25%",
                                        right: "-16px",
                                        transform: "translateY(-50%)",
                                        background: "#fff",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "999px",
                                        width: "36px",
                                        height: "36px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        color: "#374151",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    <ChevronRight />
                                </button>
                            )}

                            {/* Indicateur de progression */}
                            {maxIndex > 0 && (
                                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
                                    {Array.from({ length: VIDEOS.length - itemsPerPage + 1 }).map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setScrollIndex(idx)}
                                            style={{
                                                width: idx === scrollIndex ? "24px" : "6px",
                                                height: "6px",
                                                borderRadius: "999px",
                                                border: "none",
                                                background: idx === scrollIndex ? "#c6a43f" : "#d1d5db",
                                                cursor: "pointer",
                                                transition: "width 0.2s",
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* CTA */}
                        <div style={{ marginTop: "5px", textAlign: "center" }}>
                            <a
                                href="https://www.tiktok.com/@centre.vision.las"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    padding: "6px 16px",
                                    background: "#010101",
                                    color: "#fff",
                                    borderRadius: "999px",
                                    fontSize: "0.7rem",
                                    textDecoration: "none",
                                }}
                            >
                                <TikTokIcon size={12} />
                                Voir plus sur TikTok
                            </a>
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
};

export default TikTokLandingPage;