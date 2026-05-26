import React from "react";
import { Heart } from "lucide-react";
import type { Comment } from "../../../types/types";
import { relativeDate } from "./PlatformUtils";

interface CommentItemProps {
  comment: Comment;
  onLike: (id: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onLike }) => (
  <div className="flex gap-3">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-xs font-semibold text-navy">
      {comment.author.charAt(0)}
    </div>

    <div className="flex-1 min-w-0">
      <div className="rounded-2xl rounded-tl-sm bg-cream px-4 py-3">
        <p className="text-xs font-semibold text-navy">{comment.author}</p>
        <p className="mt-1 text-sm leading-relaxed text-navy/80">{comment.text}</p>
      </div>

      <div className="mt-1.5 flex items-center gap-4 pl-1">
        <button
          type="button"
          onClick={() => onLike(comment.id)}
          className={`flex items-center gap-1 text-xs font-medium transition-colors ${
            comment.likedByUser
              ? "text-rose-500"
              : "text-muted-foreground hover:text-rose-400"
          }`}
        >
          <Heart
            className={`h-3 w-3 ${comment.likedByUser ? "fill-rose-500" : ""}`}
          />
          {comment.likes > 0 && <span>{comment.likes}</span>}
          <span>J'aime</span>
        </button>
        <span className="text-[11px] text-muted-foreground">
          {relativeDate(comment.date)}
        </span>
      </div>
    </div>
  </div>
);

export default CommentItem;