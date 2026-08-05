import type { Metadata } from "next";
import { shops, products } from "@/lib/data";
import {
  platformStats,
  shopStats,
  productStats,
  monthlySeries,
  categoryBreakdown,
  recentOrders,
} from "@/lib/analytics";
import { money } from "@/lib/format";
import DashboardShell, { type NavItem } from "@/components/dashboard/DashboardShell";
import StatCard from "@/components/dashboard/StatCard";
import { AreaChart, Donut } from "@/components/dashboard/Charts";

export const metadata: Metadata = { title: "Owner console" };

const nav: NavItem[] = [
  { label: "Overview", icon: "▣", href: "/admin", active: true },
  { label: "Shops", icon: "🛍️", href: "/admin#shops" },
  { label: "Catalog", icon: "🏷️", href: "/admin#catalog" },
  { label: "Orders", icon: "📦", href: "/admin#orders" },
  { label: "Payouts", icon: "💳", href: "/admin" },
  { label: "Settings", icon: "⚙", href: "/admin" },
];

const statusStyles: Record<string, string> = {
  Paid: "bg-sky-100 text-sky-700",
  Shipped: "bg-violet-100 text-violet-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Processing: "bg-amber-100 text-amber-700",
};

function moneyK(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
  return money(n);
}

export default function AdminDashboard() {
  const p = platformStats();
  const gmvSeries = monthlySeries(Math.round(p.gmv / 14), 0.05, 5);
  const breakdown = categoryBreakdown().map((c) => ({ name: c.name, value: c.revenue }));
  const orders = recentOrders(undefined, 8);

  const rankedShops = shops
    .map((s) => ({ shop: s, stats: shopStats(s.slug) }))
    .sort((a, b) => b.stats.revenue - a.stats.revenue);

  const topProducts = [...products]
    .map((pr) => ({ pr, st: productStats(pr) }))
    .sort((a, b) => b.st.revenue - a.st.revenue)
    .slice(0, 5);

  const shopName = (slug: string) => shops.find((s) => s.slug === slug)?.name ?? slug;

  return (
    <DashboardShell
      role="Owner"
      title="Roopraise console"
      subtitle="Marketplace performance across all shops"
      nav={nav}
      headerRight={
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-ink/70">
            Last 12 months
          </span>
          <button className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">
            Export report
          </button>
        </div>
      }
    >
      {/* KPIs */}
      <section id="overview" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="GMV (gross sales)" value={moneyK(p.gmv)} delta={14.9} hint="Total marketplace volume" icon="🛒" />
        <StatCard label="Platform revenue" value={moneyK(p.revenue)} delta={16.2} hint={`${(p.feeRate * 100).toFixed(0)}% blended commission`} icon="💰" />
        <StatCard label="Orders" value={p.orders.toLocaleString()} delta={9.4} icon="📦" />
        <StatCard label="Active shops" value={p.shops.toLocaleString()} delta={4.0} icon="🛍️" />
        <StatCard label="Live listings" value={p.listings.toLocaleString()} delta={6.7} icon="🏷️" />
        <StatCard label="Buyers" value={p.buyers.toLocaleString()} delta={11.1} icon="👥" />
        <StatCard label="Avg order value" value={money(p.gmv / p.orders)} delta={2.3} icon="🧾" />
        <StatCard label="Conversion" value={`${(p.conversion * 100).toFixed(1)}%`} delta={0.8} icon="🎯" />
      </section>

      {/* charts */}
      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-card">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold text-ink">Gross merchandise value</h2>
            <span className="text-sm text-ink/50">monthly · last 12 months</span>
          </div>
          <AreaChart data={gmvSeries} height={220} />
        </div>
        <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-card">
          <h2 className="mb-3 font-semibold text-ink">Sales by category</h2>
          <Donut data={breakdown} />
        </div>
      </section>

      {/* shops leaderboard */}
      <section id="shops" className="space-y-3">
        <h2 className="font-display text-xl font-bold text-ink">Top shops</h2>
        <div className="overflow-x-auto rounded-xl2 border border-ink/10 bg-white shadow-card">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/50">
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Shop</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 text-right font-semibold">Listings</th>
                <th className="px-4 py-3 text-right font-semibold">Orders</th>
                <th className="px-4 py-3 text-right font-semibold">GMV</th>
                <th className="px-4 py-3 text-right font-semibold">Fees earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {rankedShops.map(({ shop, stats }, i) => (
                <tr key={shop.slug} className="hover:bg-cream/60">
                  <td className="px-4 py-3 font-semibold text-ink/40">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 font-bold text-brand-700">
                        {shop.name.charAt(0)}
                      </span>
                      <div>
                        <p className="font-medium text-ink">{shop.name}</p>
                        <p className="text-xs text-ink/50">⭐ {shop.rating}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink/60">{shop.location}</td>
                  <td className="px-4 py-3 text-right text-ink/70">{stats.listings}</td>
                  <td className="px-4 py-3 text-right text-ink/70">{stats.orders.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-medium text-ink">{money(stats.revenue)}</td>
                  <td className="px-4 py-3 text-right font-medium text-emerald-700">{money(stats.revenue * p.feeRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* bottom split: top products + recent orders */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div id="catalog" className="space-y-3">
          <h2 className="font-display text-xl font-bold text-ink">Top products</h2>
          <div className="rounded-xl2 border border-ink/10 bg-white shadow-card">
            <ul className="divide-y divide-ink/5">
              {topProducts.map(({ pr, st }, i) => (
                <li key={pr.id} className="flex items-center gap-3 px-4 py-3">
                  <span className="w-4 text-sm font-semibold text-ink/40">{i + 1}</span>
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-lg"
                    style={{ background: `linear-gradient(135deg, ${pr.gradient[0]}, ${pr.gradient[1]})` }}
                  >
                    {pr.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{pr.title}</p>
                    <p className="text-xs text-ink/50">{shopName(pr.shop)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-ink">{money(st.revenue)}</p>
                    <p className="text-xs text-ink/50">{st.units.toLocaleString()} sold</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="orders" className="space-y-3">
          <h2 className="font-display text-xl font-bold text-ink">Recent orders</h2>
          <div className="overflow-x-auto rounded-xl2 border border-ink/10 bg-white shadow-card">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/50">
                  <th className="px-4 py-3 font-semibold">Order</th>
                  <th className="px-4 py-3 font-semibold">Shop</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-cream/60">
                    <td className="px-4 py-3 font-medium text-ink">{o.id}</td>
                    <td className="max-w-[140px] truncate px-4 py-3 text-ink/70">{shopName(o.shop)}</td>
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
        </div>
      </section>
    </DashboardShell>
  );
}
