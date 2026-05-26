import React from "react";
import { Reveal } from "../../layout/Reveal";
import { useVideos } from "../../../hooks/useVideos";
import VideoFilter from "./VideoFilter";
import VideoCard from "./VideoCard";

const ActualiteSection: React.FC = () => {
  const { posts, filter, setFilter } = useVideos();

  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <VideoFilter active={filter} onChange={setFilter} />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 60}>
              <VideoCard post={post} />
            </Reveal>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            Aucune vidéo pour ce filtre.
          </p>
        )}
      </div>
    </section>
  );
};

export default ActualiteSection;