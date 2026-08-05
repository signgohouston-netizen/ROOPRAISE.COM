import { products, shops, categories, type Product } from "./data";
import { BLENDED_COMMISSION } from "./pricing";

// --- deterministic pseudo-data helpers (no Math.random, stable across renders) ---
function seed(id: string) {
  let s = 0;
  for (const c of id) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  return s;
}

// Starting inventory per product id. A few intentionally low / out of stock.
export const initialStock: Record<string, number> = {
  p1: 42, p2: 9, p3: 120, p4: 3, p5: 27, p6: 15,
  p7: 60, p8: 0, p9: 34, p10: 5, p11: 1, p12: 48,
};

export const initialStatus: Record<string, "active" | "draft"> = {
  p11: "draft",
};

export function sku(p: Product) {
  const s = seed(p.id);
  const cat = p.category.slice(0, 3).toUpperCase();
  return `${cat}-${(1000 + (s % 9000)).toString()}`;
}

export type ProductStats = {
  units: number;
  revenue: number;
  views: number;
  conversion: number; // 0..1
};

export function productStats(p: Product): ProductStats {
  const s = seed(p.id);
  const units = 40 + p.reviews * 2 + (s % 160);
  const revenue = units * p.price;
  const views = units * (9 + (s % 7));
  return { units, revenue, views, conversion: units / views };
}

export function shopStats(slug: string) {
  const list = products.filter((p) => p.shop === slug);
  const agg = list.reduce(
    (a, p) => {
      const st = productStats(p);
      a.units += st.units;
      a.revenue += st.revenue;
      a.views += st.views;
      return a;
    },
    { units: 0, revenue: 0, views: 0 }
  );
  const stockUnits = list.reduce((n, p) => n + (initialStock[p.id] ?? 20), 0);
  return {
    ...agg,
    listings: list.length,
    conversion: agg.views ? agg.units / agg.views : 0,
    stockUnits,
    orders: Math.round(agg.units / 1.4),
  };
}

const PLATFORM_FEE = BLENDED_COMMISSION; // blended sales commission across categories

export function platformStats() {
  const agg = products.reduce(
    (a, p) => {
      const st = productStats(p);
      a.gmv += st.revenue;
      a.units += st.units;
      a.views += st.views;
      return a;
    },
    { gmv: 0, units: 0, views: 0 }
  );
  return {
    gmv: agg.gmv,
    revenue: agg.gmv * PLATFORM_FEE,
    orders: Math.round(agg.units / 1.5),
    units: agg.units,
    views: agg.views,
    shops: shops.length,
    listings: products.length,
    buyers: Math.round(agg.units * 0.72),
    conversion: agg.views ? agg.units / agg.views : 0,
    feeRate: PLATFORM_FEE,
  };
}

export const MONTHS = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

export function monthlySeries(base: number, growth: number, seedN: number) {
  return MONTHS.map((month, i) => {
    const seasonal = 1 + 0.18 * Math.sin((i / 12) * Math.PI * 2 + 1);
    const noise = 0.9 + ((seedN + i * 7) % 21) / 100;
    return { label: month, value: Math.round(base * (1 + growth * i) * seasonal * noise) };
  });
}

export function dailySeries(base: number, seedN: number, days = 14) {
  return Array.from({ length: days }).map((_, i) => {
    const wave = 1 + 0.25 * Math.sin((i / days) * Math.PI * 2 + seedN);
    const noise = 0.85 + ((seedN + i * 13) % 30) / 100;
    return { label: `${i + 1}`, value: Math.round(base * wave * noise) };
  });
}

export function categoryBreakdown() {
  return categories
    .map((c) => {
      const list = products.filter((p) => p.category === c.slug);
      const revenue = list.reduce((n, p) => n + productStats(p).revenue, 0);
      return { name: c.name, slug: c.slug, emoji: c.emoji, revenue };
    })
    .sort((a, b) => b.revenue - a.revenue);
}

export type Order = {
  id: string;
  buyer: string;
  item: string;
  shop: string;
  total: number;
  status: "Paid" | "Shipped" | "Delivered" | "Processing";
  daysAgo: number;
};

const BUYERS = ["Marla P.", "Devon R.", "Priya S.", "Jonas K.", "Lena M.", "Theo A.", "Ruth B.", "Cai N.", "Iris W.", "Sam D."];
const STATUSES: Order["status"][] = ["Paid", "Shipped", "Delivered", "Processing"];

export function recentOrders(scopeShop?: string, limit = 8): Order[] {
  const pool = scopeShop ? products.filter((p) => p.shop === scopeShop) : products;
  return Array.from({ length: limit }).map((_, i) => {
    const p = pool[(i * 3 + 1) % pool.length];
    const s = seed(p.id + i);
    const qty = 1 + (s % 3);
    return {
      id: `RP-${8400 + i * 7 + (s % 90)}`,
      buyer: BUYERS[s % BUYERS.length],
      item: p.title,
      shop: p.shop,
      total: qty * p.price,
      status: STATUSES[s % STATUSES.length],
      daysAgo: (s % 9),
    };
  });
}

// The shop currently "signed in" to the vendor dashboard.
export const CURRENT_SELLER = "wildthread-studio";
