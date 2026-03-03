export type AnonymousUser = {
  id: string;
  createdAt: string;
};

const STORAGE_KEY = "lunalog_anon_user_v1";
const ADMIN_MODE_KEY = "lunalog_admin_mode_v1";

export function getAnonymousUserFromStorage(): AnonymousUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AnonymousUser;
  } catch {
    return null;
  }
}

export function ensureAnonymousUserInStorage(): AnonymousUser {
  const existing = getAnonymousUserFromStorage();
  if (existing) return existing;

  const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());
  const createdAt = new Date().toISOString();
  const user: AnonymousUser = { id, createdAt };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  return user;
}

export function clearAnonymousUserFromStorage() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function setAdminMode(enabled: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_MODE_KEY, enabled ? "1" : "0");
}

export function isAdminMode(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ADMIN_MODE_KEY) === "1";
}

export function clearAdminMode() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ADMIN_MODE_KEY);
}
