import React from "react";
import { Reveal } from "../../layout/Reveal";
import { useActualites } from "../../../hooks/useActualites";
import ActualiteFilter from "./ActualiteFilter";
import VideoCard from "./VideoCard";
import BlogCard from "./BlogCard";
import type { BlogPost, VideoPost } from "../../../types/types";

const ActualiteSection: React.FC = () => {
  const {
    posts,
    filter,
    setFilter,
    togglePostLike,
    toggleCommentLike,
    addComment,
  } = useActualites();

  return (
    <section className="section">
      <div className="container-page">
        {/* Filter bar */}
        <Reveal>
          <ActualiteFilter active={filter} onChange={setFilter} />
        </Reveal>

        {/* Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 60}>
              {post.type === "video" ? (
                <VideoCard post={post as VideoPost} />
              ) : (
                <BlogCard
                  post={post as BlogPost}
                  onLike={togglePostLike}
                  onCommentLike={toggleCommentLike}
                  onAddComment={addComment}
                />
              )}
            </Reveal>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            Aucune publication pour ce filtre.
          </p>
        )}
      </div>
    </section>
  );
};

export default ActualiteSection;