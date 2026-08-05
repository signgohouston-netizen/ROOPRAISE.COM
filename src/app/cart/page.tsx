"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import ProductArt from "@/components/ProductArt";

export default function CartPage() {
  const { items, setQty, remove, subtotal, count, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 6.5;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="container-x flex flex-col items-center py-24 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-4xl">✓</span>
        <h1 className="mt-6 font-display text-3xl font-bold text-ink">Order placed!</h1>
        <p className="mt-2 max-w-md text-ink/60">
          Thanks for supporting independent makers. A confirmation is on its way to your inbox.
          (This is a demo — no real charge was made.)
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-brand-500 px-7 py-3 font-semibold text-white transition hover:bg-brand-600"
        >
          Keep shopping
        </Link>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="container-x flex flex-col items-center py-24 text-center">
        <span className="text-6xl">🛒</span>
        <h1 className="mt-6 font-display text-3xl font-bold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-ink/60">Discover something handmade to fill it up.</p>
        <Link
          href="/search"
          className="mt-8 rounded-full bg-brand-500 px-7 py-3 font-semibold text-white transition hover:bg-brand-600"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-8">
      <h1 className="font-display text-3xl font-bold text-ink">
        Your cart <span className="text-ink/40">({count})</span>
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* items */}
        <ul className="divide-y divide-ink/10 rounded-xl2 border border-ink/10 bg-white">
          {items.map((i) => (
            <li key={i.id} className="flex gap-4 p-4">
              <Link href={`/product/${i.slug}`} className="shrink-0">
                <ProductArt gradient={i.gradient} emoji={i.emoji} image={i.image} alt={i.title} size="sm" sizes="96px" className="h-24 w-24 rounded-xl" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <Link href={`/product/${i.slug}`} className="font-medium text-ink hover:underline">
                  {i.title}
                </Link>
                <p className="text-sm text-ink/50">{money(i.price)} each</p>

                <div className="mt-auto flex items-center gap-4 pt-2">
                  <div className="flex items-center rounded-full border border-ink/15">
                    <button
                      onClick={() => setQty(i.id, i.qty - 1)}
                      className="grid h-8 w-8 place-items-center text-ink/70 hover:text-brand-600"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-7 text-center text-sm font-medium">{i.qty}</span>
                    <button
                      onClick={() => setQty(i.id, i.qty + 1)}
                      className="grid h-8 w-8 place-items-center text-ink/70 hover:text-brand-600"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => remove(i.id)}
                    className="text-sm text-ink/50 underline-offset-2 hover:text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="shrink-0 font-semibold text-ink">{money(i.price * i.qty)}</div>
            </li>
          ))}
          <li className="p-4">
            <button onClick={clear} className="text-sm text-ink/50 hover:text-rose-600 hover:underline">
              Clear cart
            </button>
          </li>
        </ul>

        {/* summary */}
        <aside className="h-fit rounded-xl2 border border-ink/10 bg-white p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-bold text-ink">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink/60">Subtotal</dt>
              <dd className="font-medium text-ink">{money(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/60">Shipping</dt>
              <dd className="font-medium text-ink">
                {shipping === 0 ? <span className="text-emerald-700">Free</span> : money(shipping)}
              </dd>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-ink/50">
                Add {money(75 - subtotal)} more for free shipping.
              </p>
            )}
          </dl>
          <div className="my-4 border-t border-ink/10" />
          <div className="flex items-baseline justify-between">
            <span className="font-semibold text-ink">Total</span>
            <span className="text-2xl font-bold text-ink">{money(total)}</span>
          </div>

          <button
            onClick={() => {
              setPlaced(true);
              clear();
            }}
            className="mt-5 w-full rounded-full bg-brand-500 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-600"
          >
            Checkout securely
          </button>
          <p className="mt-3 text-center text-xs text-ink/50">
            🔒 Demo checkout — no payment is processed.
          </p>
        </aside>
      </div>
    </div>
  );
}
