import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chrome from "@/components/Chrome";

export const metadata: Metadata = {
  title: {
    default: "Roopraise — Handmade & vintage marketplace",
    template: "%s · Roopraise",
  },
  description:
    "Roopraise is a marketplace for independent makers — handmade jewelry, home goods, art, and more from small shops you'll love.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <CartProvider>
          <Chrome header={<Header />} footer={<Footer />}>
            {children}
          </Chrome>
        </CartProvider>
      </body>
    </html>
  );
}
