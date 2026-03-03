"use client";

import { useMemo, useState } from "react";

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (query: string) => void;
};

export function SearchBar({ placeholder = "Search…", onSearch }: SearchBarProps) {
  const [q, setQ] = useState("");

  const disabled = useMemo(() => q.trim().length === 0, [q]);

  return (
    <div className="flex w-full items-center gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled) onSearch?.(q.trim());
        }}
        placeholder={placeholder}
        className="h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-white/10 dark:bg-black dark:text-zinc-50 dark:focus:ring-white/10"
      />
      <button
        onClick={() => onSearch?.(q.trim())}
        disabled={disabled}
        className="h-11 shrink-0 rounded-2xl bg-zinc-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        Search
      </button>
    </div>
  );
}
