import Link from "next/link";

export type LegalSection = { h: string; p: string[] };

export default function LegalPage({
  title,
  intro,
  sections,
  updated = "7 November 2026",
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  updated?: string;
}) {
  return (
    <div className="container-x max-w-3xl py-10">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-ink/50">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <span className="text-ink/70">{title}</span>
      </nav>

      <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-ink/40">Last updated: {updated}</p>
      <p className="mt-5 leading-relaxed text-ink/70">{intro}</p>

      <div className="mt-8 space-y-8">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-display text-xl font-bold text-ink">
              {i + 1}. {s.h}
            </h2>
            {s.p.map((para, j) => (
              <p key={j} className="mt-3 leading-relaxed text-ink/70">{para}</p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-ink/10 bg-white p-6 text-sm text-ink/60">
        <p className="font-semibold text-ink">Questions?</p>
        <p className="mt-1">
          Contact us at{" "}
          <a href="mailto:support@roopraise.com" className="text-brand-600 hover:underline">
            support@roopraise.com
          </a>
          . This page is a general summary and not legal advice.
        </p>
      </div>
    </div>
  );
}
