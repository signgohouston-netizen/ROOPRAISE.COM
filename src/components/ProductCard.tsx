import Link from "next/link";
import type { Product } from "@/lib/data";
import { getShop } from "@/lib/data";
import ProductArt from "./ProductArt";
import Price from "./Price";
import Stars from "./Stars";
import FavoriteButton from "./FavoriteButton";

const badgeStyles: Record<string, string> = {
  Bestseller: "bg-brand-500 text-white",
  New: "bg-emerald-600 text-white",
  Sale: "bg-rose-600 text-white",
  "Editors' Pick": "bg-ink text-white",
};

export default function ProductCard({ product }: { product: Product }) {
  const shop = getShop(product.shop);
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl2 border border-ink/10 bg-white shadow-card transition hover:border-brand-200 hover:shadow-pop">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden">
          <ProductArt
            gradient={product.gradient}
            emoji={product.emoji}
            image={product.image}
            alt={product.title}
            size="md"
            className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {product.badge && (
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${
                badgeStyles[product.badge] ?? "bg-ink text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
          {shop && (
            <span className="absolute bottom-0 left-0 bg-ink/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
              📍 {shop.location}
            </span>
          )}
        </div>
      </Link>
      <FavoriteButton productId={product.id} className="absolute right-3 top-3 z-10" />

      <div className="flex flex-1 flex-col gap-1 p-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-[14px] font-medium leading-snug text-ink group-hover:underline">
            {product.title}
          </h3>
        </Link>

        <div className="mt-0.5 flex items-baseline gap-2">
          <Price usd={product.wholesalePrice ?? product.price} className="text-lg font-bold text-ink" />
          {product.wholesalePrice && (
            <Price usd={product.price} prefix="retail " className="text-xs text-ink/40" />
          )}
        </div>
        <p className="text-xs text-ink/50">
          {product.moq ? `MOQ: ${product.moq} units` : "Single units available"}
        </p>

        <div className="mt-0.5 flex items-center gap-1.5">
          <Stars rating={product.rating} reviews={product.reviews} />
        </div>

        {shop && (
          <Link
            href={`/shop/${shop.slug}`}
            className="mt-0.5 flex w-fit items-center gap-1 text-xs font-medium text-ink/60 hover:text-brand-600 hover:underline"
          >
            {shop.flag} {shop.name}
            {shop.verified && <span className="text-brand-600" title="Verified supplier">✓</span>}
          </Link>
        )}

        <Link
          href={`/product/${product.slug}`}
          className="mt-2 block rounded-lg bg-orange-500 py-2 text-center text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Contact Supplier
        </Link>
      </div>
    </div>
  );
}
