import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center py-28 text-center">
      <span className="text-6xl">🧭</span>
      <h1 className="mt-6 font-display text-4xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-ink/60">
        We couldn&apos;t find what you were looking for — but there&apos;s plenty more to discover.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand-500 px-7 py-3 font-semibold text-white transition hover:bg-brand-600"
      >
        Back to home
      </Link>
    </div>
  );
}
