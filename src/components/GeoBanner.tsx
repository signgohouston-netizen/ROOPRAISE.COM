"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Greeting = { hi: string; flag: string; name: string };

const GREETINGS: Record<string, Greeting> = {
  PK: { hi: "Assalam-o-Alaikum", flag: "🇵🇰", name: "Pakistan" },
  IN: { hi: "Namaste", flag: "🇮🇳", name: "India" },
  BD: { hi: "Assalamu Alaikum", flag: "🇧🇩", name: "Bangladesh" },
  LK: { hi: "Ayubowan", flag: "🇱🇰", name: "Sri Lanka" },
  NP: { hi: "Namaste", flag: "🇳🇵", name: "Nepal" },
  AE: { hi: "Marhaba", flag: "🇦🇪", name: "the UAE" },
  SA: { hi: "Ahlan wa sahlan", flag: "🇸🇦", name: "Saudi Arabia" },
  QA: { hi: "Ahlan", flag: "🇶🇦", name: "Qatar" },
  KW: { hi: "Ahlan", flag: "🇰🇼", name: "Kuwait" },
  OM: { hi: "Ahlan", flag: "🇴🇲", name: "Oman" },
  BH: { hi: "Ahlan", flag: "🇧🇭", name: "Bahrain" },
  JO: { hi: "Marhaba", flag: "🇯🇴", name: "Jordan" },
  EG: { hi: "Ahlan", flag: "🇪🇬", name: "Egypt" },
  VN: { hi: "Xin chào", flag: "🇻🇳", name: "Vietnam" },
  ID: { hi: "Halo", flag: "🇮🇩", name: "Indonesia" },
  PH: { hi: "Kumusta", flag: "🇵🇭", name: "the Philippines" },
  TH: { hi: "Sawasdee", flag: "🇹🇭", name: "Thailand" },
  MY: { hi: "Selamat datang", flag: "🇲🇾", name: "Malaysia" },
};

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="))
    ?.split("=")[1];
}

export default function GeoBanner() {
  const [greeting, setGreeting] = useState<Greeting | null>(null);

  useEffect(() => {
    if (readCookie("rp_banner_dismissed") === "1") return;

    // 1) URL override (?region=PK) — works even on static hosting without middleware.
    const urlRegion = new URLSearchParams(window.location.search).get("region")?.toUpperCase();
    // 2) Cookie set by middleware (on Vercel).
    const cookieTarget = readCookie("rp_target") === "1";
    const cookieCountry = (readCookie("rp_country") || "").toUpperCase();

    const country = urlRegion || (cookieTarget ? cookieCountry : "");
    if (!country) return;
    if (!GREETINGS[country] && !urlRegion) return;

    setGreeting(GREETINGS[country] ?? { hi: "Welcome", flag: "🌏", name: "your country" });
  }, []);

  function dismiss() {
    document.cookie = "rp_banner_dismissed=1; path=/; max-age=" + 60 * 60 * 24 * 30;
    setGreeting(null);
  }

  if (!greeting) return null;

  return (
    <div className="relative bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 text-white">
      <div className="container-x flex items-center gap-3 py-2.5 pr-10 text-sm">
        <span className="text-lg">{greeting.flag}</span>
        <p className="flex-1">
          <span className="font-semibold">{greeting.hi}!</span>{" "}
          Manufacturers in {greeting.name} — open a store on Roopraise and sell{" "}
          <span className="font-semibold">wholesale or retail</span> to buyers in the US, Canada, UK &amp; Europe.{" "}
          <Link href="/for-makers" className="underline underline-offset-2 hover:text-brand-100">
            See how it works →
          </Link>
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
