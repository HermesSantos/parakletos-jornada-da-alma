import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Download, FileText, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { downloadLessonPdf, getStudentJourney, recordLessonProgress, recordModuleProgress } from "@/lib/api";
import { getVideoEmbedUrl } from "@/lib/video-embed";
import LessonComments, { LessonLikeButton } from "@/components/student/LessonEngagement";

const ModuleDetailPage = () => {
  const { slug, moduleId } = useParams<{ slug: string; moduleId: string }>();
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const { data: journey, isLoading } = useQuery({
    queryKey: ["student-journey", slug],
    queryFn: () => getStudentJourney(slug!),
    enabled: !!slug,
  });

  const module = useMemo(() => {
    if (!journey || !moduleId) return null;
    return journey.modules.find((item) => item.id === Number(moduleId)) ?? null;
  }, [journey, moduleId]);

  const moduleIndex = useMemo(() => {
    if (!journey || !module) return -1;
    return journey.modules.findIndex((item) => item.id === module.id);
  }, [journey, module]);

  const nextModule = moduleIndex >= 0 ? journey?.modules[moduleIndex + 1] ?? null : null;
  const previousModule = moduleIndex > 0 ? journey?.modules[moduleIndex - 1] ?? null : null;

  const videoLessons = useMemo(
    () => module?.lessons.filter((lesson) => lesson.type === "video" && lesson.video_url) ?? [],
    [module],
  );

  const pdfLessons = useMemo(
    () => module?.lessons.filter((lesson) => lesson.type === "pdf") ?? [],
    [module],
  );

  const activeVideo =
    videoLessons.find((lesson) => lesson.id === selectedVideoId) ?? videoLessons[0] ?? null;

  const embedUrl = activeVideo?.video_url ? getVideoEmbedUrl(activeVideo.video_url) : null;

  useEffect(() => {
    setSelectedVideoId(null);
  }, [moduleId]);

  useEffect(() => {
    if (!moduleId) return;

    const id = Number(moduleId);
    if (Number.isNaN(id)) return;

    void recordModuleProgress(id).catch(() => {
      // Progress tracking is best-effort; do not block watching.
    });
  }, [moduleId]);

  useEffect(() => {
    if (!activeVideo?.id) return;

    void recordLessonProgress(activeVideo.id, true).catch(() => {
      // Progress tracking is best-effort; do not block watching.
    });
  }, [activeVideo?.id]);

  const handleDownloadPdf = async (lessonId: number, title: string) => {
    setDownloadingId(lessonId);
    try {
      const blob = await downloadLessonPdf(lessonId);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${title}.pdf`;
      anchor.click();
      URL.revokeObjectURL(url);
      void recordLessonProgress(lessonId, true).catch(() => {
        // Progress tracking is best-effort.
      });
    } catch {
      toast.error("Não foi possível baixar o PDF.");
    } finally {
      setDownloadingId(null);
    }
  };

  if (isLoading) {
    return <p className="text-muted-foreground font-sans">Carregando módulo...</p>;
  }

  if (!journey || !module) {
    return (
      <div>
        <p className="text-muted-foreground font-sans">Módulo não encontrado.</p>
        <Button variant="link" asChild className="px-0 mt-2">
          <Link to={slug ? `/aluno/jornadas/${slug}` : "/aluno"}>Voltar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2 text-muted-foreground">
        <Link to={`/aluno/jornadas/${slug}`}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {journey.title}
        </Link>
      </Button>

      <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
        Módulo {moduleIndex >= 0 ? moduleIndex + 1 : ""}
      </p>
      <h1 className="font-serif text-3xl text-foreground mb-6">{module.title}</h1>

      {embedUrl ? (
        <div className="mb-4 overflow-hidden rounded-2xl border border-border aspect-video bg-black">
          <iframe
            src={embedUrl}
            title={activeVideo?.title ?? "Vídeo"}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="mb-4 flex aspect-video items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30">
          <p className="font-sans text-sm text-muted-foreground">
            Nenhum vídeo disponível neste módulo.
          </p>
        </div>
      )}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex items-center gap-4">
          {activeVideo && (
            <h2 className="font-serif text-lg text-foreground truncate">{activeVideo.title}</h2>
          )}
          {activeVideo && <LessonLikeButton lessonId={activeVideo.id} />}
        </div>

        <div className="flex items-center gap-1">
          {previousModule ? (
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
              <Link to={`/aluno/jornadas/${slug}/modulos/${previousModule.id}`}>
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Anterior
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
              <Link to={`/aluno/jornadas/${slug}`}>
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Jornada
              </Link>
            </Button>
          )}
          {nextModule && (
            <Button
              asChild
              className="h-10 px-5 text-sm bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link to={`/aluno/jornadas/${slug}/modulos/${nextModule.id}`}>
                Próximo
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {videoLessons.length > 1 && (
        <section className="mb-8">
          <div className="space-y-1">
            {videoLessons.map((lesson) => {
              const isActive = activeVideo?.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setSelectedVideoId(lesson.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                    isActive
                      ? "bg-muted/60 text-foreground"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  <Play className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-accent" : ""}`} />
                  <span className="font-sans text-sm truncate">{lesson.title}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section className="mb-10">
        <h3 className="font-sans text-sm font-medium text-foreground mb-3">Materiais</h3>
        {pdfLessons.length > 0 ? (
          <ul className="space-y-2">
            {pdfLessons.map((lesson) => (
              <li key={lesson.id} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="font-sans text-sm text-foreground truncate">{lesson.title}</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="shrink-0 text-muted-foreground hover:text-foreground"
                  disabled={downloadingId === lesson.id}
                  onClick={() => handleDownloadPdf(lesson.id, lesson.title)}
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  {downloadingId === lesson.id ? "Baixando..." : "Baixar"}
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-sans text-sm text-muted-foreground">
            Ainda não há material de apoio neste módulo.
          </p>
        )}
      </section>

      {activeVideo && <LessonComments lessonId={activeVideo.id} />}
    </div>
  );
};

export default ModuleDetailPage;
