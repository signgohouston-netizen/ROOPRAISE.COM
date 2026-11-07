import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Listing Policy" };

export default function ListingPolicyPage() {
  return (
    <LegalPage
      title="Listing Policy"
      intro="This Policy sets the rules for products listed on Roopraise. It keeps the marketplace trustworthy for buyers and fair for every Supplier. Listings that break these rules may be edited, hidden or removed."
      sections={[
        {
          h: "Accurate listings",
          p: [
            "Describe products honestly. Titles, specifications, materials, prices, minimum order quantities (MOQ) and lead times must match what you actually supply.",
            "Use your own photos or images you are licensed to use. Images must show the real product, not a competitor’s or an unrelated stock photo that misrepresents it.",
          ],
        },
        {
          h: "What you may list",
          p: [
            "Genuine wholesale and retail goods you can manufacture or supply — for example apparel, textiles, leather goods, home and kitchen products, hardware and tools, sports goods, and similar trade items.",
          ],
        },
        {
          h: "Prohibited & restricted items",
          p: [
            "No counterfeit or trademark-infringing goods, unsafe or recalled products, weapons, hazardous materials, or anything illegal to sell or export.",
            "Regulated goods (such as food, cosmetics or electrical items) must meet the safety and labelling rules of the destination market. You are responsible for compliance.",
          ],
        },
        {
          h: "Pricing & MOQ",
          p: [
            "List clear per-unit pricing and a realistic MOQ. Don’t use bait pricing or hide material costs. If prices vary by volume, say so in the listing.",
          ],
        },
        {
          h: "Intellectual property",
          p: [
            "Only list products you have the right to sell. Repeated IP violations lead to removal of listings and possible account suspension. Rights holders can report infringement to support@roopraise.com.",
          ],
        },
        {
          h: "Keep orders on-platform",
          p: [
            "Listings must not include off-platform contact details or links intended to move buyers off Roopraise. Keeping inquiries and orders on the platform protects both sides and keeps trade protection valid.",
          ],
        },
      ]}
    />
  );
}
