import React, { useState } from "react";
import { Heart, Eye, ExternalLink, Play, X } from "lucide-react";
import PlatformBadge from "./PlatformBadge";
import type { VideoPost } from "../../../types/types";
import { buildEmbedUrl, formatCount, relativeDate } from "./PlatformUtils";

interface VideoCardProps {
  post: VideoPost;
}

const VideoCard: React.FC<VideoCardProps> = ({ post }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-md">
      {/* Video area */}
      <div className="relative bg-black" style={{ paddingBottom: "56.25%" }}>
        {playing ? (
          <>
            <iframe
              src={buildEmbedUrl(post)}
              className="absolute inset-0 h-full w-full border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={post.title}
            />
            <button
              type="button"
              onClick={() => setPlaying(false)}
              className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              aria-label="Fermer la vidéo"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-navy/80" />
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/30 transition-all hover:scale-105 hover:bg-white/25"
              aria-label={`Lire ${post.title}`}
            >
              <Play className="h-6 w-6 fill-white text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <PlatformBadge platform={post.platform} />
          <span className="text-xs text-muted-foreground">
            {relativeDate(post.date)}
          </span>
        </div>

        <h3 className="mt-3 text-base font-medium leading-snug text-navy">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {post.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cream px-2.5 py-0.5 text-[11px] text-navy/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              {formatCount(post.likes)}
            </span>
            {post.views !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {formatCount(post.views)}
              </span>
            )}
          </div>
          <a
            href={post.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-navy hover:text-gold"
          >
            Voir l'original <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default VideoCard;