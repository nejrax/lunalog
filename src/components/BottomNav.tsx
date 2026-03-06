"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Item({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={
        "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs font-semibold transition-colors " +
        (active
          ? "bg-white text-zinc-900 shadow-sm dark:bg-white/10 dark:text-zinc-50"
          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50")
      }
    >
      <span className={"text-[11px] tracking-tight " + (active ? "" : "")}>{label}</span>
    </Link>
  );
}

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200/60 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60 md:hidden">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-3 py-3">
        <Item href="/" label="Landing" />
        <Item href="/home" label="Home" />
        <Item href="/log" label="Log" />
        <Item href="/login" label="Login" />
      </div>
    </div>
  );
}
