"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { blogHighlights, correlationStats, symptomHeat, trendingTopics } from "@/lib/mockData";
import { clearAdminMode, isAdminMode } from "@/lib/session";

function contains(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export default function AdminPage() {
  const allowed = useMemo(() => {
    if (typeof window === "undefined") return false;
    return isAdminMode();
  }, []);

  const [query, setQuery] = useState<string>("");

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return null;

    const correlations = correlationStats.filter(
      (s) => contains(s.label, q) || contains(s.effect, q),
    );
    const symptoms = symptomHeat.filter((s) => contains(s.symptom, q));
    const blogs = blogHighlights.filter(
      (b) => contains(b.title, q) || contains(b.summary, q) || contains(b.tag, q),
    );
    const topics = trendingTopics.filter((t) => contains(t.title, q));

    return { correlations, symptoms, blogs, topics };
  }, [query]);

  if (!allowed) {
    return (
      <div className="ll-card">
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          This page is gated. Log in with the admin email/password to enable admin mode.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="ll-btn-primary"
          >
            Go to login
          </Link>
          <Link
            href="/"
            className="ll-btn-secondary"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Admin mode is enabled. Editing controls only appear in admin mode.
          </p>
        </div>
        <button
          onClick={() => {
            clearAdminMode();
            window.location.href = "/";
          }}
          className="ll-btn-secondary"
        >
          Exit admin
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="ll-card lg:col-span-2">
          <h2 className="text-lg font-semibold">Search</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Search across aggregated stats, symptoms, blog highlights, and forum topics.
          </p>
          <div className="mt-4">
            <SearchBar
              placeholder="Search: symptom, remedy, topic…"
              onSearch={(q) => setQuery(q)}
            />
          </div>
        </div>

        <div className="ll-card">
          <h2 className="text-lg font-semibold">Admin actions</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            These controls only appear while admin mode is active.
          </p>
          <div className="mt-4 grid gap-3">
            <button className="ll-btn-primary">
              Create blog post
            </button>
            <button className="ll-btn-secondary">
              Review flagged forum topics
            </button>
            <button className="ll-btn-secondary">
              Export dataset (CSV)
            </button>
          </div>
        </div>
      </div>

      {results && (
        <div className="grid gap-6">
          <div className="ll-card">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Correlation stats ({results.correlations.length})
            </h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {results.correlations.map((s) => (
                <div
                  key={s.label}
                  className="ll-card-inner"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-semibold">{s.label}</div>
                    <button className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5">
                      Edit
                    </button>
                  </div>
                  <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    {s.effect}
                  </div>
                  <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    Confidence: {Math.round(s.confidence * 100)}% • n={s.sampleSize}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ll-card">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Symptom heatmap items ({results.symptoms.length})
            </h3>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {results.symptoms.map((s) => (
                <div
                  key={s.symptom}
                  className="ll-card-inner"
                >
                  <div className="text-sm font-semibold">{s.symptom}</div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
                    <div
                      className="h-2 rounded-full bg-zinc-900 dark:bg-white"
                      style={{ width: `${s.intensity}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    Intensity: {s.intensity}/100 • Trend: {s.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ll-card">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Blog highlights ({results.blogs.length})
            </h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {results.blogs.map((b) => (
                <div
                  key={b.id}
                  className="ll-card-inner"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold">{b.title}</div>
                    <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                      {b.tag}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {b.summary}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {b.publishedAt}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5">
                        Edit
                      </button>
                      <button className="rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50 dark:border-red-500/30 dark:bg-black dark:text-red-200 dark:hover:bg-red-500/10">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ll-card">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Forum topics ({results.topics.length})
            </h3>
            <div className="mt-3 grid gap-3">
              {results.topics.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-black/30"
                >
                  <div>
                    <div className="text-sm font-semibold">{t.title}</div>
                    <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {t.replies} replies • updated {t.updatedAt}
                    </div>
                  </div>
                  <Link
                    href="/"
                    className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-50"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
