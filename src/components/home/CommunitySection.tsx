import { blogHighlights, trendingTopics } from "@/lib/mockData";

type CommunitySectionProps = {
  id?: string;
};

export function CommunitySection({ id = "community" }: CommunitySectionProps) {
  return (
    <section id={id} className="scroll-mt-40">
      <div className="grid gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Community & support</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Anonymous discussion + moderated, evidence-based summaries.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="ll-card lg:col-span-2">
            <p className="text-sm font-semibold">Moderated blog highlights</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {blogHighlights.map((b) => (
                <div key={b.id} className="ll-card-inner">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold">{b.title}</p>
                    <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                      {b.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{b.summary}</p>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{b.publishedAt}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ll-card">
            <p className="text-sm font-semibold">Forum sneak-peek</p>
            <div className="mt-4 grid gap-3">
              {trendingTopics.map((t) => (
                <div key={t.id} className="ll-card-inner">
                  <p className="text-sm font-semibold">{t.title}</p>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {t.replies} replies • updated {t.updatedAt}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
              Forum pages are placeholders in the prototype. Add DB + moderation workflows later.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
