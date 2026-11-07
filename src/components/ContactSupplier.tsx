"use client";

import { useState } from "react";
import type { Product, Shop } from "@/lib/data";
import { money } from "@/lib/format";

export default function ContactSupplier({
  product,
  shop,
}: {
  product: Product;
  shop?: Shop;
}) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [qty, setQty] = useState(product.moq ?? 1);

  const supplierName = shop?.name ?? "the supplier";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-ink/50">Sold by</p>
          <p className="flex items-center gap-1.5 font-semibold text-ink">
            {shop?.flag} {supplierName}
            {shop?.verified && (
              <span className="rounded-full bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold text-brand-700">
                ✓ Verified
              </span>
            )}
          </p>
          {shop && (
            <p className="mt-0.5 text-xs text-ink/50">
              📍 {shop.location}, {shop.country}
              {shop.leadTime ? ` · ⏱️ ${shop.leadTime}` : ""}
            </p>
          )}
        </div>
      </div>

      {!sent ? (
        <>
          {!open ? (
            <button
              onClick={() => setOpen(true)}
              className="mt-4 w-full rounded-full bg-orange-500 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              Contact Supplier
            </button>
          ) : (
            <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="text-xs font-medium text-ink/60">Quantity needed</label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                    className="h-11 w-28 rounded-xl border border-ink/15 bg-cream px-3 text-sm outline-none focus:border-brand-400"
                  />
                  {product.moq && (
                    <span className="text-xs text-ink/50">MOQ {product.moq} units</span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-ink/60">Your email</label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="mt-1 h-11 w-full rounded-xl border border-ink/15 bg-cream px-3 text-sm outline-none focus:border-brand-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink/60">Message</label>
                <textarea
                  rows={3}
                  defaultValue={`Hi ${supplierName}, I'm interested in "${product.title}". Please share your best wholesale price, lead time, and shipping options.`}
                  className="mt-1 w-full rounded-xl border border-ink/15 bg-cream px-3 py-2 text-sm outline-none focus:border-brand-400"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-orange-500 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                Send inquiry
              </button>
              <p className="text-center text-xs text-ink/40">
                Keep all orders & chat on Roopraise so your trade protection stays valid.
              </p>
            </form>
          )}
        </>
      ) : (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <p className="text-2xl">✅</p>
          <p className="mt-1 font-semibold text-emerald-800">Inquiry sent to {supplierName}</p>
          <p className="mt-1 text-sm text-emerald-700/80">
            Suppliers usually reply within 24–48 hours. We&apos;ll notify you by email.
          </p>
          <p className="mt-2 text-xs text-ink/40">(Demo — no message was actually sent.)</p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-center gap-4 border-t border-ink/10 pt-3 text-xs text-ink/50">
        <span>🛡️ Trade protection</span>
        <span>💬 On-platform chat</span>
        <span>📦 Samples on request</span>
      </div>
    </div>
  );
}
