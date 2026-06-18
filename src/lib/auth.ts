import type { AuthUser } from "@/lib/api";

export type AuthSessionType = "admin" | "student";

const TOKEN_KEYS: Record<AuthSessionType, string> = {
  admin: "parakletos_admin_token",
  student: "parakletos_student_token",
};

const USER_KEYS: Record<AuthSessionType, string> = {
  admin: "parakletos_admin_user",
  student: "parakletos_student_user",
};

export function getAuthToken(session: AuthSessionType = "admin"): string | null {
  return localStorage.getItem(TOKEN_KEYS[session]);
}

export function getAuthUser(session: AuthSessionType = "admin"): AuthUser | null {
  const raw = localStorage.getItem(USER_KEYS[session]);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setAuthSession(token: string, user: AuthUser, session: AuthSessionType) {
  localStorage.setItem(TOKEN_KEYS[session], token);
  localStorage.setItem(USER_KEYS[session], JSON.stringify(user));
}

export function clearAuthSession(session: AuthSessionType) {
  localStorage.removeItem(TOKEN_KEYS[session]);
  localStorage.removeItem(USER_KEYS[session]);
}
