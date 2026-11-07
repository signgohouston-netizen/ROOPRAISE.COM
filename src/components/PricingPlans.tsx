"use client";

import { useState } from "react";
import Link from "next/link";
import Price from "./Price";

type Feat = { text: string; type: "check" | "plus" };
type Tier = {
  name: string;
  audience: string;
  ribbon: string;
  ribbonClass: string;
  monthly: number;
  annualMonthly: number;
  annualTotal: number;
  features: Feat[];
  cta: string;
  recommended?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Free",
    audience: "Small businesses",
    ribbon: "Free",
    ribbonClass: "bg-brand-100 text-brand-700",
    monthly: 0,
    annualMonthly: 0,
    annualTotal: 0,
    features: [
      { text: "10 product listings", type: "check" },
      { text: "No commission", type: "check" },
      { text: "No transaction fees", type: "check" },
    ],
    cta: "Become a supplier",
  },
  {
    name: "Silver",
    audience: "Medium businesses",
    ribbon: "Silver",
    ribbonClass: "bg-slate-200 text-slate-700",
    monthly: 19,
    annualMonthly: 17,
    annualTotal: 204,
    recommended: true,
    features: [
      { text: "50 product listings", type: "check" },
      { text: "Everything in Free", type: "check" },
      { text: "Custom graphics", type: "plus" },
    ],
    cta: "Become a supplier",
  },
  {
    name: "Gold",
    audience: "Large businesses",
    ribbon: "Gold",
    ribbonClass: "bg-accent-200 text-accent-800",
    monthly: 29,
    annualMonthly: 25,
    annualTotal: 300,
    features: [
      { text: "150 product listings", type: "check" },
      { text: "Everything in Silver", type: "check" },
      { text: "Banner ad design", type: "plus" },
    ],
    cta: "Become a supplier",
  },
  {
    name: "Platinum",
    audience: "Industrial leaders",
    ribbon: "Industrial",
    ribbonClass: "bg-ink text-white",
    monthly: 549,
    annualMonthly: 499,
    annualTotal: 5988,
    features: [
      { text: "500 product listings", type: "check" },
      { text: "Everything in Gold", type: "check" },
      { text: "Guaranteed shoutout", type: "plus" },
      { text: "Dedicated graphic designer", type: "plus" },
      { text: "Dedicated account manager", type: "plus" },
      { text: "Priority placement in search", type: "plus" },
    ],
    cta: "Become a supplier",
  },
];

const franchiseFeatures = [
  "Instant exposure to serious investors",
  "Million+ annual visitors",
  "24/7 lead flow",
  "Grow your brand quickly",
  "Call & inquiry reports (who contacted you & from where)",
  "Featured franchise placement",
];

function Marker({ type }: { type: "check" | "plus" }) {
  return (
    <span className={`mt-0.5 shrink-0 font-bold ${type === "check" ? "text-brand-600" : "text-accent-600"}`}>
      {type === "check" ? "✓" : "+"}
    </span>
  );
}

export default function PricingPlans() {
  const [annual, setAnnual] = useState(true);

  return (
    <div>
      {/* billing toggle */}
      <div className="flex items-center justify-center">
        <div className="inline-flex rounded-full border border-ink/10 bg-white p-1 shadow-sm">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              !annual ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              annual ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
            }`}
          >
            Annually
            <span className="ml-1.5 text-xs font-medium text-emerald-600">save ~15%</span>
          </button>
        </div>
      </div>

      {/* tiers */}
      <div className="mt-10 grid gap-5 lg:grid-cols-4">
        {tiers.map((t) => {
          const perMonth = annual ? t.annualMonthly : t.monthly;
          return (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl bg-white p-6 shadow-card ${
                t.recommended ? "border-2 border-accent-400 ring-2 ring-accent-200" : "border border-ink/10"
              }`}
            >
              {t.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-ink shadow-sm">
                  Recommended
                </span>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-ink">{t.name}</h3>
                  <p className="text-sm text-ink/50">{t.audience}</p>
                </div>
                <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${t.ribbonClass}`}>
                  {t.ribbon}
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-baseline gap-1">
                  <Price usd={perMonth} className="text-3xl font-bold text-ink" />
                  <span className="text-sm text-ink/50">/month</span>
                </div>
                <p className="mt-1 h-5 text-xs text-ink/50">
                  {t.annualTotal > 0 && annual ? (
                    <>
                      <Price usd={t.annualTotal} /> billed annually
                    </>
                  ) : t.monthly === 0 ? (
                    "Free membership"
                  ) : (
                    "billed monthly"
                  )}
                </p>
              </div>

              <ul className="mt-5 flex-1 space-y-2.5 border-t border-ink/10 pt-5 text-sm text-ink/70">
                {t.features.map((f) => (
                  <li key={f.text} className="flex gap-2">
                    <Marker type={f.type} />
                    {f.text}
                  </li>
                ))}
              </ul>

              <Link
                href="/sell"
                className={`mt-6 rounded-full py-3 text-center text-sm font-semibold transition ${
                  t.recommended
                    ? "bg-ink text-white hover:bg-brand-700"
                    : "border border-ink/20 text-ink hover:border-ink/40 hover:bg-cream"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          );
        })}
      </div>

      {/* franchise band */}
      <div className="mt-6 grid gap-8 rounded-2xl border border-brand-200 bg-brand-50 p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <h3 className="font-display text-2xl font-bold text-ink">Franchise</h3>
          <p className="mt-1 max-w-sm text-ink/60">
            Promote your franchise to prospective investors and buyers across the world.
          </p>
          <div className="mt-5 flex items-baseline gap-1">
            <Price usd={annual ? 50 : 59} className="text-3xl font-bold text-ink" />
            <span className="text-sm text-ink/50">/month</span>
          </div>
          <p className="mt-1 text-xs text-ink/50">
            {annual ? (
              <>
                <Price usd={600} /> billed annually
              </>
            ) : (
              "billed monthly"
            )}
          </p>
          <Link
            href="/sell"
            className="mt-5 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Become a franchise partner
          </Link>
        </div>
        <ul className="grid gap-y-3 sm:grid-cols-2">
          {franchiseFeatures.map((f) => (
            <li key={f} className="flex gap-2 text-sm text-ink/70">
              <span className="mt-0.5 shrink-0 font-bold text-brand-600">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-center text-xs text-ink/40">
        Prices shown in your selected currency (set in USD). Taxes may apply. Cancel anytime.
      </p>
    </div>
  );
}
