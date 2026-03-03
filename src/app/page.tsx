import Link from "next/link";
import {
  blogHighlights,
  correlationStats,
  impactCounters,
  symptomHeat,
  trendingTopics,
} from "@/lib/mockData";

function formatPercent(p: number) {
  return `${Math.round(p * 100)}%`;
}

export default function Home() {
  return (
    <div className="grid gap-12">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-white/10 dark:bg-white/5">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-white/10 dark:bg-black dark:text-zinc-200">
              Privacy-first • Anonymous tracking • Research-style insights
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              Machine-learning powered pattern discovery for PCOS & endometriosis symptoms
            </h1>
            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              LunaLog helps you track symptoms and lifestyle factors, then aggregates anonymous
              community data to highlight correlations and common patterns. This is not medical
              advice.
            </p>

            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Sign up / login anonymously
              </Link>
              <Link
                href="/log"
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
              >
                Log today’s symptoms
              </Link>
              <Link
                href="/admin"
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
              >
                Admin
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-black">
              <p className="text-sm font-semibold">The power of your data</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-white/5">
                  <div className="text-2xl font-semibold">
                    {impactCounters.experiences.toLocaleString()}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    real-world experiences
                  </div>
                </div>
                <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-white/5">
                  <div className="text-2xl font-semibold">
                    {impactCounters.insights.toLocaleString()}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    statistical insights
                  </div>
                </div>
                <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-white/5">
                  <div className="text-2xl font-semibold">
                    {impactCounters.countries.toLocaleString()}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    countries represented
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-black">
              <p className="text-sm font-semibold">Privacy & anonymity badge</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                No real names required. Data is de-identified and aggregated for pattern
                discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Data-driven insights (preview)
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Live widgets are mocked in this prototype. Hook them to your database and ML
              pipeline later.
            </p>
          </div>
          <Link
            href="/log"
            className="hidden rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5 sm:inline-flex"
          >
            Add your weekly update
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold">Live correlation stats</p>
            <div className="mt-4 grid gap-3">
              {correlationStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-black"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{s.label}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {formatPercent(s.confidence)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {s.effect}
                  </p>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    sample size: n={s.sampleSize}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/5 lg:col-span-2">
            <p className="text-sm font-semibold">Symptom heatmap</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              A visual summary of what the community reports most frequently.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {symptomHeat.map((s) => (
                <div
                  key={s.symptom}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-black"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{s.symptom}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {s.trend}
                    </p>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
                    <div
                      className="h-2 rounded-full bg-zinc-900 dark:bg-white"
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
      </section>

      <section className="grid gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Community & support</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Anonymous discussion + moderated, evidence-based summaries.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/5 lg:col-span-2">
            <p className="text-sm font-semibold">Moderated blog highlights</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {blogHighlights.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-black"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold">{b.title}</p>
                    <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                      {b.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {b.summary}
                  </p>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {b.publishedAt}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold">Forum sneak-peek</p>
            <div className="mt-4 grid gap-3">
              {trendingTopics.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-black"
                >
                  <p className="text-sm font-semibold">{t.title}</p>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {t.replies} replies • updated {t.updatedAt}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
              In the prototype, forum pages are placeholders. Add MongoDB/PostgreSQL + moderation
              workflows later.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-2xl font-semibold tracking-tight">Transparency & trust</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-black">
            <p className="text-sm font-semibold">No medical advice</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              The app provides community analysis only. Correlations are not causation and may be
              affected by confounders.
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-black">
            <p className="text-sm font-semibold">Anonymized research dataset</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Contributions are de-identified and aggregated to support better statistical
              understanding of underserved conditions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
