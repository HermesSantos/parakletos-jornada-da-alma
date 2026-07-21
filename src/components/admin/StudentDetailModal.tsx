import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

function enrollmentProgressLabel(enrollment: AdminStudentEnrollment): string {
  const parts: string[] = [];

  if (enrollment.last_module_title) {
    parts.push(`Parou no módulo ${enrollment.last_module_title}`);
  } else if (enrollment.last_lesson_title) {
    parts.push(`Parou em ${enrollment.last_lesson_title}`);
  }

  const accessedAt = formatAccessDate(enrollment.last_accessed_at);
  if (accessedAt) {
    parts.push(`Último acesso ${accessedAt}`);
  }

  parts.push(
    `${enrollment.completed_lessons}/${enrollment.total_lessons} aulas (${enrollment.progress_percent}%)`,
  );

  return parts.join(" · ");
}

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
                  <div className="space-y-2">
                    {student.enrollments.map((enrollment) => (
                      <div
                        key={enrollment.id}
                        className="flex items-start justify-between gap-3 text-sm border border-border rounded-lg px-4 py-3"
                      >
                        <div className="min-w-0 space-y-1">
                          <p>
                            {enrollment.journey_title}{" "}
                            <span className="text-muted-foreground">({enrollment.source})</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {enrollmentProgressLabel(enrollment)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUnenroll(enrollment.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
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
