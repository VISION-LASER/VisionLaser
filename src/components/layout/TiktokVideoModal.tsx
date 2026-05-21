import React, { useEffect } from "react";
import { X, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "../../types/types";

interface TiktokVideoModalProps {
  testimonial: Testimonial;
  all: Testimonial[];
  onClose: () => void;
  onSelect: (t: Testimonial) => void;
}

function extractTiktokVideoId(url: string): string | null {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

const TiktokVideoModal: React.FC<TiktokVideoModalProps> = ({
  testimonial,
  all,
  onClose,
  onSelect,
}) => {
  const videoId = testimonial.videoUrl
    ? extractTiktokVideoId(testimonial.videoUrl)
    : null;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        const currentIndex = all.findIndex(t => t.name === testimonial.name);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : all.length - 1;
        onSelect(all[prevIndex]);
      }
      if (e.key === "ArrowRight") {
        const currentIndex = all.findIndex(t => t.name === testimonial.name);
        const nextIndex = currentIndex < all.length - 1 ? currentIndex + 1 : 0;
        onSelect(all[nextIndex]);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, onSelect, all, testimonial.name]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const currentIndex = all.findIndex(t => t.name === testimonial.name);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < all.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation arrows - desktop */}
        {hasPrev && (
          <button
            onClick={() => onSelect(all[currentIndex - 1])}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        
        {hasNext && (
          <button
            onClick={() => onSelect(all[currentIndex + 1])}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {/* ── Left panel: sidebar testimonials ── */}
        <aside className="hidden md:flex w-80 shrink-0 flex-col bg-navy/5 dark:bg-white/5 border-r border-border">
          {/* Header */}
          <div className="border-b border-border px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">
              Témoignages
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {all.length} témoignages clients
            </p>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto custom-scroll">
            {all.map((t) => {
              const isActive = t.name === testimonial.name;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => onSelect(t)}
                  className={`w-full text-left px-6 py-4 border-b border-border transition-all duration-200 ${
                    isActive
                      ? "bg-gold/10 border-l-4 border-l-gold"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-sm font-semibold leading-snug ${
                          isActive ? "text-navy dark:text-white" : "text-foreground/70"
                        }`}>
                          {t.name}
                        </p>
                        {t.videoUrl && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gold">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold"></span>
                            </span>
                            Vidéo
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-0.5 ${
                        isActive ? "text-foreground/60" : "text-muted-foreground"
                      }`}>
                        {t.age}
                      </p>
                      <p className={`mt-2 text-xs leading-relaxed line-clamp-2 ${
                        isActive ? "text-foreground/70" : "text-muted-foreground/60"
                      }`}>
                        "{t.text.slice(0, 80)}..."
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ── Right panel: video + info ── */}
        <div className="flex flex-1 flex-col min-w-0 bg-white dark:bg-gray-900">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10">
                <span className="text-xs font-bold text-gold">TK</span>
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.age}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-all duration-200"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Video */}
          <div className="relative bg-black/90" style={{ paddingBottom: "56.25%" }}>
            {videoId ? (
              <iframe
                key={videoId}
                src={`https://www.tiktok.com/embed/v2/${videoId}`}
                className="absolute inset-0 h-full w-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`Témoignage de ${testimonial.name}`}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Aucune vidéo disponible pour ce témoignage.
                  </p>
                  {testimonial.videoUrl && (
                    <a
                      href={testimonial.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold inline-flex px-5 py-2.5 text-sm"
                    >
                      Voir sur TikTok
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quote section */}
          <div className="flex-1 px-6 py-6">
            <Quote className="h-5 w-5 text-gold opacity-60" strokeWidth={1.5} />
            <p className="mt-3 text-sm leading-relaxed text-foreground/80 italic">
                      "{testimonial.text}"
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />
              <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                Consentement client
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-gold/30 via-gold/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden flex gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
        <button
          onClick={() => hasPrev && onSelect(all[currentIndex - 1])}
          disabled={!hasPrev}
          className={`p-2 rounded-full transition-all ${
            hasPrev ? "bg-white/20 text-white" : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs text-white/80 px-2 flex items-center">
          {currentIndex + 1} / {all.length}
        </span>
        <button
          onClick={() => hasNext && onSelect(all[currentIndex + 1])}
          disabled={!hasNext}
          className={`p-2 rounded-full transition-all ${
            hasNext ? "bg-white/20 text-white" : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TiktokVideoModal;