import Link from "next/link";
import { categories } from "@/lib/data";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-white">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo size={38} />
            <p className="mt-4 max-w-xs text-sm text-ink/60">
              A marketplace for independent makers. Every purchase supports a real person and their craft.
            </p>
            <div className="mt-4 flex gap-3 text-ink/50">
              <span aria-hidden className="text-xl">📷</span>
              <span aria-hidden className="text-xl">🐦</span>
              <span aria-hidden className="text-xl">📌</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink/60">
              {categories.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="hover:text-brand-600">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Sell</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink/60">
              <li><Link href="/sell" className="hover:text-brand-600">Open a shop</Link></li>
              <li><Link href="/dashboard" className="hover:text-brand-600">Seller dashboard</Link></li>
              <li><Link href="/pricing" className="hover:text-brand-600">Fees & payments</Link></li>
              <li><Link href="/admin" className="hover:text-brand-600">Owner console</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Get the good stuff</h4>
            <p className="mt-4 text-sm text-ink/60">
              New shops, seasonal picks, and the occasional discount.
            </p>
            <form className="mt-3 flex gap-2" action="#">
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="h-10 w-full rounded-full border border-ink/15 bg-cream px-4 text-sm outline-none focus:border-brand-400"
                aria-label="Email address"
              />
              <button className="h-10 shrink-0 rounded-full bg-ink px-4 text-sm font-medium text-white transition hover:bg-brand-600">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink/10 pt-6 text-xs text-ink/50 sm:flex-row">
          <p>© {2026} Roopraise, Inc. A demo marketplace.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-brand-600">Terms</Link>
            <Link href="#" className="hover:text-brand-600">Privacy</Link>
            <Link href="#" className="hover:text-brand-600">Help</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
