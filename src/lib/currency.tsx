"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Roopraise prices are set in USD (the base currency). The converter below
// applies indicative exchange rates so buyers can view prices in their own
// currency. Rates are approximate and for display only — swap this table for a
// live FX feed when you're ready.
export type Currency = {
  code: string;
  label: string;
  flag: string;
  rate: number; // units of this currency per 1 USD
};

export const CURRENCIES: Currency[] = [
  { code: "USD", label: "US Dollar", flag: "🇺🇸", rate: 1 },
  { code: "EUR", label: "Euro", flag: "🇪🇺", rate: 0.92 },
  { code: "GBP", label: "British Pound", flag: "🇬🇧", rate: 0.79 },
  { code: "CAD", label: "Canadian Dollar", flag: "🇨🇦", rate: 1.37 },
  { code: "AUD", label: "Australian Dollar", flag: "🇦🇺", rate: 1.52 },
  { code: "PKR", label: "Pakistani Rupee", flag: "🇵🇰", rate: 278 },
  { code: "INR", label: "Indian Rupee", flag: "🇮🇳", rate: 83 },
  { code: "BDT", label: "Bangladeshi Taka", flag: "🇧🇩", rate: 110 },
  { code: "AED", label: "UAE Dirham", flag: "🇦🇪", rate: 3.67 },
  { code: "SAR", label: "Saudi Riyal", flag: "🇸🇦", rate: 3.75 },
  { code: "CNY", label: "Chinese Yuan", flag: "🇨🇳", rate: 7.1 },
  { code: "JPY", label: "Japanese Yen", flag: "🇯🇵", rate: 150 },
  { code: "SGD", label: "Singapore Dollar", flag: "🇸🇬", rate: 1.35 },
  { code: "MYR", label: "Malaysian Ringgit", flag: "🇲🇾", rate: 4.5 },
  { code: "TRY", label: "Turkish Lira", flag: "🇹🇷", rate: 32 },
  { code: "ZAR", label: "South African Rand", flag: "🇿🇦", rate: 18.5 },
];

const RATE_BY_CODE: Record<string, Currency> = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c])
);

const STORAGE_KEY = "roopraise-currency";

type CurrencyContextValue = {
  code: string;
  setCode: (code: string) => void;
  format: (usd: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function formatIn(usd: number, code: string): string {
  const cur = RATE_BY_CODE[code] ?? RATE_BY_CODE.USD;
  const value = (usd || 0) * cur.rate;
  const digits = value >= 100 || cur.rate >= 20 ? 0 : 2;
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: cur.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: digits,
    }).format(value);
  } catch {
    return `${cur.code} ${Math.round(value).toLocaleString()}`;
  }
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Always start at USD so server and first client render match (no hydration
  // mismatch); read the saved preference after mount.
  const [code, setCodeState] = useState("USD");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && RATE_BY_CODE[saved]) setCodeState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  function setCode(next: string) {
    setCodeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }

  const value = useMemo<CurrencyContextValue>(
    () => ({ code, setCode, format: (usd: number) => formatIn(usd, code) }),
    [code]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  // Fallback keeps components usable even outside the provider (renders USD).
  if (!ctx) {
    return {
      code: "USD",
      setCode: () => {},
      format: (usd: number) => formatIn(usd, "USD"),
    };
  }
  return ctx;
}
