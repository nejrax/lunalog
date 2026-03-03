import Link from "next/link";
import { impactCounters } from "@/lib/mockData";

type HeroOverviewSectionProps = {
  id?: string;
};

export function HeroOverviewSection({ id = "overview" }: HeroOverviewSectionProps) {
  return (
    <section id={id} className="scroll-mt-40">
      <div className="ll-card p-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="ll-pill">Privacy-first • Anonymous tracking • Research-style insights</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              <span className="ll-accent-text">Machine-learning powered pattern discovery</span>{" "}
              for PCOS & endometriosis symptoms
            </h1>
            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              LunaLog helps you track symptoms and lifestyle factors, then aggregates anonymous
              community data to highlight correlations and common patterns. It’s designed for
              support and research-style insight discovery — not medical advice.
            </p>

            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <Link href="/login" className="ll-btn-primary">
                Sign up / login anonymously
              </Link>
              <Link href="/log" className="ll-btn-secondary">
                Log today’s symptoms
              </Link>
              <Link href="/admin" className="ll-btn-secondary">
                Admin
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="ll-card-inner">
              <p className="text-sm font-semibold">What this app is for</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                Many women with PCOS and endometriosis face inconsistent care and trial-and-error.
                This platform turns weekly logs into aggregated statistics so the community can
                see patterns, while keeping users anonymous.
              </p>
            </div>

            <div className="ll-card-inner">
              <p className="text-sm font-semibold">The power of your data</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-zinc-50/70 p-4 dark:bg-white/5">
                  <div className="text-2xl font-semibold">
                    {impactCounters.experiences.toLocaleString()}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    experiences
                  </div>
                </div>
                <div className="rounded-2xl bg-zinc-50/70 p-4 dark:bg-white/5">
                  <div className="text-2xl font-semibold">
                    {impactCounters.insights.toLocaleString()}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    insights
                  </div>
                </div>
                <div className="rounded-2xl bg-zinc-50/70 p-4 dark:bg-white/5">
                  <div className="text-2xl font-semibold">
                    {impactCounters.countries.toLocaleString()}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    countries
                  </div>
                </div>
              </div>
            </div>

            <div className="ll-card-inner">
              <p className="text-sm font-semibold">Privacy & anonymity</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                No real names required. Data is de-identified and aggregated for pattern
                discovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
