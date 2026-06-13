import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { getAdminContent, updateSection } from "@/lib/api";
import { defaultLandingContent } from "@/lib/cms-defaults";
import type { LandingContent, SectionKey } from "@/lib/cms-types";

type SectionEditorProps<K extends SectionKey> = {
  sectionKey: K;
  title: string;
  description: string;
  children: (content: LandingContent[K], setContent: (value: LandingContent[K]) => void) => React.ReactNode;
};

function SectionEditor<K extends SectionKey>({
  sectionKey,
  title,
  description,
  children,
}: SectionEditorProps<K>) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-content"],
    queryFn: getAdminContent,
  });

  const [content, setContent] = useState<LandingContent[K]>(defaultLandingContent[sectionKey]);

  useEffect(() => {
    if (data?.[sectionKey]) {
      setContent({ ...defaultLandingContent[sectionKey], ...data[sectionKey] });
    }
  }, [data, sectionKey]);

  const mutation = useMutation({
    mutationFn: (value: LandingContent[K]) => updateSection(sectionKey, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      queryClient.invalidateQueries({ queryKey: ["landing-content"] });
      toast.success("Seção salva com sucesso.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return <p className="text-muted-foreground">Carregando...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {children(content, setContent)}
        <Button onClick={() => mutation.mutate(content)} disabled={mutation.isPending}>
          {mutation.isPending ? "Salvando..." : "Salvar alterações"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default SectionEditor;
