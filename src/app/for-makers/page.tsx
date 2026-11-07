import Link from "next/link";
import type { Metadata } from "next";
import { payoutRegions, payoutMethods } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "For suppliers & manufacturers across Asia",
  description:
    "Roopraise is a cross-border marketplace for manufacturers and brands across Asia — starting with Pakistan. Open a store, sell wholesale (B2B) or retail (B2C) to buyers in the US, Canada, UK and Europe, with zero listing fees and payouts to your country.",
};

const greetings = [
  { flag: "🇵🇰", hi: "Assalam-o-Alaikum", place: "Pakistan" },
  { flag: "🇮🇳", hi: "Namaste", place: "India" },
  { flag: "🇧🇩", hi: "Assalamu Alaikum", place: "Bangladesh" },
  { flag: "🇱🇰", hi: "Ayubowan", place: "Sri Lanka" },
  { flag: "🇦🇪", hi: "Marhaba", place: "the UAE" },
  { flag: "🇻🇳", hi: "Xin chào", place: "Vietnam" },
];

const reasons = [
  {
    icon: "🌍",
    title: "Reach buyers in the US, Canada, UK & Europe",
    body: "Retailers, boutiques, and shoppers across the West are sourcing direct from Asia. We put your factory in front of them — no website, ads, or audience of your own needed.",
  },
  {
    icon: "📦",
    title: "Sell wholesale, retail, or both",
    body: "Set a minimum order quantity and trade pricing for business buyers (B2B), offer single units to shoppers (B2C), or do both from one storefront. You decide per product.",
  },
  {
    icon: "💵",
    title: "Price and get paid in hard currency",
    body: "List in USD, earn in USD, and receive your money at home through Payoneer, Wise, or bank transfer. No juggling international card gateways.",
  },
  {
    icon: "🆓",
    title: "No fees to start — ever",
    body: "Start on a free plan — 10 listings, no commission, no transaction fees. Upgrade to a paid membership only when you want more listings and growth tools.",
  },
  {
    icon: "🛡️",
    title: "Trade protection builds trust",
    body: "Buyer payments are held securely and released once your order ships as described — so overseas buyers feel safe placing large orders with a new supplier.",
  },
  {
    icon: "✅",
    title: "Get the Verified Supplier badge",
    body: "Pass a one-time business check and quality review to earn a badge that puts you ahead in search and wins bigger wholesale orders.",
  },
];

const sellItems = [
  { emoji: "🧵", label: "Textiles & embroidery" },
  { emoji: "🧥", label: "Apparel & garments" },
  { emoji: "👜", label: "Leather goods" },
  { emoji: "💍", label: "Jewelry & metalwork" },
  { emoji: "🪔", label: "Home décor & brass" },
  { emoji: "🏺", label: "Ceramics & tableware" },
  { emoji: "🪑", label: "Woodcraft & furniture" },
  { emoji: "📦", label: "Packaging & print" },
];

const steps = [
  { n: 1, title: "Open your free store", body: "Sign up, name your store, and tell your factory's story. It takes minutes and costs nothing." },
  { n: 2, title: "List products & MOQs", body: "Add photos and set wholesale price + minimum order, retail price, or both. Listing is always free." },
  { n: 3, title: "We market to the West", body: "Roopraise promotes your goods to retailers and shoppers in the US, Canada, UK & Europe." },
  { n: 4, title: "Ship & get paid home", body: "Fulfil the order; we collect payment and send your earnings to your country." },
];

const stories = [
  {
    quote: "We export leather goods from Kasur. Roopraise brought us wholesale buyers in the UK we could never reach alone.",
    name: "Bilal",
    place: "Kasur, Pakistan 🇵🇰",
  },
  {
    quote: "Our pottery studio in Multan now ships pallets to boutiques across Canada — orders come in while we sleep.",
    name: "Sana",
    place: "Multan, Pakistan 🇵🇰",
  },
  {
    quote: "Getting paid in dollars, straight to Payoneer, changed everything for our textile mill in Faisalabad.",
    name: "Imran",
    place: "Faisalabad, Pakistan 🇵🇰",
  },
];

const faqs = [
  {
    q: "Do I have to sell wholesale?",
    a: "No. You choose per product. Offer wholesale with a minimum order quantity for businesses, retail single units to shoppers, or both. Many suppliers do both to maximise reach.",
  },
  {
    q: "Who can open a store?",
    a: "Manufacturers, exporters, and brands across Asia. We're onboarding Pakistan first, then opening to India, Bangladesh, Vietnam, Indonesia and the wider region.",
  },
  {
    q: "How do I actually receive my money?",
    a: "We collect payment from the buyer and pay you out through Payoneer, Wise, or a bank transfer to your country, on the schedule you choose.",
  },
  {
    q: "Who handles international shipping?",
    a: "You ship using your courier or freight forwarder; the buyer pays the shipping you quote. We show you the buyer's address and the order details.",
  },
  {
    q: "What does it cost?",
    a: "You can start free with 10 listings and no commission. Paid memberships — Silver, Gold and Platinum — add more listings and growth tools. See the Pricing page for all plans.",
  },
  {
    q: "Can I contact the buyer directly?",
    a: "All communication and orders stay inside Roopraise. This protects both sides, keeps trade protection valid, and is part of the Supplier Agreement.",
  },
];

