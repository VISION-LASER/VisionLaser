import React, { useState, useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { Reveal } from "../../layout/Reveal";
import { TESTIMONIALS } from "../../../data/data";
import type { Testimonial } from "../../../types/types";
import TiktokVideoModal from "../../layout/TiktokVideoModal";

// ── Types ──────────────────────────────────────────────────
interface VideoItem {
  id: number;
  videoId: string;
  platform: 'tiktok' | 'youtube';
}

// ── Données des vidéos mixées ─────────────────────────────
const VIDEOS: VideoItem[] = [
  // Vidéos TikTok
  { id: 1, videoId: "7433439898901761313", platform: "tiktok" },
  { id: 2, videoId: "7632356756890357025", platform: "tiktok" },
  { id: 3, videoId: "7567424386215513376", platform: "tiktok" },
  // Vidéos YouTube (ajoutez vos IDs YouTube ici)
  { id: 4, videoId: "a3ommw6Yl1Q", platform: "youtube" },
];

// ── Fonction pour obtenir l'URL d'embed ───────────────────
const getEmbedUrl = (video: VideoItem): string => {
  if (video.platform === "youtube") {
    // Ajout des paramètres pour un meilleur affichage en mode portrait
    return `https://www.youtube.com/embed/${video.videoId}?modestbranding=1&rel=0&showinfo=0&controls=1&fs=1`;
  }
  return `https://www.tiktok.com/embed/v2/${video.videoId}`;
};

// ── Icônes ──────────────────────────────────────────────
const TikTokIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.87a8.18 8.18 0 0 0 4.78 1.52V7.01a4.85 4.85 0 0 1-1.01-.32z" />
  </svg>
);

const YouTubeIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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

// ── Composant principal ────────────────────────────────────
const TestimonialsSection: React.FC = () => {
  const [active, setActive] = useState<Testimonial | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Responsive ──────────────────────────────────────────
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
    <section id="temoignages" className="section overflow-hidden p-5">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Paroles de patients</p>
            <h2 className="text-3xl font-bold text-navy">Ils nous ont fait confiance</h2>
          </div>
        </Reveal>

        {/* Carousel mixte - format portrait unifié */}
        <Reveal delay={120}>
          <div style={{ position: "relative" }} ref={containerRef}>
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
              gap: "clamp(10px, 2vw, 18px)",
            }}>
              {visibleVideos.map((video, idx) => {
                const globalIdx = scrollIndex + idx;
                const isTikTok = video.platform === "tiktok";
                const isYouTube = video.platform === "youtube";
                
                return (
                  <div key={`${video.id}-${scrollIndex}-${idx}`}>
                    <div style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "9 / 16", // Format portrait unifié pour TikTok ET YouTube
                      backgroundColor: "#f3f4f6",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
                    }}>
                      <iframe
                        src={getEmbedUrl(video)}
                        title={`Témoignage ${globalIdx + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        scrolling="no"
                        loading={globalIdx < itemsPerPage ? "eager" : "lazy"}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: isYouTube ? "177.78%" : "100%", // 16:9 * 9/16 = 177.78%
                          height: "100%",
                          border: "none",
                        }}
                      />
                      {/* Badge de plateforme */}
                      <div style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: isTikTok ? "rgba(0,0,0,0.7)" : "rgba(255,0,0,0.8)",
                        backdropFilter: "blur(4px)",
                        borderRadius: "6px",
                        padding: "2px 8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        color: "#fff",
                        fontSize: "8px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        zIndex: 10,
                      }}>
                        {isTikTok ? (
                          <>
                            <TikTokIcon size={10} />
                            TikTok
                          </>
                        ) : (
                          <>
                            <YouTubeIcon size={10} />
                            YouTube
                          </>
                        )}
                      </div>
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
        </Reveal>

        {/* Lien YouTube */}
        <Reveal delay={200}>
          <div className="mt-2 flex justify-center">
            <a 
              href="https://www.youtube.com/@Centrevisionlaser"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
            >
              <FaYoutube className="h-4 w-4" />
              Voir plus de vidéos sur YouTube
            </a>
          </div>
        </Reveal>

        {/* Avis écrits - inchangé */}
        <Reveal delay={240}>
          <div className="mt-2 pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10">
                <MessageSquare className="h-3.5 w-3.5 text-gold" />
              </div>
              <h3 className="text-base font-semibold text-navy">Avis écrits de nos patients</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border border-border bg-white p-6 shadow-sm flex flex-col gap-4"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < t.rating
                            ? "fill-[color:var(--gold)] text-[color:var(--gold)]"
                            : "fill-neutral-200 text-neutral-200"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-[14px] leading-relaxed text-foreground flex-1">
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-[11px] font-semibold text-neutral-600">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-navy">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.age}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer - inchangé */}
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Témoignages recueillis avec le consentement des patients.
              </p>

              <a
                href="https://www.google.com/search?q=centre+vision+laser+paris+ouest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-white px-3 py-1.5 transition-opacity hover:opacity-80"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold text-navy">4,5</span>
                  <div className="flex gap-px">
                    {[1, 2, 3, 4].map((i) => (
                      <svg key={i} className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20">
                      <defs>
                        <linearGradient id="half-google">
                          <stop offset="50%" stopColor="#FBBC05" />
                          <stop offset="50%" stopColor="#D1D5DB" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="url(#half-google)"
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs text-muted-foreground">· 285 avis Google</span>
                </div>
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {active && (
        <TiktokVideoModal
          testimonial={active}
          all={TESTIMONIALS}
          onClose={() => setActive(null)}
          onSelect={setActive}
        />
      )}
    </section>
  );
};

export default TestimonialsSection;