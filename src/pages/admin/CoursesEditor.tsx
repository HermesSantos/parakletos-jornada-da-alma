import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { getAdminContent, getAdminJourneys, updateSection } from "@/lib/api";
import { defaultLandingContent } from "@/lib/cms-defaults";
import { mergeCoursesWithJourneys } from "@/lib/merge-courses-with-journeys";
import type { CoursesContent } from "@/lib/cms-types";

const CoursesEditor = () => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState<CoursesContent>(defaultLandingContent.courses);

  const { data: cmsData, isLoading: cmsLoading } = useQuery({
    queryKey: ["admin-content"],
    queryFn: getAdminContent,
  });

  const { data: journeys, isLoading: journeysLoading } = useQuery({
    queryKey: ["admin-journeys"],
    queryFn: getAdminJourneys,
  });

  useEffect(() => {
    if (!journeys?.length) {
      return;
    }

    const base: CoursesContent = {
      ...defaultLandingContent.courses,
      ...cmsData?.courses,
      courses: cmsData?.courses?.courses ?? defaultLandingContent.courses.courses,
    };

    setContent({
      ...base,
      courses: mergeCoursesWithJourneys(base, journeys),
    });
  }, [cmsData?.courses, journeys]);

  const mutation = useMutation({
    mutationFn: (value: CoursesContent) => updateSection("courses", value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      queryClient.invalidateQueries({ queryKey: ["landing-content"] });
      toast.success("Seção salva com sucesso.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  if (cmsLoading || journeysLoading) {
    return <p className="text-muted-foreground">Carregando missões...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Cards de missões</CardTitle>
        <CardDescription>
          Lista todas as missões cadastradas no banco ({content.courses.length}). Edite os cards exibidos na
          landing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Título</Label>
            <Input
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Destaque do título</Label>
            <Input
              value={content.titleHighlight}
              onChange={(e) => setContent({ ...content, titleHighlight: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Subtítulo</Label>
          <Textarea
            value={content.subtitle}
            onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
          />
        </div>

        {content.courses.map((course, index) => (
          <div key={course.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-lg">{course.title}</h3>
              <span className="text-xs text-muted-foreground font-mono">{course.id}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={course.title}
                  onChange={(e) => {
                    const courses = [...content.courses];
                    courses[index] = { ...courses[index], title: e.target.value };
                    setContent({ ...content, courses });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtítulo</Label>
                <Input
                  value={course.subtitle}
                  onChange={(e) => {
                    const courses = [...content.courses];
                    courses[index] = { ...courses[index], subtitle: e.target.value };
                    setContent({ ...content, courses });
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Link (âncora)</Label>
              <Input
                value={course.href}
                onChange={(e) => {
                  const courses = [...content.courses];
                  courses[index] = { ...courses[index], href: e.target.value };
                  setContent({ ...content, courses });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={course.description}
                onChange={(e) => {
                  const courses = [...content.courses];
                  courses[index] = { ...courses[index], description: e.target.value };
                  setContent({ ...content, courses });
                }}
              />
            </div>
            <ImageUploadField
              label="Imagem"
              value={course.imageUrl}
              section="courses"
              onChange={(url) => {
                const courses = [...content.courses];
                courses[index] = { ...courses[index], imageUrl: url };
                setContent({ ...content, courses });
              }}
            />
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={course.highlight}
                  onCheckedChange={(checked) => {
                    const courses = [...content.courses];
                    courses[index] = { ...courses[index], highlight: checked };
                    setContent({ ...content, courses });
                  }}
                />
                <Label>Destaque</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={course.disabled}
                  onCheckedChange={(checked) => {
                    const courses = [...content.courses];
                    courses[index] = { ...courses[index], disabled: checked };
                    setContent({ ...content, courses });
                  }}
                />
                <Label>Em breve</Label>
              </div>
            </div>
          </div>
        ))}

        <Button onClick={() => mutation.mutate(content)} disabled={mutation.isPending}>
          {mutation.isPending ? "Salvando..." : "Salvar alterações"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CoursesEditor;
