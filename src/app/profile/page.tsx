"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMe, type AuthUser } from "@/lib/clientAuth";

export default function ProfilePage() {
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
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-2 text-sm text-zinc-600">{error}</p>
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
        <h1 className="text-2xl font-semibold tracking-tight">Profile & consent</h1>
        <p className="mt-2 text-sm text-zinc-600">
          This is a placeholder page. Next we’ll connect baseline profile fields and consent
          toggles to the database.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="ll-card-inner">
            <div className="text-sm font-semibold">Account</div>
            <div className="mt-2 text-sm text-zinc-600">Email: {user?.email ?? "—"}</div>
            <div className="mt-1 text-sm text-zinc-600">Public ID: {user?.publicId ?? "—"}</div>
          </div>
          <div className="ll-card-inner">
            <div className="text-sm font-semibold">Consent</div>
            <div className="mt-2 text-sm text-zinc-600">
              Research: {user?.consent?.researchOptIn ? "Opted in" : "Opted out"}
            </div>
            <div className="mt-1 text-sm text-zinc-600">
              Intimate fields: {user?.consent?.intimateFieldsOptIn ? "Enabled" : "Disabled"}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/home" className="ll-btn-secondary">
            Back to home
          </Link>
          <Link href="/log" className="ll-btn-primary">
            Log symptoms
          </Link>
        </div>
      </div>
    </div>
  );
}
