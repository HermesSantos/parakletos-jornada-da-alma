import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { getAdminTheme, updateTheme } from "@/lib/api";
import { defaultThemeSettings, editableThemeTokens } from "@/lib/cms-defaults";
import type { ThemeSettings } from "@/lib/cms-types";

const ThemeEditor = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-theme"],
    queryFn: getAdminTheme,
  });

  const [theme, setTheme] = useState<ThemeSettings>(defaultThemeSettings);

  useEffect(() => {
    if (data) {
      setTheme({
        light: { ...defaultThemeSettings.light, ...data.light },
        dark: { ...defaultThemeSettings.dark, ...data.dark },
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateTheme,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-theme"] });
      queryClient.invalidateQueries({ queryKey: ["theme-settings"] });
      toast.success("Tema salvo com sucesso.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  if (isLoading) {
    return <p className="text-muted-foreground">Carregando...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Cores do tema</CardTitle>
        <CardDescription>Tokens CSS para os modos claro e escuro.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="light">
          <TabsList>
            <TabsTrigger value="light">Claro</TabsTrigger>
            <TabsTrigger value="dark">Escuro</TabsTrigger>
          </TabsList>

          {(["light", "dark"] as const).map((mode) => (
            <TabsContent key={mode} value={mode} className="space-y-4 mt-4">
              {editableThemeTokens.map(({ key, label }) => (
                <div key={key} className="space-y-2">
                  <Label>{label}</Label>
                  <Input
                    value={theme[mode][key] ?? ""}
                    onChange={(e) =>
                      setTheme({
                        ...theme,
                        [mode]: { ...theme[mode], [key]: e.target.value },
                      })
                    }
                  />
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        <div className="rounded-lg border p-4 flex gap-3">
          <div className="h-10 w-10 rounded-full" style={{ background: `hsl(${theme.light["--gold"]})` }} />
          <div className="h-10 w-10 rounded-full" style={{ background: `hsl(${theme.light["--primary"]})` }} />
          <div className="h-10 w-10 rounded-full" style={{ background: `hsl(${theme.light["--forest"]})` }} />
        </div>

        <Button onClick={() => mutation.mutate(theme)} disabled={mutation.isPending}>
          {mutation.isPending ? "Salvando..." : "Salvar cores"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ThemeEditor;
