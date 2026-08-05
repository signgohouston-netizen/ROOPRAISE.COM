"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartBadge() {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-brand-50"
      aria-label={`Cart with ${count} item${count === 1 ? "" : "s"}`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
        <path d="M2 3h2l2.2 12.2a1.5 1.5 0 0 0 1.5 1.3h9.1a1.5 1.5 0 0 0 1.5-1.2L21 7H5" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
