// import { useState, useMemo } from "react";
// import type { ActualitePost, BlogPost, FilterType, Comment } from "../types/types";
// import { ACTUALITES } from "../data/data";

// export function useActualites() {
//   const [posts, setPosts] = useState<ActualitePost[]>(ACTUALITES);
//   const [filter, setFilter] = useState<FilterType>("all");
//   const [expandedPost, setExpandedPost] = useState<string | null>(null);

//   // ── Filtrage ────────────────────────────────────────────────────────────
//   const filtered = useMemo(() => {
//     let list = [...posts];

//     if (filter === "video") {
//       list = list.filter((p) => p.type === "video");
//     } else if (filter === "blog") {
//       list = list.filter((p) => p.type === "blog");
//     } else if (filter === "popular") {
//       list = [...list].sort((a, b) => b.likes - a.likes);
//     } else if (filter === "recent") {
//       list = [...list].sort(
//         (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//       );
//     }

//     return list;
//   }, [posts, filter]);

//   // ── Like / unlike un post ───────────────────────────────────────────────
//   const togglePostLike = (id: string) => {
//     setPosts((prev) =>
//       prev.map((p) => {
//         if (p.id !== id || p.type !== "blog") return p;
//         const blog = p as BlogPost;
//         return {
//           ...blog,
//           likedByUser: !blog.likedByUser,
//           likes: blog.likedByUser ? blog.likes - 1 : blog.likes + 1,
//         };
//       })
//     );
//   };

//   // ── Like / unlike un commentaire ────────────────────────────────────────
//   const toggleCommentLike = (postId: string, commentId: string) => {
//     setPosts((prev) =>
//       prev.map((p) => {
//         if (p.id !== postId || p.type !== "blog") return p;
//         const blog = p as BlogPost;
//         return {
//           ...blog,
//           comments: blog.comments.map((c) => {
//             if (c.id !== commentId) return c;
//             return {
//               ...c,
//               likedByUser: !c.likedByUser,
//               likes: c.likedByUser ? c.likes - 1 : c.likes + 1,
//             };
//           }),
//         };
//       })
//     );
//   };

//   // ── Ajouter un commentaire ──────────────────────────────────────────────
//   const addComment = (postId: string, text: string, author: string) => {
//     const newComment: Comment = {
//       id: `c-${Date.now()}`,
//       author,
//       text,
//       date: new Date().toISOString(),
//       likes: 0,
//       likedByUser: false,
//     };
//     setPosts((prev) =>
//       prev.map((p) => {
//         if (p.id !== postId || p.type !== "blog") return p;
//         const blog = p as BlogPost;
//         return { ...blog, comments: [...blog.comments, newComment] };
//       })
//     );
//   };

//   return {
//     posts: filtered,
//     filter,
//     setFilter,
//     expandedPost,
//     setExpandedPost,
//     togglePostLike,
//     toggleCommentLike,
//     addComment,
//   };
// }

import { useState, useEffect, useMemo } from "react";
import { actualiteService } from "../services/actualiteService";
import type { Actualite } from "../services/actualiteService";

// Types pour le filtrage (adaptés à vos données réelles)
export type FilterType = "all" | "recent" | "video" | "image";

export function useActualites() {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  // Charger les actualités depuis l'API
  const loadActualites = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await actualiteService.getAll();
      setActualites(data);
    } catch (err) {
      setError("Impossible de charger les actualités");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActualites();
  }, []);

  // Filtrer les actualités
  const filteredActualites = useMemo(() => {
    let list = [...actualites];

    if (filter === "video") {
      list = list.filter((a) => a.video_actualite && a.video_actualite.trim() !== '');
    } else if (filter === "image") {
      list = list.filter((a) => a.image_actualite && a.image_actualite.trim() !== '');
    } else if (filter === "recent") {
      list = [...list].sort(
        (a, b) => new Date(b.date_publication).getTime() - new Date(a.date_publication).getTime()
      );
    }

    return list;
  }, [actualites, filter]);

  return {
    actualites: filteredActualites,
    allActualites: actualites,
    loading,
    error,
    filter,
    setFilter,
    refetch: loadActualites,
  };
}