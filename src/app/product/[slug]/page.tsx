import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, getShop, getCategory, relatedProducts, products } from "@/lib/data";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import Price from "@/components/Price";
import Stars from "@/components/Stars";
import ContactSupplier from "@/components/ContactSupplier";
import FavoriteButton from "@/components/FavoriteButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Not found" };
  return { title: p.title, description: p.description };
}

const reviewSnippets = [
  { name: "Marla", text: "Even prettier in person. Shipping was quick and it arrived beautifully wrapped.", rating: 5 },
  { name: "Devon", text: "Exactly as described and the quality is outstanding. Would buy from this shop again.", rating: 5 },
  { name: "Priya", text: "Gorgeous craftsmanship. Took off one star only because I wanted it sooner!", rating: 4 },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const shop = getShop(product.shop);
  const category = getCategory(product.category);
  const related = relatedProducts(product);
  const thumbs = [0, 1, 2, 3];

  return (
    <div className="container-x py-6">
      {/* breadcrumb */}
      <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-ink/50">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        {category && (
          <>
            <Link href={`/category/${category.slug}`} className="hover:text-brand-600">
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-ink/70">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* gallery */}
        <div>
          <div className="relative overflow-hidden rounded-2xl shadow-card">
            <ProductArt
              gradient={product.gradient}
              emoji={product.emoji}
              image={product.image}
              alt={product.title}
              size="lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="aspect-square w-full"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white shadow">
                {product.badge}
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            {thumbs.map((i) => (
              <div
                key={i}
                className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border shadow-sm ${
                  i === 0 ? "border-brand-400 ring-1 ring-brand-300" : "border-ink/10"
                }`}
              >
                <ProductArt
                  gradient={product.gradient}
                  emoji={product.emoji}
                  image={product.image}
                  alt={product.title}
                  size="sm"
                  sizes="80px"
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* buy box */}
        <div className="flex flex-col">
          {shop && (
            <Link
              href={`/shop/${shop.slug}`}
              className="flex w-fit items-center gap-2 text-sm font-medium text-brand-600 hover:underline"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                {shop.name.charAt(0)}
              </span>
              {shop.name}
              {shop.verified && (
                <span className="rounded-full bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold text-brand-700">
                  ✓ Verified
                </span>
              )}
              <span className="text-ink/40">· {shop.flag} {shop.location} · ⭐ {shop.rating}</span>
            </Link>
          )}

          <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink">
            {product.title}
          </h1>

          <div className="mt-3">
            <Stars rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <Price usd={product.price} className="text-3xl font-bold text-ink" />
            {product.compareAt && (
              <>
                <Price usd={product.compareAt} className="text-lg text-ink/40 line-through" />
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-sm font-semibold text-rose-700">
                  Save <Price usd={product.compareAt - product.price} />
                </span>
              </>
            )}
          </div>

          {product.freeShipping && (
            <p className="mt-2 text-sm font-medium text-emerald-700">
              ✓ Free shipping · Arrives in 3–7 business days
            </p>
          )}

          {product.wholesalePrice && (
            <div className="mt-4 rounded-xl2 border border-brand-200 bg-brand-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-brand-800">🏷️ Wholesale price</span>
                {shop?.minOrder && (
                  <Price usd={shop.minOrder} prefix="Store MOQ from " className="text-xs text-brand-700" />
                )}
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <Price usd={product.wholesalePrice} className="text-2xl font-bold text-brand-800" />
                <span className="text-sm text-brand-700">/ unit</span>
                {product.moq && (
                  <span className="ml-auto rounded-full bg-white px-2.5 py-1 text-xs font-medium text-brand-700">
                    Min. order {product.moq} units
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-brand-700/80">
                For businesses buying in bulk. Request a quote or samples at checkout.
              </p>
            </div>
          )}

          <p className="mt-5 text-[15px] leading-relaxed text-ink/70">{product.description}</p>

          <div className="mt-6">
            <ContactSupplier product={product} shop={shop} />
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm text-ink/60">
            <div className="flex items-center gap-2">
              <FavoriteButton productId={product.id} className="!static !h-8 !w-8" />
              Save for later
            </div>
          </div>

          {/* trust list */}
          <ul className="mt-6 space-y-2 rounded-xl2 border border-ink/10 bg-white p-5 text-sm text-ink/70">
            <li className="flex gap-2"><span>🛡️</span> Trade protection — payment released only once your order ships as described.</li>
            <li className="flex gap-2"><span>✅</span> Ships direct from a verified supplier{shop ? ` in ${shop.location}` : ""}.</li>
            <li className="flex gap-2"><span>📦</span> Bulk and sample orders welcome — custom quotes on request.</li>
          </ul>
        </div>
      </div>

      {/* reviews */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold text-ink">
          Reviews <span className="text-ink/40">({product.reviews.toLocaleString()})</span>
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {reviewSnippets.map((r) => (
            <div key={r.name} className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-card">
              <Stars rating={r.rating} />
              <p className="mt-3 text-sm leading-relaxed text-ink/70">“{r.text}”</p>
              <p className="mt-3 text-sm font-medium text-ink">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 font-display text-2xl font-bold text-ink">You may also like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
