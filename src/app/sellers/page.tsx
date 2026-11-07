import Link from "next/link";
import type { Metadata } from "next";
import { shops, productsByShop } from "@/lib/data";
import { money } from "@/lib/format";

export const metadata: Metadata = {
  title: "Suppliers",
  description:
    "Browse verified manufacturers and suppliers on Roopraise — factory-direct wholesale from Pakistan and across Asia.",
};

export default function SellersPage() {
  return (
    <div className="container-x py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-ink/50">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <span className="text-ink/70">Suppliers</span>
      </nav>

      <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-10 text-white sm:px-10">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Verified suppliers</h1>
        <p className="mt-2 max-w-2xl text-white/85">
          Source factory-direct from vetted manufacturers. Every supplier below has passed a
          business check and quality review. Contact them for wholesale pricing, samples and
          lead times.
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <span className="rounded-full bg-white/10 px-3 py-1.5">🏭 {shops.length} suppliers</span>
          <span className="rounded-full bg-white/10 px-3 py-1.5">✅ 100% verified</span>
          <span className="rounded-full bg-white/10 px-3 py-1.5">🇵🇰 Pakistan · more of Asia soon</span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shops.map((s) => {
          const count = productsByShop(s.slug).length;
          return (
            <Link
              key={s.slug}
              href={`/shop/${s.slug}`}
              className="flex flex-col rounded-xl2 border border-ink/10 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-brand-200"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-100 text-xl font-bold text-brand-700">
                  {s.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <h3 className="flex items-center gap-1.5 truncate font-semibold text-ink">
                    {s.name}
                    {s.verified && (
                      <span className="shrink-0 rounded-full bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold text-brand-700">
                        ✓
                      </span>
                    )}
                  </h3>
                  <p className="truncate text-xs text-ink/50">{s.flag} {s.location}, {s.country}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink/60">{s.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.wholesale && (
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-700">
                    📦 MOQ from {money(s.minOrder ?? 0)}
                  </span>
                )}
                {s.leadTime && (
                  <span className="rounded-full border border-ink/15 px-2.5 py-1 text-[11px] font-medium text-ink/60">
                    ⏱️ {s.leadTime}
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3 text-xs text-ink/50">
                <span>⭐ {s.rating} · {s.sales.toLocaleString()} orders</span>
                <span>{count} product{count === 1 ? "" : "s"} →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
