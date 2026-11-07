"use client";

import { CURRENCIES, useCurrency } from "@/lib/currency";

export default function CurrencySwitcher({ className = "" }: { className?: string }) {
  const { code, setCode } = useCurrency();

  return (
    <label className={`relative inline-flex items-center ${className}`}>
      <span className="sr-only">Currency</span>
      <select
        value={code}
        onChange={(e) => setCode(e.target.value)}
        aria-label="Change currency"
        className="cursor-pointer appearance-none rounded-full border border-ink/15 bg-white py-1.5 pl-3 pr-8 text-sm font-medium text-ink/80 outline-none transition hover:border-brand-300 focus:border-brand-400"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.code}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 text-xs text-ink/40">▾</span>
    </label>
  );
}
