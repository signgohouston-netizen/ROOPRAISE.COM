export default function Stars({ rating, reviews }: { rating: number; reviews?: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1 text-sm">
      <span className="flex text-amber-500" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full;
          const isHalf = i === full && half;
          return (
            <span key={i} className="relative">
              <span className="text-amber-200">★</span>
              {(filled || isHalf) && (
                <span
                  className="absolute inset-0 overflow-hidden text-amber-500"
                  style={{ width: isHalf ? "50%" : "100%" }}
                >
                  ★
                </span>
              )}
            </span>
          );
        })}
      </span>
      <span className="font-medium text-ink">{rating.toFixed(1)}</span>
      {reviews != null && <span className="text-ink/50">({reviews.toLocaleString()})</span>}
    </div>
  );
}
