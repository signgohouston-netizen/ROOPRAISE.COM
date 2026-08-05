import { Suspense } from "react";
import Link from "next/link";
import { searchProducts, categories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Search" };

function Results({ q }: { q: string }) {
  const items = searchProducts(q);
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          {q ? (
            <>
              Results for <span className="text-brand-600">“{q}”</span>
            </>
          ) : (
            "All items"
          )}
        </h1>
        <p className="text-sm text-ink/60">{items.length} found</p>
      </div>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="whitespace-nowrap rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-ink/70 transition hover:border-brand-300"
          >
            {c.emoji} {c.name}
          </Link>
        ))}
      </div>

      {items.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-4xl">🔍</p>
          <p className="mt-3 text-ink/70">
            No matches for “{q}”. Try a different term or browse a category above.
          </p>
        </div>
      )}
    </>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return (
    <div className="container-x py-8">
      <Suspense fallback={<p className="text-ink/60">Searching…</p>}>
        <Results q={q} />
      </Suspense>
    </div>
  );
}
