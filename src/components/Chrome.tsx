"use client";

import { usePathname } from "next/navigation";
import GeoBanner from "./GeoBanner";

export default function Chrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  if (bare) return <>{children}</>;

  return (
    <>
      <GeoBanner />
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
