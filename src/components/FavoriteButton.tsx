"use client";

import { useEffect, useState } from "react";

const KEY = "rooprise-favorites";

function readFavs(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export default function FavoriteButton({
  productId,
  className = "",
}: {
  productId: string;
  className?: string;
}) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(readFavs().includes(productId));
  }, [productId]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const favs = readFavs();
    const next = favs.includes(productId)
      ? favs.filter((id) => id !== productId)
      : [...favs, productId];
    localStorage.setItem(KEY, JSON.stringify(next));
    setFav(next.includes(productId));
  }

  return (
    <button
      onClick={toggle}
      aria-label={fav ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={fav}
      className={`grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg shadow-sm backdrop-blur transition hover:scale-110 hover:bg-white ${className}`}
    >
      <span className={fav ? "text-brand-500" : "text-ink/50"}>{fav ? "♥" : "♡"}</span>
    </button>
  );
}
