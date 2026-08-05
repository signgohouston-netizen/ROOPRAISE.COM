import Link from "next/link";
import { Suspense } from "react";
import { categories } from "@/lib/data";
import SearchBar from "./SearchBar";
import CartBadge from "./CartBadge";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="container-x">
        {/* top row */}
        <div className="flex h-16 items-center gap-4">
          <Logo size={38} className="shrink-0" />

          <div className="hidden flex-1 md:block">
            <Suspense fallback={<div className="h-11" />}>
              <SearchBar />
            </Suspense>
          </div>

          <nav className="ml-auto flex items-center gap-1">
            <Link
              href="/dashboard"
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-ink transition hover:bg-brand-50 sm:block"
            >
              Sell on Roopraise
            </Link>
            <Link
              href="/favorites"
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-brand-50"
              aria-label="Favorites"
            >
              <span className="text-xl">♡</span>
            </Link>
            <CartBadge />
          </nav>
        </div>

        {/* mobile search */}
        <div className="pb-3 md:hidden">
          <Suspense fallback={<div className="h-11" />}>
            <SearchBar />
          </Suspense>
        </div>

        {/* category nav */}
        <nav className="no-scrollbar -mb-px flex items-center gap-1 overflow-x-auto pb-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-ink/70 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
