"use client";

import { useCurrency } from "@/lib/currency";

// Renders a USD amount formatted in the viewer's selected currency.
export default function Price({
  usd,
  className,
  prefix,
}: {
  usd: number;
  className?: string;
  prefix?: string;
}) {
  const { format } = useCurrency();
  return (
    <span className={className}>
      {prefix}
      {format(usd)}
    </span>
  );
}
