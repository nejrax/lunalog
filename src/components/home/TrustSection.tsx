type TrustSectionProps = {
  id?: string;
};

export function TrustSection({ id = "trust" }: TrustSectionProps) {
  return (
    <section id={id} className="scroll-mt-40">
      <div className="ll-card p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Transparency & trust</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="ll-card-inner p-6">
            <p className="text-sm font-semibold">No medical advice</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              The app provides community analysis only. Correlations are not causation and may be
              affected by confounders.
            </p>
          </div>
          <div className="ll-card-inner p-6">
            <p className="text-sm font-semibold">Anonymized research dataset</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Contributions are de-identified and aggregated to support better statistical
              understanding of underserved conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
