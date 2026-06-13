import { getAuthToken } from "@/lib/auth";
import type { LandingContent, SectionKey, ThemeSettings } from "@/lib/cms-types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  is_admin?: boolean;
};

type LoginResponse = {
  token: string;
  user: AuthUser;
};

type ApiError = {
  message?: string;
  errors?: Record<string, string[]>;
};

class ApiRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
  }
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as ApiError;

    if (data.errors) {
      const firstError = Object.values(data.errors)[0]?.[0];
      if (firstError) {
        return firstError;
      }
    }

    if (data.message) {
      return data.message;
    }
  } catch {
    // ignore JSON parse errors
  }

  return "Não foi possível concluir a requisição.";
}

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers);
  const isFormData = options.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new ApiRequestError(await parseErrorMessage(response), response.status);
  }

  return response.json() as Promise<T>;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getMe(): Promise<AuthUser> {
  return apiRequest<AuthUser>("/me");
}

export async function logout(): Promise<void> {
  await apiRequest<{ message: string }>("/logout", { method: "POST" });
}

export async function getLandingContent(): Promise<Partial<LandingContent>> {
  return apiRequest<Partial<LandingContent>>("/content");
}

export async function getThemeSettings(): Promise<ThemeSettings> {
  return apiRequest<ThemeSettings>("/theme");
}

export async function getAdminContent(): Promise<Partial<LandingContent>> {
  return apiRequest<Partial<LandingContent>>("/admin/content");
}

export async function updateSection<K extends SectionKey>(
  key: K,
  content: LandingContent[K],
): Promise<{ key: K; content: LandingContent[K] }> {
  return apiRequest<{ key: K; content: LandingContent[K] }>(`/admin/content/${key}`, {
    method: "PUT",
    body: JSON.stringify({ content }),
  });
}

export async function getAdminTheme(): Promise<ThemeSettings> {
  return apiRequest<ThemeSettings>("/admin/theme");
}

export async function updateTheme(theme: ThemeSettings): Promise<ThemeSettings> {
  return apiRequest<ThemeSettings>("/admin/theme", {
    method: "PUT",
    body: JSON.stringify(theme),
  });
}

export async function uploadMedia(
  file: File,
  section?: string,
): Promise<{ path: string; url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  if (section) {
    formData.append("section", section);
  }

  return apiRequest<{ path: string; url: string }>("/admin/media", {
    method: "POST",
    body: formData,
  });
}

export async function deleteMedia(path: string): Promise<void> {
  await apiRequest<{ message: string }>("/admin/media", {
    method: "DELETE",
    body: JSON.stringify({ path }),
  });
}

export { ApiRequestError };
