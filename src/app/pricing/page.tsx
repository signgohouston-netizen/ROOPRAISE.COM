import Link from "next/link";
import type { Metadata } from "next";
import { categoryRates, tiers, fees, payoutRegions, payoutMethods } from "@/lib/pricing";
import FeeCalculator from "@/components/pricing/FeeCalculator";

export const metadata: Metadata = {
  title: "Vendor pricing & fees",
  description:
    "Sell on Roopraise with no listing fees and no subscription — a simple sales commission only. See the full commission chart and calculate your payout.",
};

const conduct = [
  {
    icon: "💬",
    title: "All contact through Roopraise",
    body: "Buyers and sellers communicate only inside Roopraise Messages. Sharing phone numbers, email, WhatsApp, or social handles to move a conversation off-platform is not allowed.",
  },
  {
    icon: "🔒",
    title: "No off-platform sales",
    body: "Every order must be placed and paid for on Roopraise. Redirecting a buyer to complete or repeat a purchase elsewhere is a serious violation.",
  },
  {
    icon: "📦",
    title: "No contact details in orders",
    body: "Business cards, flyers, invoices, or notes in packaging that point buyers off Roopraise are prohibited — this protects buyer trust and your account.",
  },
  {
    icon: "🛡️",
    title: "We handle payments & disputes",
    body: "Roopraise processes payment, holds funds securely, and mediates any dispute — so both sides are protected on every transaction.",
  },
];

const faqs = [
  {
    q: "Is it really free to list?",
    a: "Yes. There are no listing fees and no monthly subscription. You can add unlimited products and only pay a commission when an item actually sells.",
  },
  {
    q: "How is the commission calculated?",
    a: "It's a percentage of the order value (item price + shipping), set by category. Your supplier tier lowers that percentage as your monthly sales grow. A small per-order fee and standard payment processing also apply — the calculator shows exactly what you keep.",
  },
  {
    q: "How and when do I get paid?",
    a: "We market and sell your goods to buyers in the US, Canada, UK and Europe, collect payment securely, and pay you out to Pakistan, India, Bangladesh, the Middle East, and across Asia via Payoneer, Wise, or bank transfer on your chosen schedule.",
  },
  {
    q: "What happens if I take an order off-platform?",
    a: "Taking a sale off Roopraise breaches the Supplier Agreement and can lead to withheld payouts, loss of trade protection, and account suspension. All legitimate communication and orders happen through Roopraise.",
  },
];

