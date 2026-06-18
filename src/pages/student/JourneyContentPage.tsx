import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronDown, ChevronRight, Download, FileText, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { downloadLessonPdf, getStudentJourney } from "@/lib/api";
import { getVideoEmbedUrl } from "@/lib/video-embed";

const JourneyContentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({});
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const { data: journey, isLoading } = useQuery({
    queryKey: ["student-journey", slug],
    queryFn: () => getStudentJourney(slug!),
    enabled: !!slug,
  });

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

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
    return <p className="text-muted-foreground font-sans">Carregando conteúdo...</p>;
  }

  if (!journey) {
    return (
      <div>
        <p className="text-muted-foreground font-sans">Jornada não encontrada.</p>
        <Button variant="link" asChild className="px-0 mt-2">
          <Link to="/aluno">Voltar</Link>
        </Button>
      </div>
    );
  }

  const activeLesson = journey.modules
    .flatMap((m) => m.lessons)
    .find((l) => l.id === activeVideoId && l.type === "video");

  const embedUrl = activeLesson?.video_url ? getVideoEmbedUrl(activeLesson.video_url) : null;

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
        <Link to="/aluno">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Minhas jornadas
        </Link>
      </Button>

      <h1 className="font-serif text-3xl text-foreground mb-2">{journey.title}</h1>
      {journey.description && (
        <p className="text-muted-foreground font-sans text-sm mb-8">{journey.description}</p>
      )}

      {embedUrl && (
        <div className="mb-8 rounded-2xl overflow-hidden border border-border aspect-video bg-black">
          <iframe
            src={embedUrl}
            title={activeLesson?.title ?? "Vídeo"}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="space-y-4">
        {journey.modules.map((module) => {
          const isExpanded = expandedModules[module.id] ?? true;

          return (
            <div key={module.id} className="rounded-2xl border border-border bg-card overflow-hidden">
              <button
                type="button"
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-serif text-lg text-foreground">{module.title}</span>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-border divide-y divide-border">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        {lesson.type === "video" ? (
                          <Play className="w-4 h-4 text-accent shrink-0" />
                        ) : (
                          <FileText className="w-4 h-4 text-accent shrink-0" />
                        )}
                        <span className="font-sans text-sm text-foreground truncate">
                          {lesson.title}
                        </span>
                      </div>

                      {lesson.type === "video" && lesson.video_url && (
                        <Button
                          size="sm"
                          variant={activeVideoId === lesson.id ? "default" : "outline"}
                          onClick={() => setActiveVideoId(lesson.id)}
                        >
                          Assistir
                        </Button>
                      )}

                      {lesson.type === "pdf" && (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={downloadingId === lesson.id}
                          onClick={() => handleDownloadPdf(lesson.id, lesson.title)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {downloadingId === lesson.id ? "Baixando..." : "Baixar PDF"}
                        </Button>
                      )}
                    </div>
                  ))}

                  {module.lessons.length === 0 && (
                    <p className="p-4 text-sm text-muted-foreground font-sans">
                      Nenhuma aula neste módulo ainda.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {journey.modules.length === 0 && (
          <p className="text-muted-foreground font-sans text-sm">
            O conteúdo desta jornada ainda está sendo preparado.
          </p>
        )}
      </div>
    </div>
  );
};

export default JourneyContentPage;
