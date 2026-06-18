import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";
import {
  createAdminStudent,
  createEnrollment,
  deleteEnrollment,
  getAdminJourneys,
  getAdminStudents,
} from "@/lib/api";

const StudentsEditor = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedJourneyIds, setSelectedJourneyIds] = useState<number[]>([]);

  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ["admin-students"],
    queryFn: getAdminStudents,
  });

  const { data: journeys } = useQuery({
    queryKey: ["admin-journeys"],
    queryFn: getAdminJourneys,
  });

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin-students"] });
  };

  const createStudentMutation = useMutation({
    mutationFn: () =>
      createAdminStudent({
        name,
        email,
        password,
        journey_ids: selectedJourneyIds,
      }),
    onSuccess: () => {
      setName("");
      setEmail("");
      setPassword("");
      setSelectedJourneyIds([]);
      invalidate();
      toast.success("Aluno criado com sucesso.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const enrollMutation = useMutation({
    mutationFn: ({ userId, journeyId }: { userId: number; journeyId: number }) =>
      createEnrollment(userId, journeyId),
    onSuccess: () => {
      invalidate();
      toast.success("Matrícula adicionada.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const unenrollMutation = useMutation({
    mutationFn: (enrollmentId: number) => deleteEnrollment(enrollmentId),
    onSuccess: () => {
      invalidate();
      toast.success("Matrícula removida.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createStudentMutation.mutate();
  };

  const toggleJourney = (journeyId: number) => {
    setSelectedJourneyIds((prev) =>
      prev.includes(journeyId) ? prev.filter((id) => id !== journeyId) : [...prev, journeyId],
    );
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="font-serif text-3xl font-light text-foreground">Alunos</h2>
        <p className="text-muted-foreground mt-2">
          Crie contas de aluno e gerencie matrículas por jornada.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Novo aluno</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="student-name">Nome</Label>
                <Input
                  id="student-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-email">E-mail</Label>
                <Input
                  id="student-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-password">Senha</Label>
              <Input
                id="student-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            {journeys && journeys.length > 0 && (
              <div className="space-y-2">
                <Label>Matricular em</Label>
                <div className="space-y-2">
                  {journeys.map((journey) => (
                    <label key={journey.id} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={selectedJourneyIds.includes(journey.id)}
                        onCheckedChange={() => toggleJourney(journey.id)}
                      />
                      {journey.title}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <Button type="submit" disabled={createStudentMutation.isPending}>
              <Plus className="w-4 h-4 mr-2" />
              Criar aluno
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-serif text-xl">Alunos cadastrados</h3>
        {studentsLoading && <p className="text-muted-foreground text-sm">Carregando...</p>}
        {students?.map((student) => (
          <Card key={student.id}>
            <CardHeader>
              <CardTitle className="text-base font-sans">{student.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm font-medium">Matrículas</p>
              {student.enrollments.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhuma matrícula.</p>
              )}
              {student.enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="flex items-center justify-between text-sm border border-border rounded-lg px-3 py-2"
                >
                  <span>
                    {enrollment.journey_title}{" "}
                    <span className="text-muted-foreground">({enrollment.source})</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => unenrollMutation.mutate(enrollment.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {journeys && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {journeys
                    .filter(
                      (j) => !student.enrollments.some((e) => e.journey_id === j.id),
                    )
                    .map((journey) => (
                      <Button
                        key={journey.id}
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          enrollMutation.mutate({ userId: student.id, journeyId: journey.id })
                        }
                      >
                        + {journey.title}
                      </Button>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentsEditor;
