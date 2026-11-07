import Link from "next/link";
import Image from "next/image";
import { categories, products, shops } from "@/lib/data";
import { money } from "@/lib/format";
import ProductCard from "@/components/ProductCard";
import ProductArt from "@/components/ProductArt";

export default function Home() {
  const bestsellers = products.filter((p) => p.badge === "Bestseller" || p.rating >= 4.9).slice(0, 8);
  const fresh = products.filter((p) => p.badge === "New" || p.badge === "Editors' Pick").slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-cream to-cream">
        <div className="container-x grid items-center gap-8 py-14 md:grid-cols-2 md:py-20">
          <div className="rise">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-brand-700 shadow-sm">
              🌏 Verified suppliers across Asia · buyers in the US, Canada, UK & Europe
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-6xl">
              Source direct from{" "}
              <span className="text-brand-500">the makers</span>.
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink/70">
              Roopraise connects verified manufacturers and brands across Asia with
              buyers worldwide — <span className="font-semibold text-ink">wholesale for
              businesses, retail for everyone</span>. One trusted marketplace, both ways to buy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="rounded-full bg-brand-500 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-600"
              >
                Buy wholesale
              </Link>
              <Link
                href="/search"
                className="rounded-full border-2 border-ink/15 bg-white px-7 py-3.5 text-base font-semibold text-ink transition hover:border-brand-300"
              >
                Shop retail
              </Link>
              <Link
                href="/sell"
                className="rounded-full border-2 border-accent-500 bg-white px-7 py-3.5 text-base font-semibold text-accent-700 transition hover:bg-accent-50"
              >
                Become a supplier
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink/60">
              <span className="flex items-center gap-1.5">✅ Verified suppliers</span>
              <span className="flex items-center gap-1.5">🔒 Secure trade payments</span>
              <span className="flex items-center gap-1.5">🚚 Door-to-door shipping</span>
            </div>
          </div>

          {/* floating art collage */}
          <div className="relative hidden h-[420px] md:block">
            {products.slice(0, 5).map((p, i) => {
              const layout = [
                "left-2 top-4 h-44 w-44 rotate-[-6deg]",
                "right-8 top-0 h-52 w-52 rotate-[5deg]",
                "left-24 bottom-2 h-48 w-48 rotate-[3deg]",
                "right-0 bottom-6 h-40 w-40 rotate-[-4deg]",
                "left-0 top-40 h-32 w-32 rotate-[8deg]",
              ][i];
              return (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className={`absolute ${layout} overflow-hidden rounded-2xl shadow-pop transition hover:z-10 hover:scale-105`}
                  style={{ animation: `rise .6s ${i * 0.08}s both` }}
                >
                  <ProductArt
                    gradient={p.gradient}
                    emoji={p.emoji}
                    image={p.image}
                    alt={p.title}
                    size="lg"
                    sizes="220px"
                    priority={i < 2}
                    className="h-full w-full"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* MARKETS STRIP */}
      <section className="border-y border-ink/10 bg-white">
        <div className="container-x flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between">
          <p className="text-sm font-semibold uppercase tracking-wide text-ink/40">
            Selling into
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-ink/70">
            <span>🇺🇸 United States</span>
            <span>🇨🇦 Canada</span>
            <span>🇬🇧 United Kingdom</span>
            <span>🇪🇺 Europe</span>
            <span className="text-ink/40">+ more</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Source by category</h2>
          <Link href="/search" className="text-sm font-medium text-brand-600 hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="group text-center">
              <div className="relative aspect-square overflow-hidden rounded-xl2 shadow-card">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg shadow-sm">
                  {c.emoji}
                </span>
              </div>
              <span className="mt-3 block font-medium text-ink group-hover:text-brand-600">
                {c.name}
              </span>
              <span className="text-xs text-ink/50">{c.blurb}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="border-y border-ink/10 bg-white">
        <div className="container-x grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "✅", title: "Verified suppliers", body: "Every manufacturer is vetted — business checked, samples reviewed, ratings earned." },
            { icon: "📦", title: "Wholesale & retail", body: "Order by the pallet with clear MOQs, or buy a single piece. Each supplier chooses." },
            { icon: "🛡️", title: "Trade protection", body: "Your payment is held securely and only released once your order ships as described." },
            { icon: "🌍", title: "Direct from Asia", body: "Cut out the middleman — buy factory-direct and ship door-to-door worldwide." },
          ].map((v) => (
            <div key={v.title} className="flex gap-4">
              <span className="text-3xl">{v.icon}</span>
              <div>
                <h3 className="font-semibold text-ink">{v.title}</h3>
                <p className="mt-1 text-sm text-ink/60">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="container-x py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Trending with buyers</h2>
            <p className="mt-1 text-ink/60">In-demand lines — available wholesale and retail.</p>
          </div>
          <Link href="/search" className="hidden text-sm font-medium text-brand-600 hover:underline sm:block">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* WHOLESALE BANNER */}
      <section className="container-x">
        <div className="grid overflow-hidden rounded-2xl bg-ink text-white md:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 p-10 md:p-14">
            <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-sm">For businesses</span>
            <h2 className="font-display text-3xl font-bold leading-tight">
              Buy wholesale, factory-direct
            </h2>
            <p className="text-white/70">
              Stock your store or brand with low minimums and trade pricing. Compare
              suppliers, request samples, and pay securely — with your money protected
              until your order ships.
            </p>
            <Link
              href="/search"
              className="w-fit rounded-full bg-brand-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-400"
            >
              Explore wholesale
            </Link>
          </div>
          <div className="grid grid-cols-2">
            {fresh.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="group relative">
                <ProductArt
                  gradient={p.gradient}
                  emoji={p.emoji}
                  image={p.image}
                  alt={p.title}
                  size="lg"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="aspect-square w-full transition group-hover:brightness-95"
                />
                {p.wholesalePrice && (
                  <span className="absolute bottom-3 left-3 z-10 rounded-full bg-black/55 px-3 py-1 text-xs font-medium backdrop-blur">
                    Wholesale {money(p.wholesalePrice)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPLIER SPOTLIGHT */}
      <section className="container-x py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Verified suppliers
            </h2>
            <p className="mt-1 text-ink/60">Our launch cohort of vetted manufacturers.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shops.slice(0, 6).map((s) => (
            <Link
              key={s.slug}
              href={`/shop/${s.slug}`}
              className="flex items-center gap-4 rounded-xl2 border border-ink/10 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-brand-200"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-100 text-2xl font-bold text-brand-700">
                {s.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <h3 className="flex items-center gap-1.5 truncate font-semibold text-ink">
                  {s.name}
                  {s.verified && (
                    <span className="shrink-0 rounded-full bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold text-brand-700" title="Verified supplier">
                      ✓ Verified
                    </span>
                  )}
                </h3>
                <p className="truncate text-sm text-ink/60">{s.tagline}</p>
                <p className="mt-0.5 text-xs text-ink/50">
                  ⭐ {s.rating} · {s.flag} {s.location} · MOQ from {money(s.minOrder ?? 0)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOR SUPPLIERS IN ASIA */}
      <section className="container-x pb-4">
        <Link
          href="/for-makers"
          className="group flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-brand-200 bg-brand-50 px-6 py-10 text-center transition hover:border-brand-300 sm:flex-row sm:text-left"
        >
          <span className="text-4xl">🏭</span>
          <div className="flex-1">
            <p className="font-display text-xl font-bold text-ink sm:text-2xl">
              Manufacturers across Asia — this one&apos;s for you
            </p>
            <p className="mt-1 text-ink/70">
              Starting with Pakistan. Open a store, sell wholesale or retail, and reach buyers
              in the US, Canada, UK &amp; Europe. Payouts to your country.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-brand-500 px-6 py-3 font-semibold text-white transition group-hover:bg-brand-600">
            See how it works →
          </span>
        </Link>
      </section>

      {/* SELLER CTA */}
      <section className="container-x pb-14">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-14 text-center text-white">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Open your store on Roopraise</h2>
          <p className="max-w-xl text-white/85">
            Manufacturers and brands across Asia — sell wholesale (B2B), retail (B2C), or both.
            Reach buyers in the US, Canada, UK &amp; Europe. No listing fees, no subscription —
            you only pay when you sell.
          </p>
          <Link
            href="/sell"
            className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
          >
            Start selling
          </Link>
        </div>
      </section>
    </div>
  );
}
