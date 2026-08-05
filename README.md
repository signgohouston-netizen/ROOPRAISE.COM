# Roopraise

A handmade & vintage marketplace (in the spirit of Etsy / IndieMe), built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm start
```

## Features

- **Homepage** — hero, category tiles, "popular right now" grid, editors' picks banner, shop spotlight, and a seller CTA.
- **Category pages** (`/category/[slug]`) — browse products within a category.
- **Product detail** (`/product/[slug]`) — gallery, buy box, quantity + add-to-cart, reviews, related items, dynamic SEO metadata.
- **Shop pages** (`/shop/[slug]`) — seller banner, stats, and their listings.
- **Search** (`/search?q=`) — full-text search across products.
- **Cart** (`/cart`) — quantity edits, subtotal/shipping/total, demo checkout. Persisted to `localStorage`.
- **Favorites** (`/favorites`) — heart items to save them, persisted to `localStorage`.
- **Sell landing** (`/sell`) — onboarding steps, stats, FAQ.
- **Seller dashboard** (`/dashboard`) — a vendor's control center: revenue/orders/views KPIs,
  a 14-day revenue chart, payout card, and an **editable listings table** (inline price & stock
  editing, active/draft toggle, low/out-of-stock flags) that auto-saves to `localStorage`.
- **Owner console** (`/admin`) — platform-wide analytics: GMV, fee revenue, orders, buyers,
  a 12-month GMV chart, a sales-by-category donut, a top-shops leaderboard (with fees earned),
  top products, and recent orders across all shops.
- Responsive, accessible, light-mode design with a warm terracotta brand palette.
- Custom SVG **logo** (`src/components/Logo.tsx`) + favicon; self-contained SVG charts (no chart library).

## Project structure

```
src/
  app/            # routes (App Router)
  components/     # Header, Footer, ProductCard, cart/search widgets, etc.
  lib/
    data.ts       # mock catalog: products, categories, shops
    cart.tsx      # cart context (React reducer + localStorage)
    format.ts     # currency helper
```

## Notes

Product imagery uses a self-contained illustrated placeholder system (deterministic
gradients + a category glyph) so nothing depends on external image hosts. Swap
`ProductArt` for `next/image` when you wire up real photography — `next.config.mjs`
already allow-lists Unsplash hostnames.

This is a front-end demo: the catalog is in-memory and checkout is simulated (no
real payments). Wiring a database, auth, and a payment provider (e.g. Stripe) are
the natural next steps.
