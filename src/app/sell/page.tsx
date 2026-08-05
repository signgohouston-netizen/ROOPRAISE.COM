import Link from "next/link";
import { payoutRegions } from "@/lib/pricing";

export const metadata = { title: "Sell on Roopraise" };

const steps = [
  { n: 1, title: "Open your shop", body: "Tell us about your craft and set up your storefront in minutes. No fees to start." },
  { n: 2, title: "List your goods", body: "Add unlimited products with photos and prices — listing is always free." },
  { n: 3, title: "We market to the USA", body: "Roopraise puts your items in front of American shoppers actively looking for handmade goods." },
  { n: 4, title: "Ship & get paid", body: "Fulfill the order; we collect payment in USD and send your earnings home." },
];

const faqs = [
  { q: "What does it cost?", a: "Nothing to list and nothing monthly. You only pay a commission when an item sells — see the full pricing chart for the exact percentages." },
  { q: "Who can sell?", a: "Roopraise is built for makers across Pakistan, India, Bangladesh, the Middle East, and the wider Asian region who want to reach buyers in the USA." },
  { q: "How do I get paid?", a: "We collect payment from the buyer in USD and pay you out via Payoneer, Wise, or bank transfer on your chosen schedule." },
  { q: "Can I talk to buyers directly?", a: "All communication happens through Roopraise Messages. To protect everyone, sharing contact details or taking a sale off-platform isn't allowed — it's part of the Seller Agreement." },
];

export default function SellPage() {
  return (
    <div>
      {/* hero */}
      <section className="bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <div className="container-x grid items-center gap-8 py-16 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
              🌏 Makers of South Asia, the Middle East & beyond
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
              Sell to America, from anywhere
            </h1>
            <p className="mt-4 max-w-md text-lg text-white/85">
              Roopraise connects independent makers across Pakistan, India, Bangladesh, and Asia with
              millions of buyers in the USA. List for free — you only pay when you sell.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#start" className="rounded-full bg-white px-7 py-3.5 font-semibold text-brand-700 transition hover:bg-brand-50">
                Open your shop
              </Link>
              <Link href="/pricing" className="rounded-full border border-white/40 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10">
                See pricing
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["🧵", "🪵", "🎨", "💍", "🕯️", "🧶", "🖼️", "🧼", "📿"].map((e, i) => (
              <div key={i} className="grid aspect-square place-items-center rounded-2xl bg-white/10 text-4xl backdrop-blur">
                {e}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="border-b border-ink/10 bg-white">
        <div className="container-x grid grid-cols-2 gap-4 py-10 text-center sm:grid-cols-4">
          {[
            ["$0", "to list"],
            ["$0", "monthly"],
            ["7.3M", "US buyers"],
            ["Pay on sale", "only"],
          ].map(([big, small]) => (
            <div key={small}>
              <p className="font-display text-3xl font-bold text-brand-600 sm:text-4xl">{big}</p>
              <p className="mt-1 text-sm text-ink/60">{small}</p>
            </div>
          ))}
        </div>
      </section>

      {/* steps */}
      <section id="start" className="container-x py-16">
        <h2 className="text-center font-display text-3xl font-bold text-ink">How it works</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-xl2 border border-ink/10 bg-white p-7 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-500 font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button className="rounded-full bg-brand-500 px-8 py-3.5 font-semibold text-white transition hover:bg-brand-600">
            Get started — it&apos;s free
          </button>
        </div>
      </section>

      {/* regions band */}
      <section className="bg-white">
        <div className="container-x py-12">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-ink/50">
            Sellers welcome from
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {payoutRegions.map((r) => (
              <span key={r.name} className="flex items-center gap-2 rounded-full border border-ink/10 bg-cream px-4 py-2 text-sm text-ink/70">
                <span className="text-lg">{r.flag}</span> {r.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* pricing teaser */}
      <section className="container-x py-12">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-ink/10 bg-brand-50 px-6 py-12 text-center">
          <h2 className="font-display text-3xl font-bold text-ink">Simple, sales-based pricing</h2>
          <p className="max-w-xl text-ink/70">
            No listing fees. No subscription. Just a commission on each sale — as low as 5% for top
            sellers. Use our calculator to see exactly what you take home.
          </p>
          <Link href="/pricing" className="rounded-full bg-brand-500 px-7 py-3 font-semibold text-white transition hover:bg-brand-600">
            View pricing & calculator
          </Link>
        </div>
      </section>

      {/* faq */}
      <section className="bg-white">
        <div className="container-x max-w-3xl py-16">
          <h2 className="text-center font-display text-3xl font-bold text-ink">Common questions</h2>
          <div className="mt-8 divide-y divide-ink/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink">
                  {f.q}
                  <span className="text-brand-500 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
