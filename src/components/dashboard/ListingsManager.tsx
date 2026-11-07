"use client";

import { useEffect, useMemo, useState } from "react";
import ProductArt from "@/components/ProductArt";
import { money } from "@/lib/format";

export type Listing = {
  id: string;
  title: string;
  sku: string;
  category: string;
  image?: string;
  emoji: string;
  gradient: [string, string];
  price: number;
  stock: number;
  status: "active" | "draft";
  units: number;
};

const LOW = 5;
const KEY = "rooprise-vendor-listings";

export default function ListingsManager({ initial }: { initial: Listing[] }) {
  const [rows, setRows] = useState<Listing[]>(initial);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "draft" | "low">("all");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  // hydrate overrides from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved: Record<string, Partial<Listing>> = JSON.parse(raw);
        setRows((prev) =>
          prev.map((r) => (saved[r.id] ? { ...r, ...saved[r.id] } : r))
        );
      }
    } catch {
      /* ignore */
    }
  }, []);

  function persist(next: Listing[]) {
    const overrides: Record<string, Partial<Listing>> = {};
    next.forEach((r) => {
      overrides[r.id] = { price: r.price, stock: r.stock, status: r.status };
    });
    localStorage.setItem(KEY, JSON.stringify(overrides));
    setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  }

  function update(id: string, patch: Partial<Listing>) {
    setRows((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, ...patch } : r));
      persist(next);
      return next;
    });
  }

  const summary = useMemo(() => {
    const active = rows.filter((r) => r.status === "active").length;
    const low = rows.filter((r) => r.stock > 0 && r.stock <= LOW).length;
    const out = rows.filter((r) => r.stock === 0).length;
    const value = rows.reduce((n, r) => n + r.price * r.stock, 0);
    return { active, low, out, value };
  }, [rows]);

  const visible = rows.filter((r) => {
    if (q && !r.title.toLowerCase().includes(q.toLowerCase()) && !r.sku.toLowerCase().includes(q.toLowerCase()))
      return false;
    if (filter === "active") return r.status === "active";
    if (filter === "draft") return r.status === "draft";
    if (filter === "low") return r.stock <= LOW;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* summary chips */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Chip label="Active listings" value={`${summary.active}`} />
        <Chip label="Low stock" value={`${summary.low}`} tone={summary.low ? "amber" : undefined} />
        <Chip label="Out of stock" value={`${summary.out}`} tone={summary.out ? "rose" : undefined} />
        <Chip label="Inventory value" value={money(summary.value)} />
      </div>

      {/* toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title or SKU…"
          className="h-10 w-full rounded-full border border-ink/15 bg-white px-4 text-sm outline-none focus:border-brand-400 sm:max-w-xs"
        />
        <div className="flex gap-1.5">
          {(["all", "active", "draft", "low"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition ${
                filter === f ? "bg-ink text-white" : "border border-ink/15 bg-white text-ink/70 hover:border-brand-300"
              }`}
            >
              {f === "low" ? "Low stock" : f}
            </button>
          ))}
        </div>
        {savedAt && <span className="text-xs text-emerald-700 sm:ml-auto">✓ Saved {savedAt}</span>}
      </div>

      {/* table */}
      <div className="overflow-x-auto rounded-xl2 border border-ink/10 bg-white shadow-card">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/50">
              <th className="px-4 py-3 font-semibold">Item</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Inventory</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Sold</th>
              <th className="px-4 py-3 text-right font-semibold">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {visible.map((r) => (
              <tr key={r.id} className="hover:bg-cream/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <ProductArt
                      gradient={r.gradient}
                      emoji={r.emoji}
                      image={r.image}
                      alt={r.title}
                      size="sm"
                      sizes="44px"
                      className="h-11 w-11 shrink-0 rounded-lg"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">{r.title}</p>
                      <p className="text-xs text-ink/50">{r.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center rounded-lg border border-ink/15 pl-2 focus-within:border-brand-400">
                    <span className="text-ink/50">$</span>
                    <input
                      type="number"
                      min={0}
                      step="1"
                      value={r.price}
                      onChange={(e) => update(r.id, { price: Math.max(0, Number(e.target.value)) })}
                      className="w-16 bg-transparent px-1 py-1.5 text-sm outline-none"
                      aria-label={`Price for ${r.title}`}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-lg border border-ink/15">
                      <button
                        onClick={() => update(r.id, { stock: Math.max(0, r.stock - 1) })}
                        className="grid h-8 w-7 place-items-center text-ink/60 hover:text-brand-600"
                        aria-label="Decrease stock"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={0}
                        value={r.stock}
                        onChange={(e) => update(r.id, { stock: Math.max(0, Number(e.target.value)) })}
                        className="w-12 bg-transparent py-1.5 text-center text-sm outline-none"
                        aria-label={`Stock for ${r.title}`}
                      />
                      <button
                        onClick={() => update(r.id, { stock: r.stock + 1 })}
                        className="grid h-8 w-7 place-items-center text-ink/60 hover:text-brand-600"
                        aria-label="Increase stock"
                      >
                        +
                      </button>
                    </div>
                    {r.stock === 0 ? (
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">Out</span>
                    ) : r.stock <= LOW ? (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">Low</span>
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => update(r.id, { status: r.status === "active" ? "draft" : "active" })}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                      r.status === "active"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        : "bg-ink/10 text-ink/60 hover:bg-ink/20"
                    }`}
                    aria-pressed={r.status === "active"}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${r.status === "active" ? "bg-emerald-500" : "bg-ink/40"}`} />
                    {r.status === "active" ? "Active" : "Draft"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right font-medium text-ink">{r.units.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-medium text-ink">{money(r.price * r.units)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && (
          <p className="p-8 text-center text-sm text-ink/50">No listings match your filters.</p>
        )}
      </div>
      <p className="text-xs text-ink/50">
        Edits save automatically to this browser (demo). Wire these inputs to your API to persist for real.
      </p>
    </div>
  );
}

function Chip({ label, value, tone }: { label: string; value: string; tone?: "amber" | "rose" }) {
  const toneCls =
    tone === "amber"
      ? "border-amber-200 bg-amber-50"
      : tone === "rose"
      ? "border-rose-200 bg-rose-50"
      : "border-ink/10 bg-white";
  return (
    <div className={`rounded-xl border ${toneCls} px-4 py-3 shadow-sm`}>
      <p className="text-xs text-ink/60">{label}</p>
      <p className="mt-0.5 text-xl font-bold text-ink">{value}</p>
    </div>
  );
}
