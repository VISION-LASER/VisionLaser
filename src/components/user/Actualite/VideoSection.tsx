// import React from "react";
// import { Reveal } from "../../layout/Reveal";
// import VideoCard from "./VideoCard";
// import VideoFilter from "./VideoFilter";
// import { useVideos } from "../../../hooks/useVideos";

// const VideoSection: React.FC = () => {
//   const { posts, filter, setFilter } = useVideos();

//   return (
//     <section className="section">
//       <div className="container-page">
//         <Reveal>
//           <VideoFilter active={filter} onChange={setFilter} />
//         </Reveal>

//         <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {posts.map((post, i) => (
//             <Reveal key={post.id} delay={i * 60}>
//               <VideoCard post={post} />
//             </Reveal>
//           ))}
//         </div>

//         {posts.length === 0 && (
//           <p className="mt-16 text-center text-muted-foreground">
//             Aucune vidéo pour ce filtre.
//           </p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default VideoSection;

import React from "react";
import { Reveal } from "../../layout/Reveal";
import VideoCard from "./VideoCard";
import ActualiteFilter from "./ActualiteFilter";
import { useActualites } from "../../../hooks/useActualites";
import { Loader2 } from "lucide-react";

const VideoSection: React.FC = () => {
  const { actualites, loading, error, filter, setFilter } = useActualites();

  if (loading) {
    return (
      <div className="py-8">
        <div className="container-page">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section">
        <div className="container-page">
          <div className="text-center py-20">
            <p className="text-red-500 mb-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-gold hover:underline"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="container-page">
        <Reveal>
          <ActualiteFilter active={filter} onChange={setFilter} />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {actualites.map((actualite, i) => (
            <Reveal key={actualite.id} delay={i * 60}>
              <VideoCard post={actualite} />
            </Reveal>
          ))}
        </div>

        {actualites.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            Aucune actualité pour ce filtre.
          </p>
        )}
      </div>
    </section>
  );
};

export default VideoSection;