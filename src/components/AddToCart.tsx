"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import { useCart } from "@/lib/cart";

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-ink">Quantity</label>
        <div className="flex items-center rounded-full border border-ink/15">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-10 w-10 place-items-center text-lg text-ink/70 hover:text-brand-600"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center font-medium">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="grid h-10 w-10 place-items-center text-lg text-ink/70 hover:text-brand-600"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className={`w-full rounded-full py-3.5 text-base font-semibold text-white shadow-sm transition ${
          added ? "bg-emerald-600" : "bg-brand-500 hover:bg-brand-600"
        }`}
      >
        {added ? "✓ Added to cart" : "Add to cart"}
      </button>
      <button className="w-full rounded-full border border-ink/20 py-3.5 text-base font-semibold text-ink transition hover:border-ink/40 hover:bg-white">
        Buy it now
      </button>
    </div>
  );
}
