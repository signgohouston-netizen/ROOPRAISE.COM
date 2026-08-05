import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategory, productsByCategory, categories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  return { title: c ? c.name : "Category" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const items = productsByCategory(slug);

  return (
    <div className="container-x py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-ink/50">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <span className="text-ink/70">{category.name}</span>
      </nav>

      <div className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl py-16 text-center text-white">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <span className="relative text-4xl">{category.emoji}</span>
        <h1 className="relative font-display text-3xl font-bold sm:text-4xl">{category.name}</h1>
        <p className="relative text-white/85">{category.blurb}</p>
      </div>

      {/* category chips */}
      <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
              c.slug === slug
                ? "bg-brand-500 text-white"
                : "border border-ink/15 bg-white text-ink/70 hover:border-brand-300"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-ink/60">
          {items.length} item{items.length === 1 ? "" : "s"}
        </p>
      </div>

      {items.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-ink/60">No items yet — check back soon!</p>
      )}
    </div>
  );
}
