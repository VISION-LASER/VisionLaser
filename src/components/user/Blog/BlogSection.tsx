import React from "react";
import { Reveal } from "../../layout/Reveal";
import { useBlog } from "../../../hooks/useBlog";
import BlogFilter from "./BlogFilter";
import BlogCard from "./BlogCard";

const BlogSection: React.FC = () => {
  const {
    posts,
    activeCategory,
    activeSort,
    setActiveCategory,
    setActiveSort,
    togglePostLike,
    toggleCommentLike,
    addComment,
  } = useBlog();

  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <BlogFilter
            activeCategory={activeCategory}
            activeSort={activeSort}
            onCategoryChange={setActiveCategory}
            onSortChange={setActiveSort}
            totalCount={posts.length}
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 80}>
              <BlogCard
                post={post}
                onLike={togglePostLike}
                onCommentLike={toggleCommentLike}
                onAddComment={addComment}
              />
            </Reveal>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">Aucun article dans cette catégorie.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;