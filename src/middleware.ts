import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Countries Roopraise specifically welcomes as sellers.
const TARGET = new Set([
  "PK", "IN", "BD", "LK", "NP", // South Asia
  "AE", "SA", "QA", "KW", "OM", "BH", "JO", "EG", // Middle East
  "VN", "ID", "PH", "TH", "MY", // Far East / SE Asia
]);

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Allow ?region=PK style override for previewing/demoing the experience.
  const override = url.searchParams.get("region")?.toUpperCase();
  const headerCountry = (req.headers.get("x-vercel-ip-country") || "").toUpperCase();
  const country = override || headerCountry;

  const setCookies = (res: NextResponse) => {
    if (country) {
      res.cookies.set("rp_country", country, { path: "/", maxAge: 60 * 60 * 24 * 30 });
      res.cookies.set("rp_target", TARGET.has(country) ? "1" : "0", {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    return res;
  };

  // When previewing via ?region=XX, persist it and redirect to a clean URL.
  if (override) {
    const clean = new URL(url);
    clean.searchParams.delete("region");
    return setCookies(NextResponse.redirect(clean));
  }

  return setCookies(NextResponse.next());
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg|.*\\.).*)"],
};