export default function ForMakersPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <div className="container-x py-16 text-center md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
            🏭 For manufacturers &amp; brands across Asia — starting with Pakistan
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Sell wholesale &amp; retail to the West
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
            Roopraise helps factories and brands across Asia reach retailers and shoppers in the
            US, Canada, UK and Europe — with{" "}
            <span className="font-semibold">no fees to start</span> and payouts to your country.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/sell" className="rounded-full bg-white px-8 py-3.5 font-semibold text-brand-700 transition hover:bg-brand-50">
              Open your free store
            </Link>
            <Link href="/pricing" className="rounded-full border border-white/40 px-8 py-3.5 font-semibold text-white transition hover:bg-white/10">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* GREETINGS STRIP */}
      <section className="border-b border-ink/10 bg-white">
        <div className="container-x py-8">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-ink/40">
            You&apos;re welcome here
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {greetings.map((g) => (
              <span
                key={g.place}
                className="flex items-center gap-2 rounded-full border border-ink/10 bg-cream px-4 py-2 text-sm"
              >
                <span className="text-lg">{g.flag}</span>
                <span className="font-medium text-ink">{g.hi}</span>
                <span className="text-ink/50">· {g.place}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="container-x py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Why suppliers choose Roopraise
          </h2>
          <p className="mt-3 text-ink/60">
            One idea built the platform: talented manufacturers everywhere deserve direct access to
            the world&apos;s biggest buying markets.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="flex gap-4 rounded-xl2 border border-ink/10 bg-white p-6 shadow-card">
              <span className="text-3xl">{r.icon}</span>
              <div>
                <h3 className="font-semibold text-ink">{r.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT TO SELL */}
      <section className="bg-white">
        <div className="container-x py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              What buyers are sourcing
            </h2>
            <p className="mt-3 text-ink/60">
              From textiles to leatherwork, the products your region is known for are exactly what
              retailers and shoppers in the West are searching for.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {sellItems.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2 rounded-xl2 border border-ink/10 bg-cream p-6 text-center"
              >
                <span className="text-4xl">{s.emoji}</span>
                <span className="text-sm font-medium text-ink">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-x py-16">
        <h2 className="text-center font-display text-3xl font-bold text-ink sm:text-4xl">
          From your factory to the world
        </h2>
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
      </section>

      {/* PAYOUTS */}
      <section className="container-x pb-16">
        <div className="grid items-center gap-8 rounded-2xl bg-ink px-8 py-12 text-white lg:grid-cols-2 lg:px-12">
          <div>
            <h2 className="font-display text-3xl font-bold">Paid in dollars, delivered to your country</h2>
            <p className="mt-3 text-white/70">
              We make cross-border payment simple. Choose how you want to receive your earnings and
              we handle the rest — no complicated setup.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {payoutMethods.map((m) => (
                <span key={m} className="rounded-full bg-white/10 px-3 py-1.5 text-sm">{m}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {payoutRegions.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-1 rounded-xl bg-white/10 py-4">
                <span className="text-2xl">{r.flag}</span>
                <span className="text-xs text-white/80">{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="bg-white">
        <div className="container-x py-16">
          <h2 className="text-center font-display text-3xl font-bold text-ink sm:text-4xl">
            Suppliers like you
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {stories.map((s) => (
              <figure key={s.name} className="rounded-xl2 border border-ink/10 bg-cream p-6">
                <blockquote className="text-[15px] leading-relaxed text-ink/80">“{s.quote}”</blockquote>
                <figcaption className="mt-4">
                  <p className="font-semibold text-ink">{s.name}</p>
                  <p className="text-sm text-ink/50">{s.place}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-ink/40">
            Illustrative examples shown for this demo.
          </p>
        </div>
      </section>

      {/* THE ONE RULE */}
      <section className="container-x py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
          <span className="text-3xl">🤝</span>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink">One simple rule keeps trade fair</h2>
          <p className="mt-2 text-ink/70">
            Every order and conversation stays on Roopraise. Suppliers don&apos;t take orders
            off-platform — this keeps trade protection valid, protects buyers, and is how we can
            offer free listings for everyone.
          </p>
          <Link href="/pricing" className="mt-4 inline-block font-semibold text-brand-600 hover:underline">
            Read the full Supplier Agreement &amp; pricing →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="container-x max-w-3xl py-16">
          <h2 className="text-center font-display text-3xl font-bold text-ink">Questions from new suppliers</h2>
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

      {/* CTA */}
      <section className="container-x py-16">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-14 text-center text-white">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Start selling to the world today</h2>
          <p className="max-w-xl text-white/85">
            It&apos;s free to open your store and free to list. Join manufacturers across Asia
            already growing their exports on Roopraise.
          </p>
          <Link href="/sell" className="rounded-full bg-white px-8 py-3.5 font-semibold text-brand-700 transition hover:bg-brand-50">
            Open your free store
          </Link>
        </div>
      </section>
    </div>
  );
}
