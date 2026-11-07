// Single source of truth for the site's public address.
// Override with NEXT_PUBLIC_SITE_URL in Vercel once the custom domain is live
// (e.g. a temporary preview/staging URL); defaults to the production domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://roopraise.com"
).replace(/\/$/, "");

export const SITE_NAME = "Roopraise";
export const SITE_DESCRIPTION =
  "Roopraise is a cross-border trade marketplace connecting verified manufacturers and brands across Asia with buyers in the US, Canada, UK and Europe. Buy wholesale or retail; suppliers sell B2B, B2C, or both.";
