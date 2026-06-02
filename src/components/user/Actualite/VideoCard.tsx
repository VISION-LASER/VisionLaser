// import React, { useState } from "react";
// import { Heart, Eye, ExternalLink, Play, X } from "lucide-react";
// import PlatformBadge from "../Blog/PlatformBadge";
// import type { VideoPost } from "../../../types/types";
// import { buildEmbedUrl, formatCount, relativeDate } from "../Blog/PlatformUtils";
 
// interface VideoCardProps {
//   post: VideoPost;
// }

// const VideoCard: React.FC<VideoCardProps> = ({ post }) => {
//   const [playing, setPlaying] = useState(false);

//   return (
//     <article className="group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-md">
//       {/* Video area */}
//       <div className="relative bg-black" style={{ paddingBottom: "56.25%" }}>
//         {playing ? (
//           <>
//             <iframe
//               src={buildEmbedUrl(post)}
//               className="absolute inset-0 h-full w-full border-0"
//               allow="autoplay; encrypted-media"
//               allowFullScreen
//               title={post.title}
//             />
//             <button
//               type="button"
//               onClick={() => setPlaying(false)}
//               className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
//               aria-label="Fermer la vidéo"
//             >
//               <X className="h-3.5 w-3.5" />
//             </button>
//           </>
//         ) : (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="absolute inset-0 bg-navy/80" />
//             <button
//               type="button"
//               onClick={() => setPlaying(true)}
//               className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/30 transition-all hover:scale-105 hover:bg-white/25"
//               aria-label={`Lire ${post.title}`}
//             >
//               <Play className="h-6 w-6 fill-white text-white" />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-5">
//         <div className="flex items-center justify-between">
//           <PlatformBadge platform={post.platform} />
//           <span className="text-xs text-muted-foreground">
//             {relativeDate(post.date)}
//           </span>
//         </div>

//         <h3 className="mt-3 text-base font-medium leading-snug text-navy">
//           {post.title}
//         </h3>
//         <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
//           {post.description}
//         </p>

//         <div className="mt-3 flex flex-wrap gap-1.5">
//           {post.tags.map((tag) => (
//             <span
//               key={tag}
//               className="rounded-full bg-cream px-2.5 py-0.5 text-[11px] text-navy/60"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
//           <div className="flex items-center gap-4 text-xs text-muted-foreground">
//             <span className="flex items-center gap-1">
//               <Heart className="h-3.5 w-3.5" />
//               {formatCount(post.likes)}
//             </span>
//             {post.views !== undefined && (
//               <span className="flex items-center gap-1">
//                 <Eye className="h-3.5 w-3.5" />
//                 {formatCount(post.views)}
//               </span>
//             )}
//           </div>
//           <a
//             href={post.videoUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-1 text-xs font-medium text-navy hover:text-gold"
//           >
//             Voir l'original <ExternalLink className="h-3 w-3" />
//           </a>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default VideoCard;

import React from "react";
import { Calendar, ExternalLink, Image as ImageIcon, Video, Heart, MessageCircle } from "lucide-react";
import type { Actualite } from "../../../services/actualiteService";

interface VideoCardProps {
  post: Actualite;
}

const VideoCard: React.FC<VideoCardProps> = ({ post }) => {
  const hasVideo = post.video_actualite && post.video_actualite.trim() !== '';
  const hasImage = post.image_actualite && post.image_actualite.trim() !== '';
  
  // Construire l'URL complète de l'image (si c'est un chemin relatif)
  const getMediaUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/uploads')) return `http://localhost:3000${path}`;
    return path;
  };
  
  // Obtenir l'ID YouTube
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?#]+)/,
      /youtube\.com\/embed\/([^/?]+)/,
      /youtube\.com\/v\/([^/?]+)/,
      /youtube\.com\/shorts\/([^/?]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  // Obtenir l'URL embed pour YouTube
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const videoId = getYouTubeId(url);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com/')) {
      return url.replace('vimeo.com', 'player.vimeo.com/video');
    }
    return url;
  };

  // Formater la date
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return "Date non disponible";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Date non disponible";
      }
      return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch (error) {
      return "Date non disponible";
    }
  };

  // Tronquer le texte
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Vérifier si c'est une vidéo YouTube
  const isYouTubeVideo = (url: string) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-md">
      {/* Media area */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200" style={{ paddingBottom: "56.25%" }}>
        {hasVideo && isYouTubeVideo(post.video_actualite!) ? (
          <iframe
            src={getEmbedUrl(post.video_actualite!)}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title={post.titre}
          />
        ) : hasVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            controls
            poster={post.image_actualite || undefined}
          >
            <source src={getMediaUrl(post.video_actualite!)} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        ) : hasImage ? (
          <img
            src={getMediaUrl(post.image_actualite!)}
            alt={post.titre}
            className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/eee/ccc?text=Image+non+disponible';
            }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <ImageIcon className="h-12 w-12 text-gray-300" />
            <span className="mt-2 text-sm text-gray-400">Aucun média</span>
          </div>
        )}
        
        {/* Badge type */}
        <div className="absolute top-3 left-3">
          {hasVideo && isYouTubeVideo(post.video_actualite!) ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-1 text-xs font-medium text-white">
              <Video className="h-3 w-3" />
              YouTube
            </span>
          ) : hasVideo ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-600 px-2 py-1 text-xs font-medium text-white">
              <Video className="h-3 w-3" />
              Vidéo
            </span>
          ) : hasImage ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white">
              <ImageIcon className="h-3 w-3" />
              Article
            </span>
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.date_publication)}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-snug text-navy line-clamp-2">
          {post.titre || "Sans titre"}
        </h3>
        
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {truncateText(post.description || "", 150)}
        </p>

        {/* Stats - MODIFICATION ICI : Affichage même si zéro */}
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-3">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Heart className="h-3.5 w-3.5 text-red-500" />
            {post.reactions_count !== undefined ? post.reactions_count : 0}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MessageCircle className="h-3.5 w-3.5" />
            {post.commentaires_count !== undefined ? post.commentaires_count : 0}
          </span>
        </div>

        {(hasVideo || hasImage) && (
          <div className="mt-3">
            <a
              href={hasVideo ? post.video_actualite! : getMediaUrl(post.image_actualite!)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-navy hover:text-gold transition-colors"
            >
              {hasVideo ? "Voir la vidéo" : "Voir l'image"} 
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default VideoCard;