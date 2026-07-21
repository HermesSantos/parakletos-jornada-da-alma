import { BookOpen, Clock3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import type { AdminJourney, AdminStudent, AdminStudentEnrollment } from "@/lib/api";

type StudentDetailModalProps = {
  student: AdminStudent | undefined;
  journeys: AdminJourney[] | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnroll: (userId: number, journeyId: number) => void;
  onUnenroll: (enrollmentId: number) => void;
};

function formatAccessDate(value: string | null): string | null {
  if (!value) return null;
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return null;
  }
}

function progressTone(percent: number): string {
  if (percent >= 100) return "text-accent";
  if (percent >= 50) return "text-foreground";
  return "text-muted-foreground";
}

const EnrollmentCard = ({
  enrollment,
  onUnenroll,
}: {
  enrollment: AdminStudentEnrollment;
  onUnenroll: (enrollmentId: number) => void;
}) => {
  const percent = Math.max(0, Math.min(100, enrollment.progress_percent));
  const accessedAt = formatAccessDate(enrollment.last_accessed_at);
  const lastStop = enrollment.last_module_title
    ? enrollment.last_module_title
    : enrollment.last_lesson_title;

  return (
    <div className="rounded-xl border border-border bg-card px-4 py-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-serif text-lg text-foreground leading-tight">
            {enrollment.journey_title}
          </p>
          <p className="mt-0.5 font-sans text-xs uppercase tracking-wide text-muted-foreground">
            {enrollment.source}
          </p>
        </div>
        <div className="flex items-start gap-2 shrink-0">
          <div className="text-right">
            <p className={`font-serif text-3xl leading-none tabular-nums ${progressTone(percent)}`}>
              {percent}
              <span className="text-lg">%</span>
            </p>
            <p className="mt-1 font-sans text-[11px] text-muted-foreground">
              {enrollment.completed_lessons}/{enrollment.total_lessons} aulas com progresso
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
            onClick={() => onUnenroll(enrollment.id)}
            aria-label="Remover matrícula"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-1.5">
        <Progress value={percent} className="h-2.5" />
        <p className="font-sans text-[11px] text-muted-foreground">
          {percent >= 100 ? "Curso concluído" : percent > 0 ? "Em andamento" : "Ainda não iniciado"}
        </p>
      </div>

      {(lastStop || accessedAt) && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 border-t border-border/70">
          {lastStop && (
            <p className="inline-flex items-center gap-1.5 font-sans text-xs text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5 shrink-0" />
              Parou em {lastStop}
            </p>
          )}
          {accessedAt && (
            <p className="inline-flex items-center gap-1.5 font-sans text-xs text-muted-foreground">
              <Clock3 className="h-3.5 w-3.5 shrink-0" />
              Último acesso {accessedAt}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const StudentDetailModal = ({
  student,
  journeys,
  open,
  onOpenChange,
  onEnroll,
  onUnenroll,
}: StudentDetailModalProps) => {
  const availableJourneys = journeys?.filter(
    (journey) => !student?.enrollments.some((enrollment) => enrollment.journey_id === journey.id),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[95vw]">
        {student && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">{student.name}</DialogTitle>
              <DialogDescription className="text-base space-y-1">
                <span className="block">{student.email}</span>
                {student.whatsapp && <span className="block">WhatsApp: {student.whatsapp}</span>}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-medium">Matrículas</p>
                {student.enrollments.length === 0 && (
                  <p className="text-sm text-muted-foreground">Nenhuma matrícula.</p>
                )}
                {student.enrollments.length > 0 && (
                  <div className="space-y-3">
                    {student.enrollments.map((enrollment) => (
                      <EnrollmentCard
                        key={enrollment.id}
                        enrollment={enrollment}
                        onUnenroll={onUnenroll}
                      />
                    ))}
                  </div>
                )}
              </div>

              {availableJourneys && availableJourneys.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium">Adicionar matrícula</p>
                  <div className="flex flex-wrap gap-2">
                    {availableJourneys.map((journey) => (
                      <Button
                        key={journey.id}
                        variant="outline"
                        size="sm"
                        onClick={() => onEnroll(student.id, journey.id)}
                      >
                        + {journey.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailModal;
