import { useState, useMemo } from "react";
import type { BlogPost, Comment } from "../types/types";
import { ACTUALITES } from "../data/data";
import type { BlogCategory, BlogSortType } from "../components/user/Blog/BlogFilter";

export function useBlog() {
  const allBlogs = ACTUALITES.filter((p) => p.type === "blog") as BlogPost[];
  const [posts, setPosts] = useState<BlogPost[]>(allBlogs);
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("all");
  const [activeSort, setActiveSort] = useState<BlogSortType>("recent");

  const filtered = useMemo(() => {
    let list = [...posts];

    // Filter by category
    if (activeCategory !== "all") {
      list = list.filter((p) => (p as BlogPost & { category?: string }).category === activeCategory);
    }

    // Sort
    if (activeSort === "recent") {
      list = list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (activeSort === "popular") {
      list = list.sort((a, b) => b.likes - a.likes);
    }

    return list;
  }, [posts, activeCategory, activeSort]);

  const togglePostLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return { ...p, likedByUser: !p.likedByUser, likes: p.likedByUser ? p.likes - 1 : p.likes + 1 };
      })
    );
  };

  const toggleCommentLike = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          comments: p.comments.map((c) =>
            c.id !== commentId
              ? c
              : { ...c, likedByUser: !c.likedByUser, likes: c.likedByUser ? c.likes - 1 : c.likes + 1 }
          ),
        };
      })
    );
  };

  const addComment = (postId: string, text: string, author: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author,
      text,
      date: new Date().toISOString(),
      likes: 0,
      likedByUser: false,
    };
    setPosts((prev) =>
      prev.map((p) => (p.id !== postId ? p : { ...p, comments: [...p.comments, newComment] }))
    );
  };

  return {
    posts: filtered,
    activeCategory,
    activeSort,
    setActiveCategory,
    setActiveSort,
    togglePostLike,
    toggleCommentLike,
    addComment,
  };
}