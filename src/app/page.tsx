import Link from "next/link";
import Image from "next/image";
import { categories, products, shops } from "@/lib/data";
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
              🌿 Supporting 40,000+ independent makers
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-6xl">
              Find something{" "}
              <span className="text-brand-500">made just for you</span>.
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink/70">
              Discover handmade, vintage, and one-of-a-kind goods from small shops
              around the world — the antidote to mass production.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="rounded-full bg-brand-500 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-600"
              >
                Start shopping
              </Link>
              <Link
                href="/sell"
                className="rounded-full border border-ink/20 bg-white px-7 py-3.5 text-base font-semibold text-ink transition hover:border-ink/40"
              >
                Open your shop
              </Link>
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

      {/* CATEGORIES */}
      <section className="container-x py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Shop by category</h2>
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
        <div className="container-x grid gap-6 py-10 sm:grid-cols-3">
          {[
            { icon: "🤲", title: "Made by real people", body: "Every item comes from an independent maker or small studio." },
            { icon: "🔒", title: "Shop with confidence", body: "Secure checkout and a purchase guarantee on every order." },
            { icon: "🌎", title: "Better for the planet", body: "Small-batch and vintage goods mean less waste, more meaning." },
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
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Popular right now</h2>
            <p className="mt-1 text-ink/60">The pieces shoppers can't stop favoriting.</p>
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

      {/* EDITORS BANNER */}
      <section className="container-x">
        <div className="grid overflow-hidden rounded-2xl bg-ink text-white md:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 p-10 md:p-14">
            <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-sm">Editors' picks</span>
            <h2 className="font-display text-3xl font-bold leading-tight">
              Handpicked finds for slow, intentional living
            </h2>
            <p className="text-white/70">
              Our team scours thousands of shops each week to surface the pieces
              worth making room for.
            </p>
            <Link
              href="/category/home-living"
              className="w-fit rounded-full bg-brand-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-400"
            >
              Explore the edit
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
                <span className="absolute bottom-3 left-3 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-medium backdrop-blur">
                  {p.title.split(" ").slice(0, 3).join(" ")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP SPOTLIGHT */}
      <section className="container-x py-14">
        <h2 className="mb-6 font-display text-2xl font-bold text-ink sm:text-3xl">
          Shops we're loving
        </h2>
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
                <h3 className="truncate font-semibold text-ink">{s.name}</h3>
                <p className="truncate text-sm text-ink/60">{s.tagline}</p>
                <p className="mt-0.5 text-xs text-ink/50">
                  ⭐ {s.rating} · {s.sales.toLocaleString()} sales · {s.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SELLER CTA */}
      <section className="container-x pb-14">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-14 text-center text-white">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Turn your craft into a shop</h2>
          <p className="max-w-xl text-white/85">
            Makers across Pakistan, India, Bangladesh, the Middle East &amp; Asia — reach millions of
            buyers in the USA. No listing fees, no subscription. You only pay when you sell.
          </p>
          <Link
            href="/sell"
            className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
          >
            Open your Roopraise shop
          </Link>
        </div>
      </section>
    </div>
  );
}
