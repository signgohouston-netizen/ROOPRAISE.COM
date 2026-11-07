import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "How To Pay" };

export default function HowToPayPage() {
  return (
    <LegalPage
      title="How To Pay"
      intro="Roopraise keeps payments simple and protected for cross-border trade. Here’s how paying a Supplier works, from first inquiry to delivery."
      sections={[
        {
          h: "1) Agree terms with the Supplier",
          p: [
            "Contact the Supplier through Roopraise to confirm price, quantity, specifications, lead time and shipping. Request a sample first for larger orders.",
          ],
        },
        {
          h: "2) Pay securely on Roopraise",
          p: [
            "Place your order and pay through Roopraise using the available methods — card, bank transfer, or supported wallets. Your payment is held securely and is not released to the Supplier straight away.",
          ],
        },
        {
          h: "3) Trade protection holds your money",
          p: [
            "Funds stay protected until your order ships as described. This gives buyers confidence to order from a new Supplier and gives Suppliers confidence that genuine buyers have paid.",
          ],
        },
        {
          h: "4) Supplier produces & ships",
          p: [
            "The Supplier manufactures and dispatches your order and shares tracking. You can message them on-platform throughout.",
          ],
        },
        {
          h: "5) Funds released to the Supplier",
          p: [
            "Once the order ships as agreed (and any inspection window passes), Roopraise releases payment to the Supplier and pays them out via Payoneer, Wise or bank transfer to their country.",
          ],
        },
        {
          h: "If something goes wrong",
          p: [
            "If an order isn’t shipped as described, open a dispute from your order and our team will help mediate. Keeping all communication and payment on Roopraise is what makes this protection possible.",
          ],
        },
      ]}
    />
  );
}
