import Link from "next/link";
import { categories } from "@/lib/data";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-white">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-5">
          {/* brand + contact */}
          <div className="md:col-span-2">
            <Logo size={38} />
            <p className="mt-4 max-w-xs text-sm text-ink/60">
              A cross-border wholesale &amp; retail marketplace. Source direct from verified
              manufacturers across Asia — selling into the US, Canada, UK &amp; Europe.
            </p>
            <div className="mt-5 space-y-1.5 text-sm text-ink/60">
              <p>
                ✉️{" "}
                <a href="mailto:support@roopraise.com" className="hover:text-brand-600">
                  support@roopraise.com
                </a>
              </p>
              <p className="text-ink/40">💬 WhatsApp &amp; phone — add your business numbers here</p>
            </div>
            <div className="mt-4 flex gap-3 text-ink/50">
              <span aria-hidden className="text-xl">📷</span>
              <span aria-hidden className="text-xl">🐦</span>
              <span aria-hidden className="text-xl">📌</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Marketplace</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink/60">
              <li><Link href="/search" className="hover:text-brand-600">All products</Link></li>
              <li><Link href="/sellers" className="hover:text-brand-600">Suppliers</Link></li>
              <li><Link href="/buyer-requests" className="hover:text-brand-600">Buyer requests</Link></li>
              {categories.slice(0, 3).map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="hover:text-brand-600">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">For suppliers</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink/60">
              <li><Link href="/sell" className="hover:text-brand-600">Open a store</Link></li>
              <li><Link href="/for-makers" className="hover:text-brand-600">Why sell on Roopraise</Link></li>
              <li><Link href="/dashboard" className="hover:text-brand-600">Supplier dashboard</Link></li>
              <li><Link href="/pricing" className="hover:text-brand-600">Pricing &amp; fees</Link></li>
              <li><Link href="/how-to-pay" className="hover:text-brand-600">How to pay</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Policies</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink/60">
              <li><Link href="/terms" className="hover:text-brand-600">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-600">Privacy Policy</Link></li>
              <li><Link href="/account-deletion" className="hover:text-brand-600">Account Deletion</Link></li>
              <li><Link href="/listing-policy" className="hover:text-brand-600">Listing Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink/10 pt-6 text-xs text-ink/50 sm:flex-row">
          <p>© {2026} Roopraise, Inc. Cross-border wholesale &amp; retail.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-brand-600">Terms</Link>
            <Link href="/privacy" className="hover:text-brand-600">Privacy</Link>
            <Link href="/sell" className="hover:text-brand-600">Free supplier signup</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
