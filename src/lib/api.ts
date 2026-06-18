import { getAuthToken, type AuthSessionType } from "@/lib/auth";
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

type ApiRequestOptions = RequestInit & {
  session?: AuthSessionType;
};

async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { session = "admin", ...fetchOptions } = options;
  const token = getAuthToken(session);
  const headers = new Headers(fetchOptions.headers);
  const isFormData = fetchOptions.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type") && fetchOptions.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    throw new ApiRequestError(await parseErrorMessage(response), response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return response as unknown as T;
  }

  return response.json() as Promise<T>;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    session: "admin",
  });
}

export async function getMe(session: AuthSessionType): Promise<AuthUser> {
  return apiRequest<AuthUser>("/me", { session });
}

export async function logout(session: AuthSessionType): Promise<void> {
  await apiRequest<{ message: string }>("/logout", { method: "POST", session });
}

export async function getLandingContent(): Promise<Partial<LandingContent>> {
  return apiRequest<Partial<LandingContent>>("/content", { session: "admin" });
}

export async function getThemeSettings(): Promise<ThemeSettings> {
  return apiRequest<ThemeSettings>("/theme", { session: "admin" });
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

export type StudentJourney = {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  image_url: string | null;
};

export type StudentLesson = {
  id: number;
  module_id: number;
  title: string;
  type: "video" | "pdf";
  video_url: string | null;
  sort_order: number;
};

export type StudentModule = {
  id: number;
  journey_id: number;
  title: string;
  sort_order: number;
  lessons: StudentLesson[];
};

export type StudentJourneyDetail = StudentJourney & {
  modules: StudentModule[];
};

export type AdminJourney = StudentJourney & {
  sort_order: number;
  is_active: boolean;
  modules: StudentModule[];
};

export type AdminStudent = {
  id: number;
  name: string;
  email: string;
  enrollments: {
    id: number;
    journey_id: number;
    journey_slug: string;
    journey_title: string;
    source: string;
    enrolled_at: string;
  }[];
};

export async function getStudentJourneys(): Promise<StudentJourney[]> {
  return apiRequest<StudentJourney[]>("/student/journeys", { session: "student" });
}

export async function getStudentJourney(slug: string): Promise<StudentJourneyDetail> {
  return apiRequest<StudentJourneyDetail>(`/student/journeys/${slug}`, { session: "student" });
}

export async function downloadLessonPdf(lessonId: number): Promise<Blob> {
  const token = getAuthToken("student");
  const response = await fetch(`${API_BASE_URL}/student/lessons/${lessonId}/pdf`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    throw new ApiRequestError(await parseErrorMessage(response), response.status);
  }

  return response.blob();
}

export async function getAdminJourneys(): Promise<AdminJourney[]> {
  return apiRequest<AdminJourney[]>("/admin/journeys");
}

export async function getAdminJourney(id: number): Promise<AdminJourney> {
  return apiRequest<AdminJourney>(`/admin/journeys/${id}`);
}

export async function createAdminModule(
  journeyId: number,
  data: { title: string; sort_order?: number },
): Promise<StudentModule> {
  return apiRequest<StudentModule>(`/admin/journeys/${journeyId}/modules`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAdminModule(
  journeyId: number,
  moduleId: number,
  data: { title?: string; sort_order?: number },
): Promise<StudentModule> {
  return apiRequest<StudentModule>(`/admin/journeys/${journeyId}/modules/${moduleId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminModule(journeyId: number, moduleId: number): Promise<void> {
  await apiRequest(`/admin/journeys/${journeyId}/modules/${moduleId}`, {
    method: "DELETE",
  });
}

export async function createAdminLesson(
  journeyId: number,
  moduleId: number,
  data: {
    title: string;
    type: "video" | "pdf";
    video_url?: string | null;
    pdf_path?: string | null;
    sort_order?: number;
  },
): Promise<StudentLesson & { pdf_path?: string | null }> {
  return apiRequest(`/admin/journeys/${journeyId}/modules/${moduleId}/lessons`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAdminLesson(
  journeyId: number,
  moduleId: number,
  lessonId: number,
  data: {
    title?: string;
    type?: "video" | "pdf";
    video_url?: string | null;
    pdf_path?: string | null;
    sort_order?: number;
  },
): Promise<StudentLesson & { pdf_path?: string | null }> {
  return apiRequest(`/admin/journeys/${journeyId}/modules/${moduleId}/lessons/${lessonId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminLesson(
  journeyId: number,
  moduleId: number,
  lessonId: number,
): Promise<void> {
  await apiRequest(`/admin/journeys/${journeyId}/modules/${moduleId}/lessons/${lessonId}`, {
    method: "DELETE",
  });
}

export async function uploadStudentPdf(
  file: File,
  journey?: string,
): Promise<{ path: string }> {
  const formData = new FormData();
  formData.append("file", file);
  if (journey) {
    formData.append("journey", journey);
  }

  return apiRequest<{ path: string }>("/admin/student-media", {
    method: "POST",
    body: formData,
  });
}

export async function getAdminStudents(): Promise<AdminStudent[]> {
  return apiRequest<AdminStudent[]>("/admin/students");
}

export async function createAdminStudent(data: {
  name: string;
  email: string;
  password: string;
  journey_ids?: number[];
}): Promise<AuthUser> {
  return apiRequest<AuthUser>("/admin/students", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function createEnrollment(userId: number, journeyId: number): Promise<void> {
  await apiRequest("/admin/enrollments", {
    method: "POST",
    body: JSON.stringify({ user_id: userId, journey_id: journeyId }),
  });
}

export async function deleteEnrollment(enrollmentId: number): Promise<void> {
  await apiRequest(`/admin/enrollments/${enrollmentId}`, {
    method: "DELETE",
  });
}

export type MissaoLibertePaymentResponse = {
  paymentId: string;
  brCode: string | null;
  brCodeBase64: string | null;
  amount: number;
  expiresAt: string | null;
};

export type PaymentStatusResponse = {
  status: "pending" | "paid" | "expired" | "failed";
  paidAt: string | null;
};

export async function createMissaoLibertePayment(email: string): Promise<MissaoLibertePaymentResponse> {
  return apiRequest<MissaoLibertePaymentResponse>("/payments/missao-liberte", {
    method: "POST",
    body: JSON.stringify({ email }),
    session: "admin",
  });
}

export async function getPaymentStatus(paymentId: string): Promise<PaymentStatusResponse> {
  return apiRequest<PaymentStatusResponse>(`/payments/${paymentId}/status`, { session: "admin" });
}

export async function simulateMissaoLibertePayment(paymentId: string): Promise<PaymentStatusResponse> {
  return apiRequest<PaymentStatusResponse>(`/payments/${paymentId}/simulate`, {
    method: "POST",
    session: "admin",
  });
}

export { ApiRequestError };
