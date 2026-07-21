import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import {
  createLessonComment,
  deleteLessonComment,
  getLessonEngagement,
  toggleLessonLike,
  type LessonComment,
  type LessonEngagement as LessonEngagementData,
} from "@/lib/api";

type LessonEngagementProps = {
  lessonId: number;
};

const formatDate = (value: string | null) => {
  if (!value) return null;
  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const CommentItem = ({
  comment,
  onDelete,
  deleting,
  nested = false,
}: {
  comment: LessonComment;
  onDelete: (commentId: number) => void;
  deleting: boolean;
  nested?: boolean;
}) => (
  <li
    className={`rounded-xl border border-border bg-card px-4 py-3 ${nested ? "bg-muted/30" : ""}`}
  >
    <div className="flex items-start justify-between gap-3 mb-1">
      <div className="min-w-0">
        <p className="font-sans text-sm font-medium text-foreground truncate">
          {comment.user.name}
          {comment.user.is_admin && (
            <span className="ml-2 inline-flex items-center rounded-md border border-gold/30 bg-gold/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
              Admin
            </span>
          )}
        </p>
        {comment.created_at && (
          <p className="font-sans text-xs text-muted-foreground">{formatDate(comment.created_at)}</p>
        )}
      </div>
      {comment.is_mine && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="shrink-0 text-muted-foreground hover:text-destructive"
          disabled={deleting}
          onClick={() => onDelete(comment.id)}
          aria-label="Apagar comentário"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
    <p className="font-sans text-sm text-foreground whitespace-pre-wrap break-words">{comment.body}</p>
    {!nested && comment.replies && comment.replies.length > 0 && (
      <ul className="mt-3 space-y-2 border-l border-border pl-3">
        {comment.replies.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            onDelete={onDelete}
            deleting={deleting}
            nested
          />
        ))}
      </ul>
    )}
  </li>
);

const LessonEngagement = ({ lessonId }: LessonEngagementProps) => {
  const queryClient = useQueryClient();
  const [body, setBody] = useState("");
  const queryKey = ["lesson-engagement", lessonId] as const;

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => getLessonEngagement(lessonId),
  });

  const likeMutation = useMutation({
    mutationFn: () => toggleLessonLike(lessonId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<LessonEngagementData>(queryKey);

      if (previous) {
        const liked = !previous.liked_by_me;
        queryClient.setQueryData<LessonEngagementData>(queryKey, {
          ...previous,
          liked_by_me: liked,
          likes_count: Math.max(0, previous.likes_count + (liked ? 1 : -1)),
        });
      }

      return { previous };
    },
    onError: (_error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
      toast.error("Não foi possível atualizar a curtida.");
    },
    onSuccess: (result) => {
      queryClient.setQueryData<LessonEngagementData>(queryKey, (current) =>
        current
          ? {
              ...current,
              liked_by_me: result.liked,
              likes_count: result.likes_count,
            }
          : current,
      );
    },
  });

  const commentMutation = useMutation({
    mutationFn: (commentBody: string) => createLessonComment(lessonId, commentBody),
    onSuccess: (comment) => {
      setBody("");
      queryClient.setQueryData<LessonEngagementData>(queryKey, (current) =>
        current
          ? {
              ...current,
              comments: [...current.comments, { ...comment, replies: comment.replies ?? [] }],
            }
          : current,
      );
    },
    onError: () => {
      toast.error("Não foi possível enviar o comentário.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: number) => deleteLessonComment(lessonId, commentId),
    onSuccess: (_result, commentId) => {
      queryClient.setQueryData<LessonEngagementData>(queryKey, (current) =>
        current
          ? {
              ...current,
              comments: current.comments.filter((item) => item.id !== commentId),
            }
          : current,
      );
    },
    onError: () => {
      toast.error("Não foi possível apagar o comentário.");
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = body.trim();
    if (!trimmed || commentMutation.isPending) return;
    commentMutation.mutate(trimmed);
  };

  if (isLoading && !data) {
    return (
      <p className="font-sans text-sm text-muted-foreground mb-8">Carregando interações...</p>
    );
  }

  const likesCount = data?.likes_count ?? 0;
  const likedByMe = data?.liked_by_me ?? false;
  const comments = data?.comments ?? [];

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={likeMutation.isPending}
          onClick={() => likeMutation.mutate()}
          className={likedByMe ? "border-gold/40 bg-gold/5 text-accent" : undefined}
          aria-pressed={likedByMe}
        >
          <Heart className={`w-4 h-4 mr-2 ${likedByMe ? "fill-current" : ""}`} />
          {likedByMe ? "Curtido" : "Curtir"}
          {likesCount > 0 ? ` · ${likesCount}` : ""}
        </Button>
      </div>

      <h3 className="font-sans text-sm font-medium text-muted-foreground mb-3">
        Comentários{comments.length > 0 ? ` (${comments.length})` : ""}
      </h3>

      <form onSubmit={handleSubmit} className="mb-4 space-y-3">
        <Textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Escreva um comentário..."
          maxLength={2000}
          rows={3}
          className="font-sans resize-none"
        />
        <div className="flex justify-end">
          <Button type="submit" size="sm" disabled={!body.trim() || commentMutation.isPending}>
            {commentMutation.isPending ? "Enviando..." : "Comentar"}
          </Button>
        </div>
      </form>

      {comments.length > 0 ? (
        <ul className="space-y-3">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={(commentId) => deleteMutation.mutate(commentId)}
              deleting={deleteMutation.isPending}
            />
          ))}
        </ul>
      ) : (
        <p className="font-sans text-sm text-muted-foreground rounded-xl border border-dashed border-border px-4 py-6">
          Seja o primeiro a comentar nesta aula.
        </p>
      )}
    </section>
  );
};

export default LessonEngagement;
