"use client";

import { useMemo, useState } from "react";
import { categoryRates, tiers, computeFees } from "@/lib/pricing";
import { money } from "@/lib/format";

export default function FeeCalculator() {
  const [price, setPrice] = useState(48);
  const [shipping, setShipping] = useState(6);
  const [catIdx, setCatIdx] = useState(1); // jewelry
  const [tierIdx, setTierIdx] = useState(0);

  const cat = categoryRates[catIdx];
  const tier = tiers[tierIdx];

  const b = useMemo(
    () => computeFees({ price, shipping, categoryRate: cat.rate, discount: tier.discount }),
    [price, shipping, cat.rate, tier.discount]
  );

  return (
    <div className="grid gap-6 rounded-xl2 border border-ink/10 bg-white p-6 shadow-card lg:grid-cols-2 lg:p-8">
      {/* inputs */}
      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium text-ink">Item price</label>
          <div className="mt-1 flex items-center rounded-lg border border-ink/15 pl-3 focus-within:border-brand-400">
            <span className="text-ink/50">$</span>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
              className="w-full bg-transparent px-2 py-2.5 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-ink">Shipping charged to buyer</label>
          <div className="mt-1 flex items-center rounded-lg border border-ink/15 pl-3 focus-within:border-brand-400">
            <span className="text-ink/50">$</span>
            <input
              type="number"
              min={0}
              value={shipping}
              onChange={(e) => setShipping(Math.max(0, Number(e.target.value)))}
              className="w-full bg-transparent px-2 py-2.5 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-ink">Category</label>
          <select
            value={catIdx}
            onChange={(e) => setCatIdx(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 outline-none focus:border-brand-400"
          >
            {categoryRates.map((c, i) => (
              <option key={c.slug} value={i}>
                {c.emoji} {c.name} — {(c.rate * 100).toFixed(0)}%
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-ink">Your seller tier</label>
          <select
            value={tierIdx}
            onChange={(e) => setTierIdx(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 outline-none focus:border-brand-400"
          >
            {tiers.map((t, i) => (
              <option key={t.name} value={i}>
                {t.name} {t.discount > 0 ? `(−${(t.discount * 100).toFixed(1)}% commission)` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* breakdown */}
      <div className="flex flex-col rounded-xl bg-cream p-6">
        <p className="text-sm text-ink/60">Buyer pays</p>
        <p className="text-3xl font-bold text-ink">{money(b.gross)}</p>

        <dl className="mt-5 space-y-2.5 text-sm">
          <Row
            label={`Sales commission (${(b.rate * 100).toFixed(1)}%)`}
            value={`− ${money(b.commission)}`}
          />
          <Row label="Payment processing (2.9%)" value={`− ${money(b.processing)}`} />
          <Row label="Per-order fee" value={`− ${money(b.perOrder)}`} />
          <Row label="International payout (1.5%)" value={`− ${money(b.payout)}`} />
          <div className="my-2 border-t border-ink/10" />
          <Row label="Total Roopraise fees" value={`− ${money(b.totalFees)}`} strong />
        </dl>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between rounded-xl bg-brand-500 px-5 py-4 text-white">
            <div>
              <p className="text-sm text-white/80">You take home</p>
              <p className="text-2xl font-bold">{money(b.net)}</p>
            </div>
            <p className="pb-1 text-sm font-semibold text-white/90">
              {(b.takeHomePct * 100).toFixed(0)}% of sale
            </p>
          </div>
          <p className="mt-2 text-center text-xs text-ink/50">
            No listing fee · no subscription — this is all you ever pay.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={strong ? "font-semibold text-ink" : "text-ink/60"}>{label}</dt>
      <dd className={strong ? "font-semibold text-ink" : "text-ink/80"}>{value}</dd>
    </div>
  );
}
