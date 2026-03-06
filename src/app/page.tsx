import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-6">
      <section className="ll-card p-4 sm:p-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/60">
          <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
            <Image
              src="/Your%20paragraph%20texttt.png"
              alt="LunaLog"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            A calm tracker for menstrual health & endometriosis
          </h1>
          <div className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/signup" className="ll-btn-primary">
              Sign Up
            </Link>
            <Link href="/login" className="ll-btn-secondary">
              Log In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
