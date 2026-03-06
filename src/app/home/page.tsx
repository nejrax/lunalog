"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearAuthToken, getMe, type AuthUser } from "@/lib/clientAuth";

export default function HomeAfterLoginPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getMe()
      .then((u) => {
        if (mounted) setUser(u);
      })
      .catch(() => {
        if (mounted) setError("You are not logged in.");
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return (
      <div className="ll-card">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-600">{error}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/login" className="ll-btn-primary">
            Go to login
          </Link>
          <Link href="/" className="ll-btn-secondary">
            Back to landing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="ll-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Your home</h1>
            <p className="mt-2 text-sm text-zinc-600">
              Welcome{user ? `, ${user.email}` : ""}. Your public ID stays pseudonymous.
            </p>
          </div>
          <button
            onClick={() => {
              clearAuthToken();
              window.location.href = "/";
            }}
            className="ll-btn-secondary"
          >
            Log out
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="ll-card-inner">
            <div className="text-sm font-semibold">Today’s status</div>
            <div className="mt-2 text-sm text-zinc-600">
              Add an entry to start seeing personal trends.
            </div>
          </div>
          <div className="ll-card-inner">
            <div className="text-sm font-semibold">Research participation</div>
            <div className="mt-2 text-sm text-zinc-600">
              {user?.consent?.researchOptIn ? "Opted in" : "Personal tracking only"}
            </div>
          </div>
          <div className="ll-card-inner">
            <div className="text-sm font-semibold">Role</div>
            <div className="mt-2 text-sm text-zinc-600">{user?.role ?? "—"}</div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
          <Link href="/log" className="ll-btn-primary">
            Log symptoms
          </Link>
          <Link href="/profile" className="ll-btn-secondary">
            Profile & consent
          </Link>
          <Link href="/insights" className="ll-btn-secondary">
            Insights
          </Link>
          {user?.role === "ADMIN" && (
            <Link href="/admin" className="ll-btn-secondary">
              Admin dashboard
            </Link>
          )}
        </div>
      </div>

      <div className="ll-card">
        <h2 className="text-lg font-semibold">Next steps</h2>
        <div className="mt-3 grid gap-2 text-sm text-zinc-600">
          <div>1) Fill baseline profile (age, cycle length, diagnosis status)</div>
          <div>2) Log daily/weekly symptoms</div>
          <div>3) Track remedies + perceived effectiveness</div>
          <div>4) Review trends and export a doctor report (PDF)</div>
        </div>
      </div>
    </div>
  );
}
