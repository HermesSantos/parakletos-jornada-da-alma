import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Map, ArrowRight } from "lucide-react";
import { getStudentJourneys } from "@/lib/api";
import { ApiRequestError } from "@/lib/api";

const StudentDashboard = () => {
  const { data: journeys, isLoading, error } = useQuery({
    queryKey: ["student-journeys"],
    queryFn: getStudentJourneys,
  });

  if (isLoading) {
    return <p className="text-muted-foreground font-sans">Carregando suas jornadas...</p>;
  }

  if (error instanceof ApiRequestError && error.status === 403) {
    return (
      <div className="max-w-lg">
        <h2 className="font-serif text-2xl text-foreground mb-2">Nenhuma matrícula ativa</h2>
        <p className="text-muted-foreground font-sans text-sm">
          Sua conta ainda não está vinculada a uma jornada. Entre em contato com a equipe Parakletos
          ou aguarde a confirmação do seu pagamento.
        </p>
      </div>
    );
  }

  if (!journeys?.length) {
    return (
      <div className="max-w-lg">
        <h2 className="font-serif text-2xl text-foreground mb-2">Nenhuma jornada disponível</h2>
        <p className="text-muted-foreground font-sans text-sm">
          Você ainda não possui matrícula em nenhuma jornada.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">
        Minhas <span className="text-gradient-gold italic">Jornadas</span>
      </h1>
      <p className="text-muted-foreground font-sans text-sm mb-8">
        Selecione uma jornada para acessar vídeos e materiais em PDF.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {journeys.map((journey) => (
          <Link
            key={journey.id}
            to={`/aluno/jornadas/${journey.slug}`}
            className="group rounded-2xl border border-border bg-card p-6 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Map className="w-5 h-5 text-accent" />
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
            <h2 className="font-serif text-xl text-foreground mb-2">{journey.title}</h2>
            {journey.description && (
              <p className="text-sm text-muted-foreground font-sans line-clamp-3">
                {journey.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
