// Roopraise vendor pricing model — eBay-style: no listing fee, no subscription,
// a sales commission only, charged as a percentage of each order's value.

export const fees = {
  listing: 0, // per listing
  subscription: 0, // per month
  perOrder: 0.3, // fixed fee per completed order (USD)
  processing: 0.029, // secure payment processing (2.9%)
  payout: 0.015, // international payout / FX fee (1.5%)
};

// Headline chart: sales commission by category (% of item + shipping).
export type CategoryRate = { slug: string; name: string; emoji: string; rate: number };

export const categoryRates: CategoryRate[] = [
  { slug: "clothing", name: "Clothing & apparel", emoji: "🧥", rate: 0.12 },
  { slug: "jewelry", name: "Jewelry & watches", emoji: "💍", rate: 0.11 },
  { slug: "bags-accessories", name: "Bags & accessories", emoji: "👜", rate: 0.11 },
  { slug: "home-living", name: "Home & living", emoji: "🏡", rate: 0.1 },
  { slug: "weddings", name: "Weddings", emoji: "💐", rate: 0.1 },
  { slug: "toys-games", name: "Toys & games", emoji: "🧸", rate: 0.1 },
  { slug: "art-collectibles", name: "Art & collectibles", emoji: "🎨", rate: 0.09 },
  { slug: "craft-supplies", name: "Craft supplies", emoji: "🧶", rate: 0.09 },
];

export const DEFAULT_RATE = 0.1; // "everything else"

// Volume loyalty tiers — the more you sell (trailing 30 days), the lower your rate.
// Applied as a discount off the category commission above.
export type Tier = {
  name: string;
  min: number;
  max: number;
  discount: number; // subtracted from category rate
  blurb: string;
};

export const tiers: Tier[] = [
  { name: "Starter", min: 0, max: 1000, discount: 0, blurb: "Where every new shop begins" },
  { name: "Rising", min: 1000, max: 5000, discount: 0.015, blurb: "Building momentum" },
  { name: "Pro", min: 5000, max: 20000, discount: 0.03, blurb: "Established sellers" },
  { name: "Elite", min: 20000, max: Infinity, discount: 0.045, blurb: "Top-volume partners" },
];

export const MIN_RATE = 0.05; // commission never drops below 5%

// Blended average commission used for platform-wide reporting.
export const BLENDED_COMMISSION = 0.1;

export type FeeBreakdown = {
  gross: number;
  rate: number;
  commission: number;
  processing: number;
  perOrder: number;
  payout: number;
  totalFees: number;
  net: number;
  takeHomePct: number;
};

export function computeFees(opts: {
  price: number;
  shipping?: number;
  categoryRate: number;
  discount?: number;
}): FeeBreakdown {
  const price = Math.max(0, opts.price || 0);
  const shipping = Math.max(0, opts.shipping || 0);
  const gross = price + shipping;
  const rate = Math.max(MIN_RATE, opts.categoryRate - (opts.discount ?? 0));

  const commission = gross * rate;
  const processing = gross * fees.processing;
  const perOrder = gross > 0 ? fees.perOrder : 0;
  const beforePayout = gross - commission - processing - perOrder;
  const payout = Math.max(0, beforePayout) * fees.payout;
  const net = beforePayout - payout;
  const totalFees = commission + processing + perOrder + payout;

  return {
    gross,
    rate,
    commission,
    processing,
    perOrder,
    payout,
    totalFees,
    net,
    takeHomePct: gross > 0 ? net / gross : 0,
  };
}

// Regions & payout rails we support for international sellers.
export const payoutRegions = [
  { flag: "🇵🇰", name: "Pakistan" },
  { flag: "🇮🇳", name: "India" },
  { flag: "🇧🇩", name: "Bangladesh" },
  { flag: "🇦🇪", name: "Middle East" },
  { flag: "🇱🇰", name: "Sri Lanka" },
  { flag: "🇻🇳", name: "Vietnam" },
  { flag: "🇮🇩", name: "Indonesia" },
  { flag: "🇵🇭", name: "Philippines" },
];

export const payoutMethods = ["Payoneer", "Wise", "Bank transfer (SWIFT)", "Local bank deposit"];
