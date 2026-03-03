import Link from "next/link";
import { correlationStats, symptomHeat } from "@/lib/mockData";

type InsightsSectionProps = {
  id?: string;
};

function formatPercent(p: number) {
  return `${Math.round(p * 100)}%`;
}

export function InsightsSection({ id = "insights" }: InsightsSectionProps) {
  return (
    <section id={id} className="scroll-mt-40">
      <div className="grid gap-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Data-driven insights</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Widgets are mocked in this prototype. Connect your database and ML pipeline later.
            </p>
          </div>
          <Link
            href="/log"
            className="hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-900 backdrop-blur hover:bg-white dark:border-white/10 dark:bg-black/30 dark:text-zinc-50 dark:hover:bg-white/5 sm:inline-flex"
          >
            Add your weekly update
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="ll-card">
            <p className="text-sm font-semibold">Live correlation stats</p>
            <div className="mt-4 grid gap-3">
              {correlationStats.map((s) => (
                <div key={s.label} className="ll-card-inner">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{s.label}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {formatPercent(s.confidence)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{s.effect}</p>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    sample size: n={s.sampleSize}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="ll-card lg:col-span-2">
            <p className="text-sm font-semibold">Symptom heatmap</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              A visual summary of what the community reports most frequently.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {symptomHeat.map((s) => (
                <div key={s.symptom} className="ll-card-inner">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{s.symptom}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.trend}</p>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
                    <div
                      className="h-2 rounded-full bg-[linear-gradient(135deg,var(--brand-pink),var(--brand-purple),var(--brand-indigo))]"
                      style={{ width: `${s.intensity}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    intensity: {s.intensity}/100
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
