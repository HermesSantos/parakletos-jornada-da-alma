import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PdfUploadField from "@/components/admin/PdfUploadField";
import { toast } from "@/components/ui/sonner";
import {
  createAdminLesson,
  createAdminModule,
  deleteAdminLesson,
  deleteAdminModule,
  getAdminJourneys,
  updateAdminLesson,
  type AdminJourney,
  type StudentLesson,
  type StudentModule,
} from "@/lib/api";

type LessonDraft = {
  title: string;
  type: "video" | "pdf";
  video_url: string;
  pdf_path: string;
};

const emptyLesson = (): LessonDraft => ({
  title: "",
  type: "video",
  video_url: "",
  pdf_path: "",
});

const StudentContentEditor = () => {
  const queryClient = useQueryClient();
  const [selectedJourneyId, setSelectedJourneyId] = useState<string>("");
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [lessonDrafts, setLessonDrafts] = useState<Record<number, LessonDraft>>({});

  const { data: journeys, isLoading } = useQuery({
    queryKey: ["admin-journeys"],
    queryFn: getAdminJourneys,
  });

  const selectedJourney = journeys?.find((j) => String(j.id) === selectedJourneyId);

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin-journeys"] });
  };

  const createModuleMutation = useMutation({
    mutationFn: (title: string) =>
      createAdminModule(Number(selectedJourneyId), {
        title,
        sort_order: selectedJourney?.modules.length ?? 0,
      }),
    onSuccess: () => {
      setNewModuleTitle("");
      invalidate();
      toast.success("Módulo criado.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteModuleMutation = useMutation({
    mutationFn: (moduleId: number) => deleteAdminModule(Number(selectedJourneyId), moduleId),
    onSuccess: () => {
      invalidate();
      toast.success("Módulo removido.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const createLessonMutation = useMutation({
    mutationFn: ({ moduleId, draft }: { moduleId: number; draft: LessonDraft }) =>
      createAdminLesson(Number(selectedJourneyId), moduleId, {
        title: draft.title,
        type: draft.type,
        video_url: draft.type === "video" ? draft.video_url : null,
        pdf_path: draft.type === "pdf" ? draft.pdf_path : null,
      }),
    onSuccess: (_, { moduleId }) => {
      setLessonDrafts((prev) => ({ ...prev, [moduleId]: emptyLesson() }));
      invalidate();
      toast.success("Aula criada.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updateLessonMutation = useMutation({
    mutationFn: ({
      moduleId,
      lesson,
      data,
    }: {
      moduleId: number;
      lesson: StudentLesson;
      data: Partial<LessonDraft>;
    }) =>
      updateAdminLesson(Number(selectedJourneyId), moduleId, lesson.id, {
        title: data.title ?? lesson.title,
        type: data.type ?? lesson.type,
        video_url: (data.type ?? lesson.type) === "video" ? (data.video_url ?? lesson.video_url) : null,
        pdf_path:
          (data.type ?? lesson.type) === "pdf"
            ? (data as { pdf_path?: string }).pdf_path ?? null
            : null,
      }),
    onSuccess: () => {
      invalidate();
      toast.success("Aula atualizada.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteLessonMutation = useMutation({
    mutationFn: ({ moduleId, lessonId }: { moduleId: number; lessonId: number }) =>
      deleteAdminLesson(Number(selectedJourneyId), moduleId, lessonId),
    onSuccess: () => {
      invalidate();
      toast.success("Aula removida.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const getDraft = (moduleId: number): LessonDraft =>
    lessonDrafts[moduleId] ?? emptyLesson();

  const setDraft = (moduleId: number, patch: Partial<LessonDraft>) => {
    setLessonDrafts((prev) => ({
      ...prev,
      [moduleId]: { ...getDraft(moduleId), ...patch },
    }));
  };

  if (isLoading) {
    return <p className="text-muted-foreground">Carregando jornadas...</p>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="font-serif text-3xl font-light text-foreground">Conteúdo dos Alunos</h2>
        <p className="text-muted-foreground mt-2">
          Gerencie módulos, vídeos e PDFs de cada jornada.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Jornada</Label>
        <Select
          value={selectedJourneyId}
          onValueChange={setSelectedJourneyId}
        >
          <SelectTrigger className="max-w-md">
            <SelectValue placeholder="Selecione uma jornada" />
          </SelectTrigger>
          <SelectContent>
            {journeys?.map((journey: AdminJourney) => (
              <SelectItem key={journey.id} value={String(journey.id)}>
                {journey.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedJourney && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">Novo módulo</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Input
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                placeholder="Título do módulo"
              />
              <Button
                onClick={() => createModuleMutation.mutate(newModuleTitle)}
                disabled={!newModuleTitle.trim() || createModuleMutation.isPending}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </CardContent>
          </Card>

          {selectedJourney.modules.map((module: StudentModule) => (
            <Card key={module.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-serif text-xl">{module.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteModuleMutation.mutate(module.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {module.lessons.map((lesson) => (
                  <LessonEditor
                    key={lesson.id}
                    lesson={lesson}
                    journeySlug={selectedJourney.slug}
                    onSave={(data) =>
                      updateLessonMutation.mutate({ moduleId: module.id, lesson, data })
                    }
                    onDelete={() =>
                      deleteLessonMutation.mutate({ moduleId: module.id, lessonId: lesson.id })
                    }
                  />
                ))}

                <div className="rounded-lg border border-dashed border-border p-4 space-y-3">
                  <p className="text-sm font-medium">Nova aula</p>
                  <Input
                    value={getDraft(module.id).title}
                    onChange={(e) => setDraft(module.id, { title: e.target.value })}
                    placeholder="Título da aula"
                  />
                  <Select
                    value={getDraft(module.id).type}
                    onValueChange={(value: "video" | "pdf") =>
                      setDraft(module.id, { type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Vídeo (URL)</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                  {getDraft(module.id).type === "video" ? (
                    <Input
                      value={getDraft(module.id).video_url}
                      onChange={(e) => setDraft(module.id, { video_url: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  ) : (
                    <PdfUploadField
                      label="Arquivo PDF"
                      value={getDraft(module.id).pdf_path}
                      journey={selectedJourney.slug}
                      onChange={(path) => setDraft(module.id, { pdf_path: path })}
                    />
                  )}
                  <Button
                    size="sm"
                    onClick={() =>
                      createLessonMutation.mutate({
                        moduleId: module.id,
                        draft: getDraft(module.id),
                      })
                    }
                    disabled={!getDraft(module.id).title.trim() || createLessonMutation.isPending}
                  >
                    Adicionar aula
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

type LessonEditorProps = {
  lesson: StudentLesson & { pdf_path?: string | null };
  journeySlug: string;
  onSave: (data: LessonDraft) => void;
  onDelete: () => void;
};

const LessonEditor = ({ lesson, journeySlug, onSave, onDelete }: LessonEditorProps) => {
  const [title, setTitle] = useState(lesson.title);
  const [type, setType] = useState<"video" | "pdf">(lesson.type);
  const [videoUrl, setVideoUrl] = useState(lesson.video_url ?? "");
  const [pdfPath, setPdfPath] = useState(lesson.pdf_path ?? "");

  return (
    <div className="rounded-lg border border-border p-4 space-y-3">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Select value={type} onValueChange={(v: "video" | "pdf") => setType(v)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="video">Vídeo</SelectItem>
          <SelectItem value="pdf">PDF</SelectItem>
        </SelectContent>
      </Select>
      {type === "video" ? (
        <Input
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="URL do vídeo"
        />
      ) : (
        <PdfUploadField
          label="PDF"
          value={pdfPath}
          journey={journeySlug}
          onChange={setPdfPath}
        />
      )}
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => onSave({ title, type, video_url: videoUrl, pdf_path: pdfPath })}
        >
          Salvar
        </Button>
        <Button size="sm" variant="ghost" onClick={onDelete}>
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
};

export default StudentContentEditor;
