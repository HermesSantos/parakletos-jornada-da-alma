import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Download, FileText, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { downloadLessonPdf, getStudentJourney, recordModuleProgress } from "@/lib/api";
import { getVideoEmbedUrl } from "@/lib/video-embed";
import LessonEngagement from "@/components/student/LessonEngagement";

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
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
        <Link to={`/aluno/jornadas/${slug}`}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {journey.title}
        </Link>
      </Button>

      <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
        Módulo {moduleIndex >= 0 ? moduleIndex + 1 : ""}
      </p>
      <h1 className="font-serif text-3xl text-foreground mb-8">{module.title}</h1>

      {embedUrl ? (
        <div className="mb-4 rounded-2xl overflow-hidden border border-border aspect-video bg-black">
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

      {activeVideo && (
        <h2 className="font-serif text-xl text-foreground mb-6">{activeVideo.title}</h2>
      )}

      {videoLessons.length > 1 && (
        <section className="mb-10">
          <h3 className="font-sans text-sm font-medium text-muted-foreground mb-3">Aulas em vídeo</h3>
          <div className="space-y-2">
            {videoLessons.map((lesson) => {
              const isActive = activeVideo?.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setSelectedVideoId(lesson.id)}
                  className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                    isActive
                      ? "border-gold/40 bg-gold/5"
                      : "border-border bg-card hover:bg-muted/50"
                  }`}
                >
                  <Play className={`w-4 h-4 shrink-0 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
                  <span className="font-sans text-sm text-foreground truncate">{lesson.title}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {activeVideo && <LessonEngagement lessonId={activeVideo.id} />}

      <section>
        <h3 className="font-serif text-2xl text-foreground mb-2">Material de apoio</h3>
        <p className="font-sans text-sm text-muted-foreground mb-4">
          Baixe os materiais complementares deste módulo.
        </p>

        {pdfLessons.length > 0 ? (
          <div className="space-y-2">
            {pdfLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-4 h-4 text-accent shrink-0" />
                  <span className="font-sans text-sm text-foreground truncate">{lesson.title}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={downloadingId === lesson.id}
                  onClick={() => handleDownloadPdf(lesson.id, lesson.title)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {downloadingId === lesson.id ? "Baixando..." : "Baixar PDF"}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-sans text-sm text-muted-foreground rounded-xl border border-dashed border-border px-4 py-6">
            Ainda não há material de apoio neste módulo.
          </p>
        )}
      </section>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
        {previousModule ? (
          <Button variant="ghost" asChild className="-ml-2">
            <Link to={`/aluno/jornadas/${slug}/modulos/${previousModule.id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Módulo anterior
            </Link>
          </Button>
        ) : (
          <Button variant="ghost" asChild className="-ml-2">
            <Link to={`/aluno/jornadas/${slug}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à jornada
            </Link>
          </Button>
        )}

        {nextModule ? (
          <Button asChild>
            <Link to={`/aluno/jornadas/${slug}/modulos/${nextModule.id}`}>
              Próximo módulo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        ) : (
          <p className="font-sans text-sm text-muted-foreground">Você chegou ao fim desta jornada.</p>
        )}
      </div>
    </div>
  );
};

export default ModuleDetailPage;
