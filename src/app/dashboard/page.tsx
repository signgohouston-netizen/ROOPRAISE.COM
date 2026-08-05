import Link from "next/link";
import type { Metadata } from "next";
import { getShop, productsByShop } from "@/lib/data";
import {
  CURRENT_SELLER,
  shopStats,
  productStats,
  initialStock,
  initialStatus,
  sku,
  dailySeries,
  recentOrders,
} from "@/lib/analytics";
import { money } from "@/lib/format";
import DashboardShell, { type NavItem } from "@/components/dashboard/DashboardShell";
import StatCard from "@/components/dashboard/StatCard";
import { AreaChart } from "@/components/dashboard/Charts";
import ListingsManager, { type Listing } from "@/components/dashboard/ListingsManager";

export const metadata: Metadata = { title: "Seller dashboard" };

const nav: NavItem[] = [
  { label: "Overview", icon: "▣", href: "/dashboard", active: true },
  { label: "Listings", icon: "🏷️", href: "/dashboard#listings" },
  { label: "Orders", icon: "📦", href: "/dashboard#orders" },
  { label: "Analytics", icon: "📈", href: "/dashboard#overview" },
  { label: "Payments", icon: "💳", href: "/dashboard" },
  { label: "Settings", icon: "⚙", href: "/dashboard" },
];

const statusStyles: Record<string, string> = {
  Paid: "bg-sky-100 text-sky-700",
  Shipped: "bg-violet-100 text-violet-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Processing: "bg-amber-100 text-amber-700",
};

export default function VendorDashboard() {
  const shop = getShop(CURRENT_SELLER)!;
  const stats = shopStats(CURRENT_SELLER);
  const items = productsByShop(CURRENT_SELLER);
  const revenue = dailySeries(Math.round(stats.revenue / 220), 3, 14);
  const orders = recentOrders(CURRENT_SELLER, 6);

  const listings: Listing[] = items.map((p) => ({
    id: p.id,
    title: p.title,
    sku: sku(p),
    category: p.category,
    image: p.image,
    emoji: p.emoji,
    gradient: p.gradient,
    price: p.price,
    stock: initialStock[p.id] ?? 20,
    status: initialStatus[p.id] ?? "active",
    units: productStats(p).units,
  }));

  return (
    <DashboardShell
      role="Seller"
      title={shop.name}
      subtitle={`${shop.location} · ⭐ ${shop.rating} · member since ${shop.since}`}
      nav={nav}
      headerRight={
        <div className="flex items-center gap-2">
          <Link
            href={`/shop/${shop.slug}`}
            className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-brand-300"
          >
            View storefront
          </Link>
          <button className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">
            + Add listing
          </button>
        </div>
      }
    >
      {/* KPIs */}
      <section id="overview" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Revenue (all time)" value={money(stats.revenue)} delta={12.4} hint="After Roopraise fees" icon="💰" />
        <StatCard label="Orders" value={stats.orders.toLocaleString()} delta={8.1} icon="📦" />
        <StatCard label="Shop views" value={stats.views.toLocaleString()} delta={-3.2} icon="👀" />
        <StatCard label="Conversion" value={`${(stats.conversion * 100).toFixed(1)}%`} delta={1.6} icon="🎯" />
      </section>

      {/* revenue chart + payout */}
      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-card">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold text-ink">Revenue · last 14 days</h2>
            <span className="text-sm text-ink/50">{money(revenue.reduce((n, d) => n + d.value, 0))}</span>
          </div>
          <AreaChart data={revenue} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-card">
            <p className="text-sm text-ink/60">Available for payout</p>
            <p className="mt-1 text-2xl font-bold text-ink">{money(stats.revenue * 0.18)}</p>
            <button className="mt-3 w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600">
              Request payout
            </button>
          </div>
          <div className="rounded-xl2 border border-ink/10 bg-brand-50 p-5">
            <p className="text-sm font-semibold text-brand-800">Inventory health</p>
            <p className="mt-1 text-sm text-brand-800/80">
              {stats.stockUnits.toLocaleString()} units in stock across {stats.listings} listings.
              Restock low items to avoid missed sales.
            </p>
          </div>
        </div>
      </section>

      {/* listings manager */}
      <section id="listings" className="space-y-3">
        <h2 className="font-display text-xl font-bold text-ink">Manage listings</h2>
        <ListingsManager initial={listings} />
      </section>

      {/* recent orders */}
      <section id="orders" className="space-y-3">
        <h2 className="font-display text-xl font-bold text-ink">Recent orders</h2>
        <div className="overflow-x-auto rounded-xl2 border border-ink/10 bg-white shadow-card">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/50">
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold">Buyer</th>
                <th className="px-4 py-3 font-semibold">Item</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-cream/60">
                  <td className="px-4 py-3 font-medium text-ink">{o.id}</td>
                  <td className="px-4 py-3 text-ink/70">{o.buyer}</td>
                  <td className="max-w-[220px] truncate px-4 py-3 text-ink/70">{o.item}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyles[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-ink">{money(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardShell>
  );
}
