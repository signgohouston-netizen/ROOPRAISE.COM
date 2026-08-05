// Unsplash image helper — request a sized, cropped, optimized image.
const IMG = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type Category = {
  slug: string;
  name: string;
  emoji: string;
  blurb: string;
  image: string;
};

export type Shop = {
  slug: string;
  name: string;
  location: string;
  tagline: string;
  rating: number;
  sales: number;
  since: number;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  price: number;
  compareAt?: number;
  category: string; // category slug
  shop: string; // shop slug
  rating: number;
  reviews: number;
  badge?: "Bestseller" | "New" | "Sale" | "Editors' Pick";
  gradient: [string, string];
  emoji: string;
  image: string;
  description: string;
  freeShipping?: boolean;
};

export const categories: Category[] = [
  { slug: "jewelry", name: "Jewelry", emoji: "💍", blurb: "Handcrafted rings, necklaces & more", image: IMG("1611591437281-460bfbe1220a", 500) },
  { slug: "home-living", name: "Home & Living", emoji: "🏡", blurb: "Décor, ceramics & cozy goods", image: IMG("1558618666-fcd25c85cd64", 500) },
  { slug: "art-collectibles", name: "Art & Collectibles", emoji: "🎨", blurb: "Original prints & one-of-a-kind art", image: IMG("1531913764164-f85c52e6e654", 500) },
  { slug: "clothing", name: "Clothing", emoji: "🧥", blurb: "Handmade & vintage apparel", image: IMG("1523381210434-271e8be1f52b", 500) },
  { slug: "bags-accessories", name: "Bags & Accessories", emoji: "👜", blurb: "Totes, wallets & leather goods", image: IMG("1594223274512-ad4803739b7c", 500) },
  { slug: "weddings", name: "Weddings", emoji: "💐", blurb: "Invites, favors & keepsakes", image: IMG("1607344645866-009c320b63e0", 500) },
  { slug: "toys-games", name: "Toys & Games", emoji: "🧸", blurb: "Wooden toys & puzzles", image: IMG("1558060370-d644479cb6f7", 500) },
  { slug: "craft-supplies", name: "Craft Supplies", emoji: "🧶", blurb: "Yarn, beads & tools", image: IMG("1584992236310-6edddc08acff", 500) },
];

export const shops: Shop[] = [
  { slug: "wildthread-studio", name: "Wildthread Studio", location: "Portland, OR", tagline: "Naturally dyed textiles", rating: 4.9, sales: 12840, since: 2016 },
  { slug: "kiln-and-clay", name: "Kiln & Clay", location: "Asheville, NC", tagline: "Small-batch stoneware", rating: 4.8, sales: 8210, since: 2018 },
  { slug: "amber-forge", name: "Amber Forge", location: "Austin, TX", tagline: "Hand-forged jewelry", rating: 5.0, sales: 5432, since: 2019 },
  { slug: "paperbloom-co", name: "Paperbloom Co.", location: "Brooklyn, NY", tagline: "Botanical stationery", rating: 4.9, sales: 21050, since: 2014 },
  { slug: "north-maple", name: "North Maple", location: "Burlington, VT", tagline: "Heirloom wood toys", rating: 4.7, sales: 3390, since: 2020 },
  { slug: "saga-leather", name: "Saga Leather", location: "Denver, CO", tagline: "Full-grain leather goods", rating: 4.8, sales: 9975, since: 2017 },
];

const G = {
  rose: ["#f6d4c4", "#e88a6a"] as [string, string],
  sage: ["#d7e3cf", "#8fae7d"] as [string, string],
  sky: ["#cfe0ec", "#7fa8c9"] as [string, string],
  sand: ["#efe0c8", "#cdae7e"] as [string, string],
  plum: ["#e2d2e6", "#a67fb0"] as [string, string],
  clay: ["#f4dccd", "#dd8f6b"] as [string, string],
  mint: ["#d0e8df", "#7cc0a8"] as [string, string],
  ink: ["#d5d3e0", "#8783a6"] as [string, string],
};

