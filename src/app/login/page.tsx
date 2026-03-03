"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  clearAdminMode,
  clearAnonymousUserFromStorage,
  ensureAnonymousUserInStorage,
  getAnonymousUserFromStorage,
  isAdminMode,
  setAdminMode,
} from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState<string | null>(null);

  const anon = useMemo(() => {
    if (typeof window === "undefined") return null;
    return getAnonymousUserFromStorage();
  }, []);

  const adminEnabled = useMemo(() => {
    if (typeof window === "undefined") return false;
    return isAdminMode();
  }, []);

  function createAnonymous() {
    ensureAnonymousUserInStorage();
    router.push("/log");
  }

  function logout() {
    clearAnonymousUserFromStorage();
    clearAdminMode();
    router.refresh();
  }

  function loginAdmin() {
    setAdminMode(false);
    setAdminError(null);

    const email = adminEmail.trim();
    const password = adminPassword;

    const ok = email === "graduationproject@ius.edu.ba" && password === "gradproj2026";
    if (!ok) {
      setAdminError("Invalid admin email or password.");
      return;
    }

    setAdminMode(true);
    router.push("/admin");
  }

  const anonStatus = anon ? `Anonymous ID: ${anon.id.slice(0, 8)}…` : "Not logged in";
  const adminStatus = adminEnabled ? "Admin mode enabled (local session)" : "Admin mode disabled";

  return (
    <div className="grid gap-8">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <h1 className="text-2xl font-semibold tracking-tight">Login (anonymous)</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          You can participate without identifying information. Your browser stores an anonymous
          user id locally.
        </p>

        <div className="mt-5 grid gap-3 sm:flex sm:items-center">
          <button
            onClick={createAnonymous}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Continue anonymously
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
          >
            Back to home
          </Link>
          <button
            onClick={logout}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
          >
            Clear local session
          </button>
        </div>

        <div className="mt-5 grid gap-2 text-sm">
          <div className="rounded-2xl bg-zinc-50 px-4 py-3 text-zinc-700 dark:bg-white/5 dark:text-zinc-200">
            {anonStatus}
          </div>
          <div className="rounded-2xl bg-zinc-50 px-4 py-3 text-zinc-700 dark:bg-white/5 dark:text-zinc-200">
            {adminStatus}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Admin login</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          Admin mode unlocks moderation/edit controls. For this prototype, the admin session is
          stored locally in your browser.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            placeholder="Admin email"
            className="h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-white/10 dark:bg-black dark:text-zinc-50 dark:focus:ring-white/10"
          />
          <input
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-white/10 dark:bg-black dark:text-zinc-50 dark:focus:ring-white/10"
          />
          <button
            onClick={loginAdmin}
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Enter admin
          </button>
        </div>
        {adminError && (
          <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
            {adminError}
          </div>
        )}
      </div>

      <div className="text-sm text-zinc-600 dark:text-zinc-300">
        Reminder: this app provides no medical advice. It surfaces aggregated community analysis
        signals only.
      </div>
    </div>
  );
}
