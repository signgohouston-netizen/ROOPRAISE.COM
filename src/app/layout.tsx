import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/lib/currency";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chrome from "@/components/Chrome";

export const metadata: Metadata = {
  title: {
    default: "Roopraise — Wholesale & retail marketplace, direct from Asia",
    template: "%s · Roopraise",
  },
  description:
    "Roopraise is a cross-border trade marketplace connecting verified manufacturers and brands across Asia with buyers in the US, Canada, UK and Europe. Buy wholesale or retail; suppliers sell B2B, B2C, or both.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <CurrencyProvider>
          <Chrome header={<Header />} footer={<Footer />}>
            {children}
          </Chrome>
        </CurrencyProvider>
      </body>
    </html>
  );
}
