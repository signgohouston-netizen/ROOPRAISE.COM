"use client";

import { useState } from "react";

const openRequests = [
  { buyer: "Retail buyer", flag: "🇺🇸", country: "United States", item: "Cotton fleece hoodies, private label", qty: "2,000 pcs", budget: "$7–9 / unit", posted: "2 days ago", quotes: 6 },
  { buyer: "Wholesale importer", flag: "🇬🇧", country: "United Kingdom", item: "Non-stick cookware sets (7-pc)", qty: "500 sets", budget: "$25–30 / set", posted: "3 days ago", quotes: 4 },
  { buyer: "Online store", flag: "🇨🇦", country: "Canada", item: "Leather boxing gloves, 12oz & 14oz", qty: "600 pairs", budget: "$18–22 / pair", posted: "5 days ago", quotes: 9 },
  { buyer: "Distributor", flag: "🇩🇪", country: "Germany", item: "Cordless drill kits, 20V", qty: "300 units", budget: "$35–40 / unit", posted: "1 week ago", quotes: 7 },
  { buyer: "Boutique", flag: "🇦🇪", country: "UAE", item: "Hand-embroidered linen scarves", qty: "1,000 pcs", budget: "$5–8 / unit", posted: "1 week ago", quotes: 3 },
  { buyer: "Chain store", flag: "🇺🇸", country: "United States", item: "Stainless steel casserole hot-pot sets", qty: "1,500 sets", budget: "$18–24 / set", posted: "2 weeks ago", quotes: 11 },
];

export default function BuyerRequestsPage() {
  const [posted, setPosted] = useState(false);

  return (
    <div className="container-x py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-ink/50">
        <a href="/" className="hover:text-brand-600">Home</a>
        <span>/</span>
        <span className="text-ink/70">Buyer Requests</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* list */}
        <div>
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Buyer requests</h1>
          <p className="mt-2 max-w-2xl text-ink/60">
            Tell suppliers what you need and let them come to you. Buyers post sourcing requests;
            verified suppliers send quotes. Below are open requests from buyers around the world.
          </p>

          <div className="mt-6 space-y-4">
            {openRequests.map((r, i) => (
              <div key={i} className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-ink">{r.item}</h3>
                    <p className="mt-0.5 text-sm text-ink/50">
                      {r.flag} {r.buyer} · {r.country} · {r.posted}
                    </p>
                  </div>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {r.quotes} quotes
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink/70">
                  <span>📦 Qty: <span className="font-medium text-ink">{r.qty}</span></span>
                  <span>💰 Target: <span className="font-medium text-ink">{r.budget}</span></span>
                </div>
                <button className="mt-4 rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">
                  Send a quote
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* post form */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <h2 className="font-display text-xl font-bold text-ink">Post a buyer request</h2>
            <p className="mt-1 text-sm text-ink/60">
              Free for buyers. Get competing quotes from verified suppliers.
            </p>

            {posted ? (
              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                <p className="text-2xl">✅</p>
                <p className="mt-1 font-semibold text-emerald-800">Request posted</p>
                <p className="mt-1 text-sm text-emerald-700/80">
                  Verified suppliers will start sending you quotes shortly.
                </p>
                <p className="mt-2 text-xs text-ink/40">(Demo — nothing was actually submitted.)</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPosted(true);
                }}
                className="mt-5 flex flex-col gap-3"
              >
                <input required placeholder="What do you want to source?" className="h-11 rounded-xl border border-ink/15 bg-white px-3 text-sm outline-none focus:border-brand-400" />
                <div className="flex gap-3">
                  <input required placeholder="Quantity" className="h-11 w-1/2 rounded-xl border border-ink/15 bg-white px-3 text-sm outline-none focus:border-brand-400" />
                  <input placeholder="Target price" className="h-11 w-1/2 rounded-xl border border-ink/15 bg-white px-3 text-sm outline-none focus:border-brand-400" />
                </div>
                <input type="email" required placeholder="Your email" className="h-11 rounded-xl border border-ink/15 bg-white px-3 text-sm outline-none focus:border-brand-400" />
                <textarea rows={3} placeholder="Details — materials, branding, deadline…" className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400" />
                <button type="submit" className="rounded-full bg-brand-500 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
                  Post request
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
