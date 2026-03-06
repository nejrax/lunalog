import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-10">
      <section className="ll-card p-10">
        <p className="ll-pill">Anonymous • Privacy-first • Research-style insights</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          A calm, pseudonymous tracker for endometriosis & menstrual health
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600">
          Track symptoms, cycles, and remedies. Visualize personal patterns. Optionally contribute
          anonymized data to help improve descriptive research insights.
        </p>

        <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
          <Link href="/signup" className="ll-btn-primary">
            Track symptoms
          </Link>
          <Link href="/signup?mode=research" className="ll-btn-secondary">
            Join research
          </Link>
          <Link href="/login" className="ll-btn-secondary">
            Login
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="ll-card-inner">
            <div className="text-sm font-semibold">Pseudonymous by default</div>
            <div className="mt-2 text-sm text-zinc-600">
              No real name required. Your public identifier is random.
            </div>
          </div>
          <div className="ll-card-inner">
            <div className="text-sm font-semibold">Sensitive UX</div>
            <div className="mt-2 text-sm text-zinc-600">
              Intimate questions are optional and can be toggled off.
            </div>
          </div>
          <div className="ll-card-inner">
            <div className="text-sm font-semibold">Export for clinicians</div>
            <div className="mt-2 text-sm text-zinc-600">
              Generate doctor-friendly summaries (PDF/CSV planned).
            </div>
          </div>
        </div>
      </section>

      <section className="ll-card">
        <h2 className="text-2xl font-semibold tracking-tight">Medical disclaimer</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          This platform provides no medical advice. It shows anonymous, aggregated community
          analysis and evidence signals that may be biased or incomplete. Always consult a
          licensed clinician for diagnosis and treatment.
        </p>
      </section>

      <section className="ll-card">
        <h2 className="text-2xl font-semibold tracking-tight">Privacy statement</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Users can participate anonymously. Data is de-identified and used only for
          research-style pattern discovery and descriptive statistics. You can opt out of research
          at any time.
        </p>
      </section>
    </div>
  );
}
