import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export type NavItem = { label: string; icon: string; href: string; active?: boolean };

export default function DashboardShell({
  role,
  title,
  subtitle,
  nav,
  headerRight,
  children,
}: {
  role: string;
  title: string;
  subtitle?: string;
  nav: NavItem[];
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream lg:grid lg:grid-cols-[248px_1fr]">
      {/* sidebar */}
      <aside className="hidden border-r border-ink/10 bg-white lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2.5 border-b border-ink/10 px-5">
          <LogoMark size={30} />
          <span className="font-display text-lg font-bold text-ink">
            Roo<span className="text-brand-500">praise</span>
          </span>
        </div>
        <div className="px-5 py-4">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            {role}
          </span>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                n.active
                  ? "bg-brand-500 text-white shadow-sm"
                  : "text-ink/70 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              <span className="text-base">{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-ink/10 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink/60 transition hover:bg-brand-50 hover:text-brand-700"
          >
            <span className="text-base">↩</span> Back to store
          </Link>
        </div>
      </aside>

      {/* main */}
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-20 flex flex-col gap-3 border-b border-ink/10 bg-cream/90 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
            {subtitle && <p className="text-sm text-ink/60">{subtitle}</p>}
          </div>
          {headerRight}
        </header>

        {/* mobile nav */}
        <nav className="no-scrollbar flex gap-2 overflow-x-auto border-b border-ink/10 bg-white px-5 py-2 lg:hidden">
          {nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ${
                n.active ? "bg-brand-500 text-white" : "bg-cream text-ink/70"
              }`}
            >
              <span>{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1 space-y-6 p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
