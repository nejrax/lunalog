"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch, setAuthToken } from "@/lib/clientAuth";

type LoginResponse = {
  token: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function login() {
    setError(null);
    setLoading(true);
    try {
      const data = await apiFetch<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setAuthToken(data.token);
      router.push("/home");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-xl gap-6">
      <div className="ll-card">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Login to access your pseudonymous tracking data across devices.
        </p>

        <div className="mt-6 grid gap-3">
          <label className="grid gap-2 text-sm">
            <span className="font-semibold">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 w-full rounded-2xl border border-zinc-200/70 bg-white/80 px-4 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-black/5"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="font-semibold">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              type="password"
              className="h-11 w-full rounded-2xl border border-zinc-200/70 bg-white/80 px-4 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-black/5"
            />
          </label>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <button onClick={login} disabled={loading} className="ll-btn-primary">
              {loading ? "Signing in…" : "Login"}
            </button>
            <Link href="/signup" className="ll-btn-secondary">
              Create account
            </Link>
            <Link href="/" className="ll-btn-secondary">
              Back
            </Link>
          </div>
        </div>
      </div>

      <div className="text-sm text-zinc-600">
        This platform provides no medical advice. It shows anonymous, aggregated community
        analysis and evidence signals that may be biased or incomplete.
      </div>
    </div>
  );
}
