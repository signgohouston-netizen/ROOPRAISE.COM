import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/lib/currency";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chrome from "@/components/Chrome";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const TITLE = "Roopraise — Wholesale & retail marketplace, direct from Asia";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Roopraise",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
  },
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
