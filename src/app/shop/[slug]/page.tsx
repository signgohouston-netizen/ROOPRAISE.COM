import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getShop, productsByShop, shops } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Price from "@/components/Price";

export function generateStaticParams() {
  return shops.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getShop(slug);
  return { title: s ? s.name : "Shop" };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const shop = getShop(slug);
  if (!shop) notFound();
  const items = productsByShop(slug);

  return (
    <div>
      {/* banner */}
      <div className="h-40 w-full bg-gradient-to-r from-brand-200 via-brand-100 to-brand-50 sm:h-52" />
      <div className="container-x">
        <div className="-mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
          <span className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl bg-brand-500 text-4xl font-bold text-white shadow-pop ring-4 ring-cream">
            {shop.name.charAt(0)}
          </span>
          <div className="pb-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-3xl font-bold text-ink">{shop.name}</h1>
              {shop.verified && (
                <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-bold text-brand-700">
                  ✓ Verified supplier
                </span>
              )}
            </div>
            <p className="text-ink/60">{shop.tagline}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/60">
              <span>⭐ {shop.rating} rating</span>
              <span>{shop.sales.toLocaleString()} orders</span>
              <span>{shop.flag} {shop.location}, {shop.country}</span>
              <span>Est. {shop.since}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {shop.wholesale && (
                <span className="flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                  📦 Wholesale
                  {shop.minOrder ? (
                    <Price usd={shop.minOrder} prefix="· MOQ from " />
                  ) : null}
                </span>
              )}
              {shop.retail && (
                <span className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/70">
                  🛍️ Retail single units
                </span>
              )}
              {shop.leadTime && (
                <span className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/70">
                  ⏱️ Lead time {shop.leadTime}
                </span>
              )}
            </div>
          </div>
          <button className="mt-2 shrink-0 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 sm:ml-auto">
            Contact supplier
          </button>
        </div>

        <div className="mt-10 mb-2 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-ink">
            All items <span className="text-ink/40">({items.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 pb-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
