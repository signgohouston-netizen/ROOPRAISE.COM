import Link from "next/link";
import type { Product } from "@/lib/data";
import { getShop } from "@/lib/data";
import { money } from "@/lib/format";
import ProductArt from "./ProductArt";
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
    <div className="group relative flex flex-col">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-xl2 shadow-card">
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
        </div>
      </Link>
      <FavoriteButton
        productId={product.id}
        className="absolute right-3 top-3 z-10"
      />
      <div className="mt-3 flex flex-col gap-1">
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-1 text-[15px] font-medium text-ink group-hover:underline">
            {product.title}
          </h3>
        </Link>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-ink">{money(product.price)}</span>
          {product.compareAt && (
            <span className="text-sm text-ink/40 line-through">{money(product.compareAt)}</span>
          )}
          {product.freeShipping && (
            <span className="ml-auto text-xs font-medium text-emerald-700">Free shipping</span>
          )}
        </div>
        {shop && (
          <Link
            href={`/shop/${shop.slug}`}
            className="mt-0.5 w-fit text-xs text-ink/50 hover:text-brand-600 hover:underline"
          >
            {shop.name}
          </Link>
        )}
      </div>
    </div>
  );
}
