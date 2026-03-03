"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Section = {
  id: string;
  label: string;
};

const SECTIONS: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "insights", label: "Insights" },
  { id: "community", label: "Community" },
  { id: "trust", label: "Trust" },
];

export function HomeSectionNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: "-120px 0px -70% 0px",
        threshold: [0.2, 0.35, 0.5],
      },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <div className="sticky top-[64px] z-40 -mx-4 px-4 pb-4 pt-2 md:top-[72px]">
      <div className="ll-card !p-2">
        <div className="grid grid-cols-4 gap-2">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className={
                  "flex h-10 items-center justify-center rounded-2xl text-xs font-semibold transition-colors " +
                  (isActive
                    ? "bg-[linear-gradient(135deg,var(--brand-pink),var(--brand-purple),var(--brand-indigo))] text-white"
                    : "bg-white/60 text-zinc-700 hover:bg-white dark:bg-black/30 dark:text-zinc-200 dark:hover:bg-white/5")
                }
              >
                {s.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
