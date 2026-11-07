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
  country: string;
  flag: string;
  tagline: string;
  rating: number;
  sales: number;
  since: number;
  verified?: boolean; // passed Roopraise supplier verification
  wholesale?: boolean; // offers B2B / wholesale ordering
  retail?: boolean; // offers B2C / single-unit retail
  minOrder?: number; // minimum wholesale order value (USD)
  leadTime?: string; // production + ship lead time
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  price: number; // retail (B2C) unit price
  compareAt?: number;
  wholesalePrice?: number; // per-unit price at MOQ (B2B)
  moq?: number; // minimum order quantity for wholesale
  category: string; // category slug
  shop: string; // shop slug
  rating: number;
  reviews: number;
  badge?: "Bestseller" | "New" | "Sale" | "Editors' Pick";
  gradient: [string, string];
  emoji: string;
  image?: string;
  description: string;
  freeShipping?: boolean;
};

export const categories: Category[] = [
  { slug: "jewelry", name: "Jewelry", emoji: "💍", blurb: "Fashion jewelry, brass & beadwork", image: IMG("1611591437281-460bfbe1220a", 500) },
  { slug: "home-living", name: "Home & Living", emoji: "🏡", blurb: "Ceramics, tableware & décor", image: IMG("1558618666-fcd25c85cd64", 500) },
  { slug: "art-collectibles", name: "Art & Décor", emoji: "🎨", blurb: "Prints, canvas & wall art", image: IMG("1531913764164-f85c52e6e654", 500) },
  { slug: "clothing", name: "Apparel", emoji: "🧥", blurb: "Woven & stitched garments", image: IMG("1523381210434-271e8be1f52b", 500) },
  { slug: "bags-accessories", name: "Bags & Leather", emoji: "👜", blurb: "Leather goods, bags & wallets", image: IMG("1594223274512-ad4803739b7c", 500) },
  { slug: "weddings", name: "Weddings & Events", emoji: "💐", blurb: "Invites, favors & packaging", image: IMG("1607344645866-009c320b63e0", 500) },
  { slug: "toys-games", name: "Toys & Wood", emoji: "🧸", blurb: "Wooden toys & woodcraft", image: IMG("1558060370-d644479cb6f7", 500) },
  { slug: "craft-supplies", name: "Textiles & Supplies", emoji: "🧶", blurb: "Yarn, fabric & raw materials", image: IMG("1584992236310-6edddc08acff", 500) },
  { slug: "industrial-tools", name: "Industrial & Tools", emoji: "🛠️", blurb: "Power tools, hardware & machinery", image: IMG("1504148455328-c376907d081c", 500) },
  { slug: "sports-fitness", name: "Sports & Fitness", emoji: "⚽", blurb: "Sialkot sports goods & gear", image: IMG("1517649763962-0c623066013b", 500) },
  { slug: "furniture", name: "Furniture", emoji: "🪑", blurb: "Chiniot-style wooden & metal furniture", image: IMG("1538688525198-9b88f6f53126", 500) },
  { slug: "cutlery", name: "Cutlery & Steel", emoji: "🍴", blurb: "Stainless pots, cookware & cutlery", image: IMG("1556909212-d5b604d0c90d", 500) },
];

