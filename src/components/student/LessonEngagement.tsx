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

type LessonIdProps = {
  lessonId: number;
};

const engagementKey = (lessonId: number) => ["lesson-engagement", lessonId] as const;

const formatDate = (value: string | null) => {
  if (!value) return null;
  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export const LessonLikeButton = ({ lessonId }: LessonIdProps) => {
  const queryClient = useQueryClient();
  const queryKey = engagementKey(lessonId);

  const { data } = useQuery({
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

  const likesCount = data?.likes_count ?? 0;
  const likedByMe = data?.liked_by_me ?? false;

  return (
    <button
      type="button"
      disabled={likeMutation.isPending}
      onClick={() => likeMutation.mutate()}
      aria-pressed={likedByMe}
      className={`inline-flex items-center gap-1.5 font-sans text-sm transition-colors disabled:opacity-50 ${
        likedByMe ? "text-accent" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Heart className={`h-4 w-4 ${likedByMe ? "fill-current" : ""}`} />
      <span>{likesCount > 0 ? likesCount : "Curtir"}</span>
    </button>
  );
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
  <li className={nested ? "pt-3" : "py-4"}>
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-sans text-sm font-medium text-foreground">{comment.user.name}</span>
          {comment.user.is_admin && (
            <span className="font-sans text-[10px] font-medium uppercase tracking-wide text-accent">
              Admin
            </span>
          )}
          {comment.created_at && (
            <span className="font-sans text-xs text-muted-foreground">
              {formatDate(comment.created_at)}
            </span>
          )}
        </div>
        <p className="font-sans text-sm text-muted-foreground whitespace-pre-wrap break-words">
          {comment.body}
        </p>
      </div>
      {comment.is_mine && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 shrink-0 p-0 text-muted-foreground hover:text-destructive"
          disabled={deleting}
          onClick={() => onDelete(comment.id)}
          aria-label="Apagar comentário"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
    {!nested && comment.replies && comment.replies.length > 0 && (
      <ul className="mt-1 space-y-0 border-l border-border/60 pl-4">
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

const LessonComments = ({ lessonId }: LessonIdProps) => {
  const queryClient = useQueryClient();
  const [body, setBody] = useState("");
  const queryKey = engagementKey(lessonId);

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => getLessonEngagement(lessonId),
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
    return <p className="font-sans text-sm text-muted-foreground">Carregando comentários...</p>;
  }

  const comments = data?.comments ?? [];

  return (
    <section>
      <h3 className="font-sans text-sm font-medium text-foreground mb-4">
        Comentários{comments.length > 0 ? ` ${comments.length}` : ""}
      </h3>

      <form onSubmit={handleSubmit} className="mb-2 space-y-3">
        <Textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Comente algo sobre a aula."
          maxLength={2000}
          rows={2}
          className="font-sans resize-none border-border/70 bg-transparent"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            size="sm"
            variant="ghost"
            disabled={!body.trim() || commentMutation.isPending}
            className="text-muted-foreground hover:text-foreground"
          >
            {commentMutation.isPending ? "Enviando..." : "Comentar"}
          </Button>
        </div>
      </form>

      {comments.length > 0 ? (
        <ul className="divide-y divide-border/60">
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
        <p className="font-sans text-sm text-muted-foreground py-4">
          Seja o primeiro a comentar nesta aula.
        </p>
      )}
    </section>
  );
};

export default LessonComments;