export default function PricingPage() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <div className="container-x py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            🏭 For suppliers across Asia — starting with Pakistan
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            List for free. Pay only when you sell.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
            Roopraise brings your products to buyers in the US, Canada, UK and Europe. No listing
            fees, no subscription — just a simple commission on each completed order.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/sell" className="rounded-full bg-white px-7 py-3.5 font-semibold text-brand-700 transition hover:bg-brand-50">
              Open your store
            </Link>
            <Link href="#calculator" className="rounded-full border border-white/40 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10">
              Calculate your payout
            </Link>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="container-x -mt-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { big: "$0", label: "Listing fees", sub: "Add unlimited products, always free" },
            { big: "$0", label: "Monthly subscription", sub: "No plans, no recurring charges" },
            { big: "%", label: "Commission on sales only", sub: "You pay when you get paid" },
          ].map((c) => (
            <div key={c.label} className="rounded-xl2 border border-ink/10 bg-white p-6 text-center shadow-card">
              <p className="font-display text-4xl font-bold text-brand-500">{c.big}</p>
              <p className="mt-1 font-semibold text-ink">{c.label}</p>
              <p className="mt-1 text-sm text-ink/60">{c.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMISSION CHART */}
      <section className="container-x py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink">Sales commission by category</h2>
          <p className="mt-2 text-ink/60">
            A percentage of each order (item + shipping). That&apos;s the core of what Roopraise charges.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-xl2 border border-ink/10 bg-white shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 bg-cream text-left text-xs uppercase tracking-wide text-ink/50">
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 text-right font-semibold">Commission</th>
                <th className="hidden px-5 py-3 text-right font-semibold sm:table-cell">On a $50 sale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {categoryRates.map((c) => (
                <tr key={c.slug} className="hover:bg-cream/60">
                  <td className="px-5 py-3.5">
                    <span className="mr-2">{c.emoji}</span>
                    <span className="font-medium text-ink">{c.name}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">
                      {(c.rate * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td className="hidden px-5 py-3.5 text-right text-ink/60 sm:table-cell">
                    ${(50 * c.rate).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mx-auto mt-3 max-w-3xl text-center text-xs text-ink/50">
          Everything else defaults to 10%. Commission is charged only on completed sales.
        </p>
      </section>

      {/* VOLUME TIERS */}
      <section className="bg-white">
        <div className="container-x py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink">Sell more, pay less</h2>
            <p className="mt-2 text-ink/60">
              Your tier updates automatically from your last 30 days of sales and lowers your commission.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t, i) => (
              <div
                key={t.name}
                className={`rounded-xl2 border p-6 ${
                  i === tiers.length - 1 ? "border-brand-300 bg-brand-50" : "border-ink/10 bg-cream"
                }`}
              >
                <p className="font-display text-xl font-bold text-ink">{t.name}</p>
                <p className="mt-1 text-sm text-ink/60">{t.blurb}</p>
                <p className="mt-4 text-sm font-medium text-ink">
                  {t.max === Infinity
                    ? `$${t.min.toLocaleString()}+ / mo`
                    : `$${t.min.toLocaleString()} – $${t.max.toLocaleString()} / mo`}
                </p>
                <p className="mt-3 text-2xl font-bold text-brand-600">
                  {t.discount === 0 ? "Standard" : `−${(t.discount * 100).toFixed(1)}%`}
                </p>
                <p className="text-xs text-ink/50">{t.discount === 0 ? "category rate" : "off commission"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER FEES */}
      <section className="container-x py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl font-bold text-ink">The rest of the math</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Listing fee", value: "$0.00", tone: "good" },
              { label: "Monthly subscription", value: "$0.00", tone: "good" },
              { label: "Per-order fee", value: `$${fees.perOrder.toFixed(2)}` },
              { label: "Secure payment processing", value: `${(fees.processing * 100).toFixed(1)}%` },
              { label: "International payout / FX", value: `${(fees.payout * 100).toFixed(1)}%` },
              { label: "Seller protection & disputes", value: "Included", tone: "good" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center justify-between rounded-xl border border-ink/10 bg-white px-5 py-4 shadow-sm"
              >
                <span className="text-ink/70">{f.label}</span>
                <span className={`font-semibold ${f.tone === "good" ? "text-emerald-700" : "text-ink"}`}>
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="bg-white">
        <div className="container-x py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink">See exactly what you keep</h2>
            <p className="mt-2 text-ink/60">
              Enter a sale and watch your payout update in real time.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-4xl">
            <FeeCalculator />
          </div>
        </div>
      </section>

      {/* INTERNATIONAL PAYOUTS */}
      <section className="container-x py-16">
        <div className="grid items-center gap-8 rounded-2xl bg-ink px-8 py-12 text-white lg:grid-cols-2 lg:px-12">
          <div>
            <h2 className="font-display text-3xl font-bold">Built for sellers worldwide, paid in USD</h2>
            <p className="mt-3 text-white/70">
              We handle the hard part of cross-border selling. You ship your craft; we market it to
              American buyers, collect payment in dollars, and send your earnings home.
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

      {/* SELLER CONDUCT / BINDING */}
      <section className="bg-white">
        <div className="container-x py-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
              Seller Agreement · required
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink">
              One marketplace, one channel
            </h2>
            <p className="mt-2 text-ink/60">
              Roopraise only works if every sale stays on Roopraise. By opening a shop you agree to
              these binding terms — they protect buyers, keep the marketplace fair, and are how we can
              offer free listings.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
            {conduct.map((c) => (
              <div key={c.title} className="rounded-xl2 border border-ink/10 bg-cream p-6">
                <span className="text-2xl">{c.icon}</span>
                <h3 className="mt-3 font-semibold text-ink">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{c.body}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-4xl rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
            <strong>Enforcement:</strong> attempting to contact buyers directly or complete a sale
            off-platform may result in withheld payouts, removal of seller protection, and permanent
            account suspension. Repeat or severe violations forfeit any pending balance.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl font-bold text-ink">Pricing questions</h2>
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
      <section className="container-x pb-16">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-14 text-center text-white">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to reach American buyers?</h2>
          <p className="max-w-xl text-white/85">
            Open your shop in minutes. No fees until your first sale — that&apos;s our promise.
          </p>
          <Link href="/sell" className="rounded-full bg-white px-8 py-3.5 font-semibold text-brand-700 transition hover:bg-brand-50">
            Start selling on Roopraise
          </Link>
        </div>
      </section>
    </div>
  );
}
