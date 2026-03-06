"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMe, type AuthUser } from "@/lib/clientAuth";

type LogEntry = {
  date: string;
  pain: number;
  fatigue: number;
  bloating: number;
  sleepHours: number;
  stress: number;
  notes: string;
};

const LOG_KEY = "lunalog_weekly_logs_v1";

function loadLogs(): LogEntry[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(LOG_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as LogEntry[];
  } catch {
    return [];
  }
}

function saveLogs(logs: LogEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOG_KEY, JSON.stringify(logs));
}

export default function LogPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let mounted = true;
    getMe()
      .then((u) => {
        if (!mounted) return;
        setUser(u);
        setAuthChecked(true);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
        setAuthChecked(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [entry, setEntry] = useState<LogEntry>({
    date: new Date().toISOString().slice(0, 10),
    pain: 5,
    fatigue: 5,
    bloating: 5,
    sleepHours: 7,
    stress: 5,
    notes: "",
  });

  function submit() {
    if (!user) return;
    const next = [entry, ...loadLogs()].slice(0, 50);
    saveLogs(next);
    setSubmitted(true);
  }

  if (!authChecked) {
    return (
      <div className="ll-card">
        <h1 className="text-2xl font-semibold tracking-tight">Log symptoms</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">Checking session…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="ll-card">
        <h1 className="text-2xl font-semibold tracking-tight">Log symptoms</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Please login to create entries.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/login" className="ll-btn-primary">
            Go to login
          </Link>
          <Link href="/" className="ll-btn-secondary">
            Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="ll-card">
        <h1 className="text-2xl font-semibold tracking-tight">Log today’s symptoms</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          Weekly updates help you visualize personal trends. This is a prototype step: entries are
          still stored in your browser until we connect the form to PostgreSQL.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="font-semibold">Date</span>
            <input
              type="date"
              value={entry.date}
              onChange={(e) => setEntry((v) => ({ ...v, date: e.target.value }))}
              className="h-11 rounded-2xl border border-zinc-200/70 bg-white/70 px-4 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-zinc-900/10 dark:border-white/10 dark:bg-black/30 dark:focus:ring-white/10"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="grid gap-2 text-sm">
              <span className="font-semibold">Pain (0-10)</span>
              <input
                type="number"
                min={0}
                max={10}
                value={entry.pain}
                onChange={(e) =>
                  setEntry((v) => ({ ...v, pain: Number(e.target.value) }))
                }
                className="h-11 rounded-2xl border border-zinc-200/70 bg-white/70 px-4 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-zinc-900/10 dark:border-white/10 dark:bg-black/30 dark:focus:ring-white/10"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="font-semibold">Fatigue (0-10)</span>
              <input
                type="number"
                min={0}
                max={10}
                value={entry.fatigue}
                onChange={(e) =>
                  setEntry((v) => ({ ...v, fatigue: Number(e.target.value) }))
                }
                className="h-11 rounded-2xl border border-zinc-200/70 bg-white/70 px-4 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-zinc-900/10 dark:border-white/10 dark:bg-black/30 dark:focus:ring-white/10"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="grid gap-2 text-sm">
              <span className="font-semibold">Bloating (0-10)</span>
              <input
                type="number"
                min={0}
                max={10}
                value={entry.bloating}
                onChange={(e) =>
                  setEntry((v) => ({ ...v, bloating: Number(e.target.value) }))
                }
                className="h-11 rounded-2xl border border-zinc-200/70 bg-white/70 px-4 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-zinc-900/10 dark:border-white/10 dark:bg-black/30 dark:focus:ring-white/10"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="font-semibold">Stress (0-10)</span>
              <input
                type="number"
                min={0}
                max={10}
                value={entry.stress}
                onChange={(e) =>
                  setEntry((v) => ({ ...v, stress: Number(e.target.value) }))
                }
                className="h-11 rounded-2xl border border-zinc-200/70 bg-white/70 px-4 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-zinc-900/10 dark:border-white/10 dark:bg-black/30 dark:focus:ring-white/10"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm">
            <span className="font-semibold">Sleep hours</span>
            <input
              type="number"
              min={0}
              max={24}
              value={entry.sleepHours}
              onChange={(e) =>
                setEntry((v) => ({ ...v, sleepHours: Number(e.target.value) }))
              }
              className="h-11 rounded-2xl border border-zinc-200/70 bg-white/70 px-4 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-zinc-900/10 dark:border-white/10 dark:bg-black/30 dark:focus:ring-white/10"
            />
          </label>

          <label className="md:col-span-2 grid gap-2 text-sm">
            <span className="font-semibold">Notes (optional)</span>
            <textarea
              value={entry.notes}
              onChange={(e) => setEntry((v) => ({ ...v, notes: e.target.value }))}
              placeholder="Lifestyle factors, remedies tried, diet changes, exercise, stressors…"
              className="min-h-28 rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-zinc-900/10 dark:border-white/10 dark:bg-black/30 dark:focus:ring-white/10"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={submit}
            className="ll-btn-primary"
          >
            Submit weekly update
          </button>
          <Link
            href="/home"
            className="ll-btn-secondary"
          >
            Back to dashboard
          </Link>
        </div>

        {submitted && (
          <div className="mt-5 rounded-2xl bg-zinc-50/70 px-4 py-3 text-sm text-zinc-700 dark:bg-white/5 dark:text-zinc-200">
            Saved. Thank you for contributing to the dataset.
          </div>
        )}
      </div>

      <div className="text-sm text-zinc-600 dark:text-zinc-300">
        This app provides no medical advice. If you’re experiencing severe symptoms, seek
        medical care.
      </div>
    </div>
  );
}
