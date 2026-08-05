"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function FavoritesPage() {
  const [ids, setIds] = useState<string[] | null>(null);

  useEffect(() => {
    try {
      setIds(JSON.parse(localStorage.getItem("rooprise-favorites") || "[]"));
    } catch {
      setIds([]);
    }
  }, []);

  const favs = ids ? products.filter((p) => ids.includes(p.id)) : [];

  return (
    <div className="container-x py-8">
      <h1 className="font-display text-3xl font-bold text-ink">Your favorites</h1>

      {ids === null ? (
        <p className="mt-6 text-ink/60">Loading…</p>
      ) : favs.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {favs.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-5xl">♡</p>
          <p className="mt-3 text-ink/70">
            Tap the heart on any item to save it here for later.
          </p>
          <Link
            href="/search"
            className="mt-6 inline-block rounded-full bg-brand-500 px-7 py-3 font-semibold text-white transition hover:bg-brand-600"
          >
            Browse items
          </Link>
        </div>
      )}
    </div>
  );
}