// Launch cohort — verified manufacturers in Pakistan. More Asian suppliers onboarding.
export const shops: Shop[] = [
  { slug: "wildthread-studio", name: "Indus Textile Mills", location: "Faisalabad", country: "Pakistan", flag: "🇵🇰", tagline: "Woven & naturally dyed home textiles", rating: 4.9, sales: 12840, since: 2016, verified: true, wholesale: true, retail: true, minOrder: 500, leadTime: "10–18 days" },
  { slug: "kiln-and-clay", name: "Multan Blue Pottery Co.", location: "Multan", country: "Pakistan", flag: "🇵🇰", tagline: "Hand-glazed ceramics & tableware", rating: 4.8, sales: 8210, since: 2018, verified: true, wholesale: true, retail: true, minOrder: 400, leadTime: "12–20 days" },
  { slug: "amber-forge", name: "Sialkot Metal & Jewelry", location: "Sialkot", country: "Pakistan", flag: "🇵🇰", tagline: "Brass, bronze & fashion jewelry", rating: 5.0, sales: 5432, since: 2019, verified: true, wholesale: true, retail: true, minOrder: 300, leadTime: "7–14 days" },
  { slug: "paperbloom-co", name: "Karachi Paper & Press", location: "Karachi", country: "Pakistan", flag: "🇵🇰", tagline: "Stationery, packaging & print", rating: 4.9, sales: 21050, since: 2014, verified: true, wholesale: true, retail: true, minOrder: 250, leadTime: "8–15 days" },
  { slug: "north-maple", name: "Chiniot Woodcraft", location: "Chiniot", country: "Pakistan", flag: "🇵🇰", tagline: "Carved wood toys & furniture", rating: 4.7, sales: 3390, since: 2020, verified: true, wholesale: true, retail: true, minOrder: 600, leadTime: "15–25 days" },
  { slug: "saga-leather", name: "Kasur Leather House", location: "Kasur", country: "Pakistan", flag: "🇵🇰", tagline: "Full-grain leather goods", rating: 4.8, sales: 9975, since: 2017, verified: true, wholesale: true, retail: true, minOrder: 450, leadTime: "10–16 days" },
  { slug: "kyzofire-apparel", name: "KyzoFire Apparel", location: "Sialkot", country: "Pakistan", flag: "🇵🇰", tagline: "Tracksuits, hoodies & sportswear", rating: 4.6, sales: 4210, since: 2019, verified: true, wholesale: true, retail: true, minOrder: 200, leadTime: "7–12 days" },
  { slug: "kitchen-kraft", name: "Kitchen Kraft", location: "Gujranwala", country: "Pakistan", flag: "🇵🇰", tagline: "Cookware & kitchen appliances", rating: 4.7, sales: 6150, since: 2015, verified: true, wholesale: true, retail: true, minOrder: 300, leadTime: "10–15 days" },
  { slug: "punjab-tools", name: "Punjab Tools", location: "Lahore", country: "Pakistan", flag: "🇵🇰", tagline: "Power-tool accessories & hardware", rating: 4.5, sales: 2890, since: 2020, verified: true, wholesale: true, retail: true, minOrder: 150, leadTime: "5–10 days" },
  { slug: "sialkot-machinery", name: "Sialkot Machinery Store", location: "Sialkot", country: "Pakistan", flag: "🇵🇰", tagline: "Cordless tools & power equipment", rating: 4.6, sales: 3540, since: 2018, verified: true, wholesale: true, retail: true, minOrder: 500, leadTime: "10–18 days" },
  { slug: "gujrat-sports", name: "Gujrat Sports Co.", location: "Sialkot", country: "Pakistan", flag: "🇵🇰", tagline: "Footballs, gloves & fitness gear", rating: 4.8, sales: 5120, since: 2016, verified: true, wholesale: true, retail: true, minOrder: 250, leadTime: "8–14 days" },
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
    price: 38, compareAt: 48, wholesalePrice: 22, moq: 50, category: "jewelry", shop: "amber-forge", rating: 4.9, reviews: 428,
    badge: "Bestseller", gradient: G.sand, emoji: "💫", freeShipping: true,
    image: IMG("1535632066927-ab7c9ab60908"),
    description: "Lightweight hoops hand-hammered from raw brass for a soft, organic shimmer. Each pair is finished with a protective wax and hangs on hypoallergenic ear wires.",
  },
  {
    id: "p2", slug: "speckled-stoneware-mug", title: "Speckled Stoneware Mug — 12oz",
    price: 32, wholesalePrice: 18, moq: 48, category: "home-living", shop: "kiln-and-clay", rating: 4.8, reviews: 1204,
    badge: "Editors' Pick", gradient: G.sage, emoji: "☕", freeShipping: true,
    image: IMG("1578749556568-bc2c40e68b61"),
    description: "Wheel-thrown from a speckled clay body and dipped in a matte oatmeal glaze. Microwave and dishwasher safe, and it feels wonderful in the hand.",
  },
  {
    id: "p3", slug: "botanical-riso-print-set", title: "Botanical Riso Print Set of 3",
    price: 45, wholesalePrice: 26, moq: 25, category: "art-collectibles", shop: "paperbloom-co", rating: 4.9, reviews: 356,
    badge: "New", gradient: G.mint, emoji: "🌿",
    image: IMG("1579762715118-a6f1d4b934f1"),
    description: "A trio of risograph prints celebrating heirloom plants, printed with soy-based inks on recycled cotton paper. Frames not included.",
  },
  {
    id: "p4", slug: "indigo-dyed-linen-scarf", title: "Indigo Shibori Linen Scarf",
    price: 64, compareAt: 78, wholesalePrice: 38, moq: 30, category: "clothing", shop: "wildthread-studio", rating: 4.9, reviews: 512,
    badge: "Sale", gradient: G.sky, emoji: "🌊", freeShipping: true,
    image: IMG("1520903920243-00d872a2d1c9"),
    description: "European linen hand-folded and dipped in a natural indigo vat, so no two are identical. Softens beautifully with every wash.",
  },
  {
    id: "p5", slug: "full-grain-card-wallet", title: "Full-Grain Leather Card Wallet",
    price: 52, wholesalePrice: 30, moq: 40, category: "bags-accessories", shop: "saga-leather", rating: 4.8, reviews: 889,
    badge: "Bestseller", gradient: G.clay, emoji: "👛",
    image: IMG("1627123424574-724758594e93"),
    description: "Cut from a single piece of vegetable-tanned leather and saddle-stitched by hand. Holds 6+ cards and develops a rich patina over time.",
  },
  {
    id: "p6", slug: "maple-stacking-rainbow", title: "Heirloom Maple Stacking Rainbow",
    price: 58, wholesalePrice: 34, moq: 24, category: "toys-games", shop: "north-maple", rating: 4.7, reviews: 240,
    gradient: G.rose, emoji: "🌈", freeShipping: true,
    image: IMG("1558060370-d644479cb6f7"),
    description: "Turned from sustainably harvested maple and finished with food-safe oil. An open-ended toy built to be passed down.",
  },
  {
    id: "p7", slug: "pressed-flower-invitation-suite", title: "Pressed Flower Wedding Invitation Suite",
    price: 96, wholesalePrice: 60, moq: 20, category: "weddings", shop: "paperbloom-co", rating: 5.0, reviews: 178,
    badge: "Editors' Pick", gradient: G.plum, emoji: "💐",
    image: IMG("1607344645866-009c320b63e0"),
    description: "A fully customizable invitation suite with real pressed blooms, letterpressed on 100% cotton stock. Includes invite, RSVP, and details card.",
  },
  {
    id: "p8", slug: "merino-hand-dyed-yarn", title: "Hand-Dyed Merino Yarn — Fingering",
    price: 28, wholesalePrice: 16, moq: 60, category: "craft-supplies", shop: "wildthread-studio", rating: 4.9, reviews: 963,
    badge: "New", gradient: G.ink, emoji: "🧶", freeShipping: true,
    image: IMG("1584992236310-6edddc08acff"),
    description: "100g of superwash merino, kettle-dyed in small batches for gentle tonal variation. 420 yards — enough for a generous shawl.",
  },
  {
    id: "p9", slug: "raw-crystal-stacking-ring", title: "Raw Crystal Stacking Ring",
    price: 42, wholesalePrice: 24, moq: 50, category: "jewelry", shop: "amber-forge", rating: 4.8, reviews: 305,
    gradient: G.plum, emoji: "💎",
    image: IMG("1602173574767-37ac01994b2a"),
    description: "A rough-cut quartz point set on a delicate sterling band. Sold individually so you can build your own stack.",
  },
  {
    id: "p10", slug: "matte-black-bud-vase", title: "Matte Black Bud Vase",
    price: 26, wholesalePrice: 15, moq: 48, category: "home-living", shop: "kiln-and-clay", rating: 4.7, reviews: 421,
    gradient: G.ink, emoji: "🖤", freeShipping: true,
    image: IMG("1610701596007-11502861dcfa"),
    description: "A little sculptural vase for a single stem, glazed in a velvety matte black. Each one is thrown and trimmed by hand.",
  },
  {
    id: "p11", slug: "abstract-landscape-original", title: "Abstract Landscape — Original Painting",
    price: 220, compareAt: 260, wholesalePrice: 140, moq: 10, category: "art-collectibles", shop: "paperbloom-co", rating: 5.0, reviews: 64,
    badge: "Sale", gradient: G.sand, emoji: "🖼️",
    image: IMG("1541961017774-22349e4a1262"),
    description: "Original acrylic on 16×20 birch panel, sealed and ready to hang. A calm, sunlit horizon in warm neutrals.",
  },
  {
    id: "p12", slug: "quilted-canvas-tote", title: "Quilted Canvas Everyday Tote",
    price: 74, wholesalePrice: 44, moq: 24, category: "bags-accessories", shop: "saga-leather", rating: 4.8, reviews: 611,
    badge: "Bestseller", gradient: G.mint, emoji: "👜", freeShipping: true,
    image: IMG("1548036328-c9fa89d128fa"),
    description: "Heavyweight quilted cotton canvas with a leather base and interior pocket. Roomy enough for a laptop and a farmers-market haul.",
  },
  {
    id: "p13", slug: "womens-polyester-tracksuit-full-zip", title: "Women's Polyester Tracksuit — Full Zip",
    price: 18, wholesalePrice: 11, moq: 10, category: "clothing", shop: "kyzofire-apparel", rating: 4.6, reviews: 318,
    badge: "Bestseller", gradient: G.sky, emoji: "🧥",
    description: "Lightweight brushed-polyester tracksuit with a full-zip jacket and tapered joggers. Custom colours and private-label branding available on bulk orders.",
  },
  {
    id: "p14", slug: "mens-fleece-pullover-hoodie", title: "Men's Fleece Pullover Hoodie — 320 GSM",
    price: 16, wholesalePrice: 9, moq: 12, category: "clothing", shop: "kyzofire-apparel", rating: 4.5, reviews: 204,
    gradient: G.ink, emoji: "🧥",
    description: "Heavyweight 320 GSM cotton-fleece hoodie with a kangaroo pocket and double-lined hood. OEM / private label welcome; size runs S–3XL.",
  },
  {
    id: "p15", slug: "diamond-nonstick-cookware-set-7pc", title: "Diamond Non-Stick Cookware Set — 7 Piece",
    price: 48, wholesalePrice: 29, moq: 6, category: "home-living", shop: "kitchen-kraft", rating: 4.7, reviews: 486,
    badge: "New", gradient: G.clay, emoji: "🍳",
    description: "Die-cast aluminium cookware with a diamond-reinforced non-stick coating and bakelite handles. 7-piece set with retail-ready colour boxes.",
  },
  {
    id: "p16", slug: "stainless-steel-casserole-set", title: "Stainless Steel Casserole Hot-Pot Set — 3 Piece",
    price: 36, wholesalePrice: 22, moq: 8, category: "home-living", shop: "kitchen-kraft", rating: 4.6, reviews: 273,
    gradient: G.sand, emoji: "🍲",
    description: "Double-wall insulated stainless-steel casseroles that keep food hot for hours. Nested 3-piece set, ideal for export and gift packs.",
  },
  {
    id: "p17", slug: "105-degree-right-angle-drill-attachment", title: "105° Right Angle Drill Attachment",
    price: 8, wholesalePrice: 4.5, moq: 24, category: "industrial-tools", shop: "punjab-tools", rating: 4.4, reviews: 612,
    badge: "Bestseller", gradient: G.ink, emoji: "🛠️",
    description: "Compact right-angle adapter for drills and drivers to reach tight corners. 1/4\" hex shank, hardened steel gears. Bulk-packed for resale.",
  },
  {
    id: "p18", slug: "screwdriver-bit-set-42pc", title: "Screwdriver & Driver Bit Set — 42 Piece",
    price: 10, wholesalePrice: 6, moq: 20, category: "industrial-tools", shop: "punjab-tools", rating: 4.5, reviews: 388,
    gradient: G.sage, emoji: "🪛",
    description: "42-piece chrome-vanadium bit set with magnetic holder in a hard case. A fast-moving hardware line for tool shops and hardware stores.",
  },
  {
    id: "p19", slug: "20v-cordless-hand-vacuum", title: "20V Cordless Hand Vacuum — Portable",
    price: 55, wholesalePrice: 34, moq: 10, category: "industrial-tools", shop: "sialkot-machinery", rating: 4.6, reviews: 241,
    badge: "Bestseller", gradient: G.sky, emoji: "🔌",
    description: "Lightweight 20V cordless vacuum for car and home with washable HEPA filter and two nozzles. Supplied with battery and fast charger.",
  },
  {
    id: "p20", slug: "20v-cordless-drill-kit", title: "20V Cordless Drill & Driver Kit",
    price: 62, wholesalePrice: 39, moq: 8, category: "industrial-tools", shop: "sialkot-machinery", rating: 4.7, reviews: 177,
    gradient: G.plum, emoji: "🔧",
    description: "Brushless 20V drill-driver with two batteries, charger, and a 29-piece accessory set in a blow-mould case. 18+2 torque settings.",
  },
  {
    id: "p21", slug: "leather-match-boxing-gloves", title: "Leather Match Boxing Gloves — 12oz",
    price: 34, wholesalePrice: 20, moq: 15, category: "sports-fitness", shop: "gujrat-sports", rating: 4.8, reviews: 356,
    badge: "Editors' Pick", gradient: G.rose, emoji: "🥊",
    description: "Hand-stitched genuine-leather boxing gloves with multi-layer foam and a secure wrist strap. Custom logos and colourways on bulk orders.",
  },
  {
    id: "p22", slug: "match-quality-soccer-ball", title: "Match-Quality Soccer Ball — Size 5",
    price: 22, wholesalePrice: 13, moq: 20, category: "sports-fitness", shop: "gujrat-sports", rating: 4.7, reviews: 429,
    gradient: G.mint, emoji: "⚽",
    description: "Thermo-bonded size-5 match ball with a butyl bladder for superior air retention. FIFA-quality construction; private-label printing available.",
  },
  {
    id: "p23", slug: "chiniot-hand-carved-wooden-sofa-set", title: "Chiniot Hand-Carved Wooden Sofa Set — 5 Seater",
    price: 680, wholesalePrice: 440, moq: 4, category: "furniture", shop: "north-maple", rating: 4.9, reviews: 142,
    badge: "Editors' Pick", gradient: G.sand, emoji: "🛋️",
    description: "Traditional Chiniot craftsmanship — solid sheesham (rosewood) frame with deep hand-carving and premium upholstery. Custom fabric, finish and sizing for bulk orders.",
  },
  {
    id: "p24", slug: "chiniot-sheesham-dining-table-6-seater", title: "Chiniot Sheesham Wood Dining Table — 6 Seater",
    price: 520, wholesalePrice: 340, moq: 3, category: "furniture", shop: "north-maple", rating: 4.8, reviews: 98,
    gradient: G.clay, emoji: "🪑",
    description: "Solid sheesham dining table with hand-carved legs and a natural oiled finish. Seats six; matching carved chairs available. Built for export and hospitality buyers.",
  },
  {
    id: "p25", slug: "wrought-iron-wood-console-table", title: "Wrought Iron & Wood Console Table",
    price: 240, wholesalePrice: 150, moq: 6, category: "furniture", shop: "north-maple", rating: 4.7, reviews: 156,
    badge: "New", gradient: G.ink, emoji: "🪵",
    description: "Chiniot-style mixed-material piece — a reclaimed-wood top on a hand-forged wrought-iron base. Flat-packed for efficient container shipping.",
  },
  {
    id: "p26", slug: "chiniot-hand-carved-bed-frame-king", title: "Chiniot Hand-Carved Wooden Bed Frame — King",
    price: 590, wholesalePrice: 380, moq: 2, category: "furniture", shop: "north-maple", rating: 4.9, reviews: 73,
    badge: "Bestseller", gradient: G.rose, emoji: "🛏️",
    description: "King-size sheesham bed with an intricately carved headboard, a signature of Chiniot woodwork. Brass-inlay and metal-accent options for wholesale orders.",
  },
  {
    id: "p27", slug: "stainless-steel-cookware-pot-set-9pc", title: "Stainless Steel Cookware Pot Set — 9 Piece",
    price: 72, wholesalePrice: 44, moq: 10, category: "cutlery", shop: "kitchen-kraft", rating: 4.7, reviews: 388,
    badge: "Bestseller", gradient: G.sky, emoji: "🍲",
    description: "Encapsulated tri-ply base stainless-steel pots with tempered-glass lids. 9-piece nesting set with retail-ready colour boxes; induction compatible.",
  },
  {
    id: "p28", slug: "stainless-steel-cutlery-set-24pc", title: "24-Piece Stainless Steel Cutlery Set",
    price: 40, wholesalePrice: 24, moq: 12, category: "cutlery", shop: "kitchen-kraft", rating: 4.6, reviews: 264,
    gradient: G.sage, emoji: "🍴",
    description: "Mirror-polished 18/10 stainless cutlery — service for six (knives, forks, spoons, teaspoons). Gift-boxed; custom engraving on bulk orders.",
  },
  {
    id: "p29", slug: "stainless-steel-stock-pot-20l", title: "Heavy-Gauge Stainless Steel Stock Pot — 20L",
    price: 58, wholesalePrice: 36, moq: 8, category: "cutlery", shop: "kitchen-kraft", rating: 4.8, reviews: 171,
    gradient: G.sand, emoji: "🥘",
    description: "Commercial-grade 20-litre stock pot with a sandwich bottom for even heat and riveted handles. Built for caterers, restaurants and wholesalers.",
  },
  {
    id: "p30", slug: "stainless-steel-serving-dish-set-3pc", title: "Stainless Steel Serving Dish Set — 3 Piece",
    price: 34, wholesalePrice: 21, moq: 12, category: "cutlery", shop: "kitchen-kraft", rating: 4.7, reviews: 142,
    gradient: G.mint, emoji: "🍽️",
    description: "Double-wall insulated serving dishes with lids that keep food hot at the table. Nested 3-piece set, popular for gifting and hospitality supply.",
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
