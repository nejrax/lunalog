"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch, setAuthToken } from "@/lib/clientAuth";

type SignupResponse = {
  token: string;
};

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [researchOptIn, setResearchOptIn] = useState(false);
  const [intimateOptIn, setIntimateOptIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mode = new URLSearchParams(window.location.search).get("mode");
    if (mode === "research") setResearchOptIn(true);
  }, []);

  async function submit() {
    setError(null);
    setLoading(true);
    try {
      const data = await apiFetch<SignupResponse>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          researchOptIn,
          intimateFieldsOptIn: intimateOptIn,
        }),
      });
      setAuthToken(data.token);
      router.push("/home");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-xl gap-6">
      <div className="ll-card">
        <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Use an email/password to access your data across devices. Your public profile remains
          pseudonymous.
        </p>

        <div className="mt-6 grid gap-3">
          <label className="grid gap-2 text-sm">
            <span className="font-semibold">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-2xl border border-zinc-200/70 bg-white/80 px-4 text-sm outline-none focus:ring-2 focus:ring-black/5"
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="font-semibold">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="h-11 rounded-2xl border border-zinc-200/70 bg-white/80 px-4 text-sm outline-none focus:ring-2 focus:ring-black/5"
              placeholder="At least 8 characters"
            />
          </label>

          <div className="mt-2 grid gap-3">
            <label className="flex items-start gap-3 rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-sm">
              <input
                type="checkbox"
                checked={researchOptIn}
                onChange={(e) => setResearchOptIn(e.target.checked)}
                className="mt-1"
              />
              <div>
                <div className="font-semibold">Participate in anonymized research insights</div>
                <div className="mt-1 text-zinc-600">
                  Your data will be included in aggregated cohort statistics.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-sm">
              <input
                type="checkbox"
                checked={intimateOptIn}
                onChange={(e) => setIntimateOptIn(e.target.checked)}
                className="mt-1"
              />
              <div>
                <div className="font-semibold">Enable optional intimate questions</div>
                <div className="mt-1 text-zinc-600">
                  Sexual activity, mental health, bowel/urinary symptoms.
                </div>
              </div>
            </label>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <button onClick={submit} disabled={loading} className="ll-btn-primary">
              {loading ? "Creating…" : "Create account"}
            </button>
            <Link href="/login" className="ll-btn-secondary">
              I already have an account
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
