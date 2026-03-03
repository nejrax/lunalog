"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { isAdminMode } from "@/lib/session";

type NavbarProps = {
  logoText?: string;
};

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={
        "text-sm font-medium transition-colors " +
        (active
          ? "text-zinc-900 dark:text-zinc-50"
          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50")
      }
    >
      {label}
    </Link>
  );
}

export function Navbar({ logoText = "LunaLog" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const admin = typeof window !== "undefined" ? isAdminMode() : false;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/40">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50">
              LOGO
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {logoText}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Anonymous symptom insights
              </span>
            </div>
          </Link>

          {admin && (
            <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200 sm:inline-flex">
              Admin mode
            </span>
          )}
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href="/" label="Home" />
          <NavLink href="/log" label="Log symptoms" />
          <NavLink href="/admin" label="Admin" />
          <NavLink href="/login" label="Login" />
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-9 items-center justify-center rounded-full border border-zinc-200 bg-white px-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5 md:hidden"
            aria-label="Toggle menu"
          >
            Menu
          </button>
          <Link
            href="/log"
            className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Log today
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-200/60 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60 md:hidden">
          <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 py-4">
            {admin && (
              <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                Admin mode
              </span>
            )}
            <div className="grid gap-2">
              <NavLink href="/" label="Home" />
              <NavLink href="/log" label="Log symptoms" />
              <NavLink href="/admin" label="Admin" />
              <NavLink href="/login" label="Login" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
