import React, { useState } from "react";
import { Play, MessageSquare } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { Reveal } from "../../layout/Reveal";
import { TESTIMONIALS } from "../../../data/data";
import type { Testimonial } from "../../../types/types";
import TiktokVideoModal from "../../layout/TiktokVideoModal";

// ── Helpers ───────────────────────────────────────────────────────
const getTikTokEmbedUrl = (
  url: string,
  autoPlay: boolean = false,
): string | null => {
  const match = url.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/);
  if (match) {
    const params = autoPlay ? "?autoplay=1" : "?autoplay=0";
    return `https://www.tiktok.com/embed/v2/${match[1]}${params}`;
  }
  return null;
};

// ── Étoiles ───────────────────────────────────────────────────────
const StarRating: React.FC = () => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className="h-4 w-4 fill-[color:var(--gold)] text-[color:var(--gold)]"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// ── Carte vidéo ───────────────────────────────────────────────────
interface VideoCardProps {
  testimonial: Testimonial;
  isCenter: boolean;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  testimonial,
  isCenter,
  onClick,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const embedUrl = getTikTokEmbedUrl(testimonial.videoUrl, isCenter);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={[
        "relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500",
        "bg-neutral-900",
        isCenter
          ? "scale-100 opacity-100 z-10 ring-2 ring-[color:var(--gold)] ring-offset-2"
          : "scale-95 opacity-50 hover:opacity-70 hover:scale-[0.97]",
      ].join(" ")}
      style={{ aspectRatio: "9/16" }}
    >
      {/* Contenu principal */}
      <div className="absolute inset-0">
        {embedUrl && !videoError ? (
          <iframe
            src={embedUrl}
            className={[
              "absolute inset-0 h-full w-full border-0",
              !isCenter ? "pointer-events-none" : "",
            ].join(" ")}
            allow={
              isCenter
                ? "autoplay; fullscreen; picture-in-picture"
                : "fullscreen; picture-in-picture"
            }
            allowFullScreen
            loading={isCenter ? "eager" : "lazy"}
            title={`Témoignage ${testimonial.name}`}
            onError={() => setVideoError(true)}
            tabIndex={!isCenter ? -1 : undefined}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-neutral-800 px-6">
            <div className="h-20 w-20 rounded-full bg-neutral-700" />
            <div className="h-3 w-2/3 rounded-full bg-neutral-700" />
            <div className="h-3 w-1/2 rounded-full bg-neutral-700" />
          </div>
        )}
      </div>

