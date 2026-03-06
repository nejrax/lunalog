export type AuthUser = {
  publicId: string;
  email: string;
  role: "PATIENT" | "ADMIN";
  createdAt: string;
  consent?: {
    researchOptIn: boolean;
    intimateFieldsOptIn: boolean;
  } | null;
};

const TOKEN_KEY = "lunalog_jwt_v1";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(init?.headers);
  headers.set("content-type", "application/json");
  if (token) headers.set("authorization", `Bearer ${token}`);

  const res = await fetch(path, { ...init, headers });
  const contentType = res.headers.get("content-type") ?? "";
  const raw = await res.text();
  const data: unknown = contentType.includes("application/json") && raw
    ? (JSON.parse(raw) as unknown)
    : raw;
  if (!res.ok) {
    const message = (() => {
      if (typeof data === "object" && data !== null && "error" in data) {
        const errVal = (data as { error: unknown }).error;
        if (typeof errVal === "string") return errVal;
        try {
          return JSON.stringify(errVal);
        } catch {
          return "Request failed";
        }
      }
      if (typeof data === "string" && data.trim().length) return data;
      return "Request failed";
    })();
    throw new Error(`${res.status} ${res.statusText}: ${message}`);
  }
  return data as T;
}

export async function getMe(): Promise<AuthUser> {
  const data = await apiFetch<{ user: AuthUser }>("/api/auth/me", { method: "GET" });
  return data.user;
}
