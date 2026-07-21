import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import {
  deleteAdminComment,
  getAdminComments,
  getAdminJourneys,
  replyAdminComment,
  type AdminLessonComment,
} from "@/lib/api";

const formatDate = (value: string | null) => {
  if (!value) return null;
  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const CommentsEditor = () => {
  const queryClient = useQueryClient();
  const [journeyId, setJourneyId] = useState<string>("all");
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});

  const { data: journeys } = useQuery({
    queryKey: ["admin-journeys"],
    queryFn: getAdminJourneys,
  });

  const commentsQueryKey = [
    "admin-comments",
    journeyId === "all" ? null : Number(journeyId),
  ] as const;

  const { data: comments, isLoading } = useQuery({
    queryKey: commentsQueryKey,
    queryFn: () =>
      getAdminComments(
        journeyId === "all" ? undefined : { journey_id: Number(journeyId) },
      ),
  });

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
  };

  const replyMutation = useMutation({
    mutationFn: ({ commentId, body }: { commentId: number; body: string }) =>
      replyAdminComment(commentId, body),
    onSuccess: (_result, variables) => {
      setReplyDrafts((prev) => ({ ...prev, [variables.commentId]: "" }));
      invalidate();
      toast.success("Resposta enviada.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: number) => deleteAdminComment(commentId),
    onSuccess: () => {
      invalidate();
      toast.success("Comentário removido.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const handleReply = (event: FormEvent, comment: AdminLessonComment) => {
    event.preventDefault();
    const body = (replyDrafts[comment.id] ?? "").trim();
    if (!body || replyMutation.isPending) return;
    replyMutation.mutate({ commentId: comment.id, body });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="font-serif text-3xl font-light text-foreground">Comentários</h2>
        <p className="text-muted-foreground mt-2">
          Veja comentários dos alunos, responda como admin e remova conteúdos inadequados.
        </p>
      </div>

      <div className="space-y-2 max-w-sm">
        <Label>Filtrar por jornada</Label>
        <Select value={journeyId} onValueChange={setJourneyId}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as jornadas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as jornadas</SelectItem>
            {journeys?.map((journey) => (
              <SelectItem key={journey.id} value={String(journey.id)}>
                {journey.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading && <p className="text-muted-foreground text-sm">Carregando...</p>}

      {!isLoading && comments?.length === 0 && (
        <p className="text-muted-foreground text-sm rounded-xl border border-dashed border-border px-4 py-8">
          Nenhum comentário encontrado.
        </p>
      )}

      {comments && comments.length > 0 && (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-xl border border-border bg-card px-4 py-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <p className="font-sans text-xs text-muted-foreground">
                    {[comment.lesson?.journey_title, comment.lesson?.module_title, comment.lesson?.title]
                      .filter(Boolean)
                      .join(" · ") || "Aula"}
                  </p>
                  <p className="font-sans text-sm font-medium text-foreground">
                    {comment.user.name}
                    {comment.user.email && (
                      <span className="ml-2 font-normal text-muted-foreground">
                        ({comment.user.email})
                      </span>
                    )}
                  </p>
                  {comment.created_at && (
                    <p className="font-sans text-xs text-muted-foreground">
                      {formatDate(comment.created_at)}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(comment.id)}
                  aria-label="Apagar comentário"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <p className="font-sans text-sm text-foreground whitespace-pre-wrap break-words">
                {comment.body}
              </p>

              {comment.replies && comment.replies.length > 0 && (
                <ul className="space-y-2 border-l border-border pl-3">
                  {comment.replies.map((reply) => (
                    <li
                      key={reply.id}
                      className="rounded-lg border border-border bg-muted/30 px-3 py-2"
                    >
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div className="min-w-0">
                          <p className="font-sans text-sm font-medium text-foreground">
                            {reply.user.name}
                            {reply.user.is_admin && (
                              <span className="ml-2 inline-flex items-center rounded-md border border-gold/30 bg-gold/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
                                Admin
                              </span>
                            )}
                          </p>
                          {reply.created_at && (
                            <p className="font-sans text-xs text-muted-foreground">
                              {formatDate(reply.created_at)}
                            </p>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                          disabled={deleteMutation.isPending}
                          onClick={() => deleteMutation.mutate(reply.id)}
                          aria-label="Apagar resposta"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="font-sans text-sm text-foreground whitespace-pre-wrap break-words">
                        {reply.body}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              <form onSubmit={(event) => handleReply(event, comment)} className="space-y-2 pt-1">
                <Label htmlFor={`reply-${comment.id}`} className="sr-only">
                  Responder
                </Label>
                <Textarea
                  id={`reply-${comment.id}`}
                  value={replyDrafts[comment.id] ?? ""}
                  onChange={(event) =>
                    setReplyDrafts((prev) => ({
                      ...prev,
                      [comment.id]: event.target.value,
                    }))
                  }
                  placeholder="Responder como admin..."
                  maxLength={2000}
                  rows={2}
                  className="font-sans resize-none"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={
                      !(replyDrafts[comment.id] ?? "").trim() || replyMutation.isPending
                    }
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {replyMutation.isPending ? "Enviando..." : "Responder"}
                  </Button>
                </div>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsEditor;