      {/* Overlay dégradé bas */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />

      {/* Citation carte centrale */}
      {isCenter && (
        <div className="absolute inset-x-0 bottom-16 px-5 text-center pointer-events-none">
          <p className="text-sm font-bold uppercase leading-tight tracking-wide text-white drop-shadow-lg">
            "{testimonial.text}"
          </p>
        </div>
      )}

      {/* Citation cartes latérales */}
      {!isCenter && (
        <div className="absolute inset-x-0 bottom-16 px-4 text-center pointer-events-none">
          <p className="text-[10px] font-medium uppercase leading-tight tracking-wide text-white/90 drop-shadow-md line-clamp-2">
            {testimonial.text.length > 60
              ? testimonial.text.substring(0, 60) + "..."
              : testimonial.text}
          </p>
        </div>
      )}

      {/* Nom + âge */}
      <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pointer-events-none">
        <p
          className={`${isCenter ? "text-[11px]" : "text-[10px]"} font-medium text-white/80`}
        >
          {testimonial.name} · {testimonial.age}
        </p>
      </div>

      {/* Bouton play cartes latérales */}
      {!isCenter && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Play className="h-5 w-5 fill-white text-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Badge "Aperçu" cartes latérales */}
      {!isCenter && (
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 pointer-events-none">
          <span className="text-[8px] font-medium text-white/90">APERÇU</span>
        </div>
      )}

      {/* Badge "Lecture auto" carte centrale */}
      {isCenter && (
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 pointer-events-none">
          <span className="text-[8px] font-medium text-white/90 flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            LECTURE AUTO
          </span>
        </div>
      )}

      {/* Effet survol cartes latérales */}
      {!isCenter && isHovering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-all duration-300 pointer-events-none">
          <div className="text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/30 backdrop-blur-md mx-auto mb-2">
              <Play className="h-6 w-6 fill-white text-white ml-0.5" />
            </div>
            <p className="text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full">
              Cliquer pour voir la vidéo
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Carte avis écrit ──────────────────────────────────────────────
const ReviewCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial: t }) => (
  <div className="rounded-2xl border border-border bg-white p-6 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
    {/* En-tête : étoiles + badge vérifié */}
    <div className="flex items-center justify-between">
      <StarRating />
      <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
        ✓ Vérifié
      </span>
    </div>

    {/* Texte */}
    <p className="text-[14px] leading-relaxed text-foreground flex-1">
      "{t.text}"
    </p>

    {/* Auteur */}
    <div className="flex items-center gap-3 pt-3 border-t border-border">
      <div className="h-9 w-9 rounded-full bg-[color:var(--gold)]/15 flex items-center justify-center text-[12px] font-semibold text-[color:var(--gold)] flex-shrink-0">
        {t.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-navy truncate">{t.name}</p>
        <p className="text-[11px] text-muted-foreground">{t.age}</p>
      </div>
    </div>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────
const TestimonialsSection: React.FC = () => {
  const [active, setActive] = useState<Testimonial | null>(null);
  const [centerIdx, setCenterIdx] = useState(1);

  const getOrder = () => {
    const total = TESTIMONIALS.length;
    const left = (centerIdx - 1 + total) % total;
    const right = (centerIdx + 1) % total;
    return [
      { t: TESTIMONIALS[left], isCenter: false, idx: left },
      { t: TESTIMONIALS[centerIdx], isCenter: true, idx: centerIdx },
      { t: TESTIMONIALS[right], isCenter: false, idx: right },
    ];
  };

  return (
    <section id="temoignages" className="py-8 overflow-hidden">
      <div className="container-page">

        {/* ── En-tête ── */}
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Paroles de patients</p>
            <h2 className="mt-3">Ils nous ont fait confiance</h2>
          </div>
        </Reveal>

        {/* ── Titre section vidéo ── */}
        <Reveal delay={80}>
          <div className="mt-10 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
              <Play className="h-3.5 w-3.5 fill-white text-white" />
            </div>
            <h3 className="text-base font-semibold text-navy">
              Témoignages vidéo TikTok
            </h3>
          </div>
        </Reveal>

        {/* ── Grille 3 colonnes vidéo ── */}
        <Reveal delay={120}>
          <div className="mt-6 grid grid-cols-3 gap-4 items-center">
            {getOrder().map(({ t, isCenter, idx }) => (
              <VideoCard
                key={t.name}
                testimonial={t}
                isCenter={isCenter}
                onClick={() => {
                  if (isCenter) setActive(t);
                  else setCenterIdx(idx);
                }}
              />
            ))}
          </div>
        </Reveal>

        {/* ── Dots navigation ── */}
        <Reveal delay={160}>
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCenterIdx(i)}
                className={[
                  "h-1.5 rounded-full transition-all duration-300",
                  i === centerIdx
                    ? "w-6 bg-[color:var(--gold)]"
                    : "w-1.5 bg-border hover:bg-muted-foreground",
                ].join(" ")}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
        </Reveal>

        {/* ── Bouton YouTube ── */}
        <Reveal delay={200}>
          <div className="mt-6 flex justify-center">
            <a
              href="https://www.youtube.com/@Centrevisionlaser"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-100"
              style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
            >
              <FaYoutube className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              Voir plus de vidéos sur YouTube
              <svg
                className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </Reveal>

        {/* ── Avis écrits ── */}
        <Reveal delay={240}>
          <div className="mt-10 pt-8 border-t border-border">

            {/* Titre section avis écrits */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--gold)]/10">
                <MessageSquare className="h-3.5 w-3.5 text-[color:var(--gold)]" />
              </div>
              <h3 className="text-base font-semibold text-navy">
                Avis écrits de nos patients
              </h3>
            </div>

            {/* Grille des cartes */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <ReviewCard key={t.name} testimonial={t} />
              ))}
            </div>

            {/* Note légale */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                Témoignages recueillis avec le consentement des patients.
              </p>
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