export const products: Product[] = [
  {
    id: "p1", slug: "hammered-brass-hoop-earrings", title: "Hammered Brass Hoop Earrings",
    price: 38, compareAt: 48, category: "jewelry", shop: "amber-forge", rating: 4.9, reviews: 428,
    badge: "Bestseller", gradient: G.sand, emoji: "💫", freeShipping: true,
    image: IMG("1535632066927-ab7c9ab60908"),
    description: "Lightweight hoops hand-hammered from raw brass for a soft, organic shimmer. Each pair is finished with a protective wax and hangs on hypoallergenic ear wires.",
  },
  {
    id: "p2", slug: "speckled-stoneware-mug", title: "Speckled Stoneware Mug — 12oz",
    price: 32, category: "home-living", shop: "kiln-and-clay", rating: 4.8, reviews: 1204,
    badge: "Editors' Pick", gradient: G.sage, emoji: "☕", freeShipping: true,
    image: IMG("1578749556568-bc2c40e68b61"),
    description: "Wheel-thrown from a speckled clay body and dipped in a matte oatmeal glaze. Microwave and dishwasher safe, and it feels wonderful in the hand.",
  },
  {
    id: "p3", slug: "botanical-riso-print-set", title: "Botanical Riso Print Set of 3",
    price: 45, category: "art-collectibles", shop: "paperbloom-co", rating: 4.9, reviews: 356,
    badge: "New", gradient: G.mint, emoji: "🌿",
    image: IMG("1579762715118-a6f1d4b934f1"),
    description: "A trio of risograph prints celebrating heirloom plants, printed with soy-based inks on recycled cotton paper. Frames not included.",
  },
  {
    id: "p4", slug: "indigo-dyed-linen-scarf", title: "Indigo Shibori Linen Scarf",
    price: 64, compareAt: 78, category: "clothing", shop: "wildthread-studio", rating: 4.9, reviews: 512,
    badge: "Sale", gradient: G.sky, emoji: "🌊", freeShipping: true,
    image: IMG("1520903920243-00d872a2d1c9"),
    description: "European linen hand-folded and dipped in a natural indigo vat, so no two are identical. Softens beautifully with every wash.",
  },
  {
    id: "p5", slug: "full-grain-card-wallet", title: "Full-Grain Leather Card Wallet",
    price: 52, category: "bags-accessories", shop: "saga-leather", rating: 4.8, reviews: 889,
    badge: "Bestseller", gradient: G.clay, emoji: "👛",
    image: IMG("1627123424574-724758594e93"),
    description: "Cut from a single piece of vegetable-tanned leather and saddle-stitched by hand. Holds 6+ cards and develops a rich patina over time.",
  },
  {
    id: "p6", slug: "maple-stacking-rainbow", title: "Heirloom Maple Stacking Rainbow",
    price: 58, category: "toys-games", shop: "north-maple", rating: 4.7, reviews: 240,
    gradient: G.rose, emoji: "🌈", freeShipping: true,
    image: IMG("1558060370-d644479cb6f7"),
    description: "Turned from sustainably harvested maple and finished with food-safe oil. An open-ended toy built to be passed down.",
  },
  {
    id: "p7", slug: "pressed-flower-invitation-suite", title: "Pressed Flower Wedding Invitation Suite",
    price: 96, category: "weddings", shop: "paperbloom-co", rating: 5.0, reviews: 178,
    badge: "Editors' Pick", gradient: G.plum, emoji: "💐",
    image: IMG("1607344645866-009c320b63e0"),
    description: "A fully customizable invitation suite with real pressed blooms, letterpressed on 100% cotton stock. Includes invite, RSVP, and details card.",
  },
  {
    id: "p8", slug: "merino-hand-dyed-yarn", title: "Hand-Dyed Merino Yarn — Fingering",
    price: 28, category: "craft-supplies", shop: "wildthread-studio", rating: 4.9, reviews: 963,
    badge: "New", gradient: G.ink, emoji: "🧶", freeShipping: true,
    image: IMG("1584992236310-6edddc08acff"),
    description: "100g of superwash merino, kettle-dyed in small batches for gentle tonal variation. 420 yards — enough for a generous shawl.",
  },
  {
    id: "p9", slug: "raw-crystal-stacking-ring", title: "Raw Crystal Stacking Ring",
    price: 42, category: "jewelry", shop: "amber-forge", rating: 4.8, reviews: 305,
    gradient: G.plum, emoji: "💎",
    image: IMG("1602173574767-37ac01994b2a"),
    description: "A rough-cut quartz point set on a delicate sterling band. Sold individually so you can build your own stack.",
  },
  {
    id: "p10", slug: "matte-black-bud-vase", title: "Matte Black Bud Vase",
    price: 26, category: "home-living", shop: "kiln-and-clay", rating: 4.7, reviews: 421,
    gradient: G.ink, emoji: "🖤", freeShipping: true,
    image: IMG("1610701596007-11502861dcfa"),
    description: "A little sculptural vase for a single stem, glazed in a velvety matte black. Each one is thrown and trimmed by hand.",
  },
  {
    id: "p11", slug: "abstract-landscape-original", title: "Abstract Landscape — Original Painting",
    price: 220, compareAt: 260, category: "art-collectibles", shop: "paperbloom-co", rating: 5.0, reviews: 64,
    badge: "Sale", gradient: G.sand, emoji: "🖼️",
    image: IMG("1541961017774-22349e4a1262"),
    description: "Original acrylic on 16×20 birch panel, sealed and ready to hang. A calm, sunlit horizon in warm neutrals.",
  },
  {
    id: "p12", slug: "quilted-canvas-tote", title: "Quilted Canvas Everyday Tote",
    price: 74, category: "bags-accessories", shop: "saga-leather", rating: 4.8, reviews: 611,
    badge: "Bestseller", gradient: G.mint, emoji: "👜", freeShipping: true,
    image: IMG("1548036328-c9fa89d128fa"),
    description: "Heavyweight quilted cotton canvas with a leather base and interior pocket. Roomy enough for a laptop and a farmers-market haul.",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
export function getShop(slug: string) {
  return shops.find((s) => s.slug === slug);
}
export function productsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}
export function productsByShop(slug: string) {
  return products.filter((p) => p.shop === slug);
}
export function relatedProducts(p: Product, n = 4) {
  return products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, n);
}
export function searchProducts(q: string) {
  const t = q.trim().toLowerCase();
  if (!t) return products;
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(t) ||
      p.description.toLowerCase().includes(t) ||
      p.category.replace("-", " ").includes(t)
  );
}
