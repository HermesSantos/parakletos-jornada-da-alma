import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, FileText, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStudentJourney } from "@/lib/api";

const JourneyContentPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: journey, isLoading } = useQuery({
    queryKey: ["student-journey", slug],
    queryFn: () => getStudentJourney(slug!),
    enabled: !!slug,
  });

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

      <div className="space-y-3">
        {journey.modules.map((module, index) => {
          const videoCount = module.lessons.filter((lesson) => lesson.type === "video").length;
          const pdfCount = module.lessons.filter((lesson) => lesson.type === "pdf").length;

          return (
            <Link
              key={module.id}
              to={`/aluno/jornadas/${slug}/modulos/${module.id}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 hover:border-gold/40 hover:bg-muted/40 transition-colors"
            >
              <div className="min-w-0">
                <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">
                  Módulo {index + 1}
                </p>
                <h2 className="font-serif text-lg text-foreground truncate">{module.title}</h2>
                <p className="mt-1 font-sans text-xs text-muted-foreground flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    {videoCount} {videoCount === 1 ? "vídeo" : "vídeos"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {pdfCount} {pdfCount === 1 ? "material" : "materiais"}
                  </span>
                </p>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-accent transition-colors" />
            </Link>
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
