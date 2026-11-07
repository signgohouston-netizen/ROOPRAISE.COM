import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="These Terms govern your use of Roopraise, an online marketplace that connects buyers with manufacturers and suppliers (“Suppliers”). By creating an account, listing products, sending inquiries, or otherwise using the platform, you agree to these Terms."
      sections={[
        {
          h: "About Roopraise",
          p: [
            "Roopraise is a marketplace and introduction service. We help buyers discover Suppliers and help Suppliers reach buyers in markets including the United States, Canada, the United Kingdom and Europe.",
            "Roopraise is not the seller, manufacturer, importer or shipper of any product listed. Contracts for the sale of goods are formed directly between the buyer and the Supplier. Roopraise is not a party to those contracts.",
          ],
        },
        {
          h: "Accounts & eligibility",
          p: [
            "You must provide accurate business and contact information and keep it up to date. You are responsible for all activity on your account and for keeping your login secure.",
            "Suppliers must be genuine businesses or makers able to fulfil the orders they accept. Roopraise may request documents to verify identity, business registration or product quality before granting a Verified Supplier badge.",
          ],
        },
        {
          h: "Listings & content",
          p: [
            "Suppliers are solely responsible for their listings, including descriptions, images, prices, minimum order quantities, lead times and compliance with applicable laws. Listings must be accurate and must not infringe anyone’s intellectual property.",
            "You grant Roopraise a non-exclusive licence to display and promote your listings on the platform and in marketing. You confirm you own or are licensed to use all content you upload.",
          ],
        },
        {
          h: "Inquiries, quotes & orders",
          p: [
            "Buyers contact Suppliers through Roopraise to request quotes, samples and terms. Keep your negotiations, orders and communication on the platform so that trade protection, dispute support and quality records remain valid.",
            "Taking an order off-platform after being introduced on Roopraise is a breach of these Terms and may result in withheld payouts, loss of protection, and suspension.",
          ],
        },
        {
          h: "Fees",
          p: [
            "Creating an account and listing products is free on the Free plan. Roopraise offers paid membership plans and may charge payment-processing and payout fees, as described on the Pricing page. Fees are shown before you confirm.",
          ],
        },
        {
          h: "Prohibited conduct",
          p: [
            "You may not post illegal, counterfeit, unsafe or misrepresented goods; manipulate ratings or reviews; harvest other users’ data; or use the platform to defraud, spam or harass.",
          ],
        },
        {
          h: "Disclaimers & liability",
          p: [
            "The platform is provided “as is”. Roopraise does not guarantee the quality, safety, legality or delivery of any product, or the conduct of any user. To the maximum extent permitted by law, Roopraise is not liable for losses arising from transactions between buyers and Suppliers.",
          ],
        },
        {
          h: "Changes & termination",
          p: [
            "We may update these Terms, suspend or close accounts that breach them, and change or discontinue features. Continued use after changes means you accept the updated Terms.",
          ],
        },
      ]}
    />
  );
}
