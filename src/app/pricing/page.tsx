import type { Metadata } from "next";
import PricingPlans from "@/components/PricingPlans";

export const metadata: Metadata = {
  title: "Pricing & membership plans",
  description:
    "Choose a Roopraise membership — Free, Silver, Gold, Platinum or Franchise. Sell wholesale and retail to buyers in the US, Canada, UK and Europe. Start free, upgrade anytime.",
};

const faqs = [
  {
    q: "Is there really a free plan?",
    a: "Yes. The Free plan lets small suppliers list up to 10 products with no commission and no transaction fees. Upgrade only when you want more listings and growth tools.",
  },
  {
    q: "Can I switch or cancel my plan?",
    a: "Anytime. Upgrade, downgrade or cancel from your supplier dashboard. Annual plans are billed yearly at a discount; monthly plans renew each month.",
  },
  {
    q: "What does a membership include?",
    a: "Your storefront, product listings, buyer inquiries (RFQs), and the growth tools listed in each plan — custom graphics, banner ads, dedicated support and priority placement on higher tiers.",
  },
  {
    q: "How do buyers pay suppliers?",
    a: "Buyers contact you through Roopraise and orders are arranged on-platform. See the How to Pay page for how trade-protected payments and payouts to your country work.",
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
            Choose your plan
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
            Find the right membership for your business. Start free and sell wholesale &amp; retail
            to buyers in the US, Canada, UK and Europe — upgrade as you grow.
          </p>
        </div>
      </section>

      {/* PLANS */}
      <section className="container-x py-14">
        <PricingPlans />
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="container-x max-w-3xl py-16">
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
    </div>
  );
}
