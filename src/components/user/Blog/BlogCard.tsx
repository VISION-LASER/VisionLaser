import React, { useState } from "react";
import { Heart, MessageCircle, ChevronDown, ChevronUp, Send, BookOpen } from "lucide-react";
import type { BlogPost } from "../../../types/types";
import CommentItem from "./CommentItem";
import { formatCount, relativeDate } from "./PlatformUtils";
 
interface BlogCardProps {
  post: BlogPost;
  onLike: (id: string) => void;
  onCommentLike: (postId: string, commentId: string) => void;
  onAddComment: (postId: string, text: string, author: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  post,
  onLike,
  onCommentLike,
  onAddComment,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !authorName.trim()) return;
    onAddComment(post.id, commentText.trim(), authorName.trim());
    setCommentText("");
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-navy">
            <BookOpen className="h-3 w-3" />
            Article
          </span>
          <span className="text-xs text-muted-foreground">
            {relativeDate(post.date)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        {/* Author */}
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-navy">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{post.author.role}</p>
          </div>
        </div>

        <h3 className="text-lg font-medium leading-snug text-navy">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        {/* Full content */}
        {expanded && (
          <div className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-navy/80 whitespace-pre-line">
            {post.content}
          </div>
        )}

        {/* Read more */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 flex items-center gap-1 text-sm font-medium text-navy underline-offset-2 hover:underline"
        >
          {expanded ? (
            <>
              Réduire <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Lire la suite <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cream px-2.5 py-0.5 text-[11px] text-navy/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions bar */}
      <div className="flex items-center gap-1 border-t border-border px-4 py-2">
        {/* Like post */}
        <button
          type="button"
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            post.likedByUser
              ? "bg-rose-50 text-rose-500"
              : "text-muted-foreground hover:bg-cream hover:text-navy"
          }`}
        >
          <Heart
            className={`h-4 w-4 ${post.likedByUser ? "fill-rose-500" : ""}`}
          />
          {formatCount(post.likes)}
          <span className="hidden sm:inline">
            {post.likedByUser ? "J'aime" : "J'aime"}
          </span>
        </button>

        {/* Toggle comments */}
        <button
          type="button"
          onClick={() => setShowComments((v) => !v)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-cream hover:text-navy"
        >
          <MessageCircle className="h-4 w-4" />
          {post.comments.length}
          <span className="hidden sm:inline">Commentaires</span>
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="border-t border-border px-6 py-5 space-y-4">
          {post.comments.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Aucun commentaire pour l'instant.
            </p>
          )}

          {post.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onLike={(cid) => onCommentLike(post.id, cid)}
            />
          ))}

          {/* Add comment form */}
          <form onSubmit={handleSubmit} className="pt-2 space-y-2">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Votre prénom"
              className="w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Écrire un commentaire…"
                className="flex-1 rounded-xl border border-border bg-cream px-4 py-2.5 text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy"
              />
              <button
                type="submit"
                disabled={!commentText.trim() || !authorName.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-white transition-opacity disabled:opacity-40"
                aria-label="Envoyer le commentaire"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </article>
  );
};

export default BlogCard;