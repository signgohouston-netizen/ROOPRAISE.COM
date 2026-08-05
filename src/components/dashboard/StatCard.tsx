export default function StatCard({
  label,
  value,
  delta,
  hint,
  icon,
}: {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  icon?: string;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink/60">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-2xl font-bold text-ink">{value}</span>
        {delta != null && (
          <span
            className={`mb-1 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
              up ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
            }`}
          >
            {up ? "▲" : "▼"} {Math.abs(delta)}%
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-ink/50">{hint}</p>}
    </div>
  );
}
