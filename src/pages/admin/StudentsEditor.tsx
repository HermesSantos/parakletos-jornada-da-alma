import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import StudentDetailModal from "@/components/admin/StudentDetailModal";
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
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

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

  const selectedStudent = students?.find((student) => student.id === selectedStudentId);

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
        {!studentsLoading && students?.length === 0 && (
          <p className="text-muted-foreground text-sm">Nenhum aluno cadastrado.</p>
        )}
        {students && students.length > 0 && (
          <ul className="divide-y divide-border border border-border rounded-lg">
            {students.map((student) => (
              <li key={student.id}>
                <button
                  type="button"
                  onClick={() => setSelectedStudentId(student.id)}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-foreground">{student.name}</span>
                  <span className="block text-muted-foreground mt-0.5">
                    {student.email}
                    {student.whatsapp ? ` · ${student.whatsapp}` : ""}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <StudentDetailModal
        student={selectedStudent}
        journeys={journeys}
        open={selectedStudentId !== null}
        onOpenChange={(open) => !open && setSelectedStudentId(null)}
        onEnroll={(userId, journeyId) => enrollMutation.mutate({ userId, journeyId })}
        onUnenroll={(enrollmentId) => unenrollMutation.mutate(enrollmentId)}
      />
    </div>
  );
};

export default StudentsEditor;
