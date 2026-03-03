export function FooterDisclaimer() {
  return (
    <footer className="border-t border-zinc-200/60 bg-white dark:border-white/10 dark:bg-black">
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Medical disclaimer
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              This platform provides no medical advice. It shows anonymous, aggregated community
              analysis and evidence signals that may be biased or incomplete. Always consult a
              licensed clinician for diagnosis and treatment.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Privacy & anonymity
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Users can participate anonymously. Data is de-identified and used only for
              research-style pattern discovery and descriptive statistics.
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-zinc-200/60 pt-4 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
          <span>© {new Date().getFullYear()} LunaLog</span>
          <span>Prototype for graduation project</span>
        </div>
      </div>
    </footer>
  );
}
