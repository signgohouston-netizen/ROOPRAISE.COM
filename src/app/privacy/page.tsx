import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This Policy explains what information Roopraise collects, how we use it, and the choices you have. It applies to buyers, Suppliers and visitors to roopraise.com."
      sections={[
        {
          h: "Information we collect",
          p: [
            "Account information you provide, such as your name, business name, email, phone number, country and payout details.",
            "Activity information, such as listings you create, inquiries and quotes you send or receive, searches, and messages exchanged on the platform.",
            "Technical information, such as device, browser, IP address and cookies, used to run and secure the site.",
          ],
        },
        {
          h: "How we use information",
          p: [
            "To operate the marketplace: show listings, route inquiries between buyers and Suppliers, process fees, and provide support.",
            "To verify Suppliers, prevent fraud and abuse, keep the platform safe, and meet legal obligations.",
            "To improve the service and, where permitted, send you relevant updates. You can opt out of marketing emails at any time.",
          ],
        },
        {
          h: "Sharing information",
          p: [
            "When a buyer contacts a Supplier (or a Supplier responds), the information needed to complete that introduction and order is shared between them.",
            "We share data with service providers (hosting, analytics, payment and payout partners) under contract, and when required by law. We do not sell your personal information.",
          ],
        },
        {
          h: "Cookies",
          p: [
            "We use essential cookies to run the site and optional cookies to understand usage. You can control non-essential cookies through your browser or any on-site controls we provide.",
          ],
        },
        {
          h: "Data retention & security",
          p: [
            "We keep information for as long as your account is active or as needed for legal, tax and dispute purposes, then delete or anonymise it. We use reasonable technical and organisational measures to protect your data, though no system is perfectly secure.",
          ],
        },
        {
          h: "Your rights",
          p: [
            "Depending on your location, you may request access to, correction of, or deletion of your personal data, and object to certain processing. See our Account Deletion Policy to remove your account, or email support@roopraise.com.",
          ],
        },
        {
          h: "International transfers",
          p: [
            "Roopraise serves buyers and Suppliers across different countries, so your information may be processed outside your home country. We take steps to ensure it remains protected when transferred.",
          ],
        },
      ]}
    />
  );
}
