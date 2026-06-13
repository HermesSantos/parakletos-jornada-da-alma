import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getThemeSettings } from "@/lib/api";
import { defaultThemeSettings } from "@/lib/cms-defaults";
import type { ThemeSettings } from "@/lib/cms-types";

function mergeTheme(data: Partial<ThemeSettings>): ThemeSettings {
  return {
    light: { ...defaultThemeSettings.light, ...data.light },
    dark: { ...defaultThemeSettings.dark, ...data.dark },
  };
}

function applyThemeVariables(theme: ThemeSettings) {
  const root = document.documentElement;

  Object.entries(theme.light).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  let darkStyle = document.getElementById("cms-dark-theme") as HTMLStyleElement | null;
  if (!darkStyle) {
    darkStyle = document.createElement("style");
    darkStyle.id = "cms-dark-theme";
    document.head.appendChild(darkStyle);
  }

  const darkRules = Object.entries(theme.dark)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n    ");

  darkStyle.textContent = `.dark {\n    ${darkRules}\n  }`;
}

export function useThemeSettings() {
  const query = useQuery({
    queryKey: ["theme-settings"],
    queryFn: getThemeSettings,
    select: mergeTheme,
    staleTime: 60_000,
    retry: 1,
  });

  useEffect(() => {
    if (query.data) {
      applyThemeVariables(query.data);
    }
  }, [query.data]);

  return query;
}

export { applyThemeVariables };
