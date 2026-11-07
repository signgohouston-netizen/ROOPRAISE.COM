"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    router.push(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search");
  }

  return (
    <form onSubmit={submit} className={`flex w-full items-center ${className}`} role="search">
      <div className="flex w-full items-center rounded-full border border-ink/15 bg-white pl-4 pr-1.5 shadow-sm transition focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-200">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products, suppliers, categories…"
          className="h-11 w-full bg-transparent text-[15px] outline-none placeholder:text-ink/40"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 text-white transition hover:bg-brand-600"
          aria-label="Search"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </div>
    </form>
  );
}
