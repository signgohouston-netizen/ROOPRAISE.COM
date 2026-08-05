type Point = { label: string; value: number };

// --- Area / line chart -------------------------------------------------
export function AreaChart({
  data,
  height = 200,
  color = "#dd4f1f",
}: {
  data: Point[];
  height?: number;
  color?: string;
}) {
  const w = 640;
  const h = height;
  const pad = { top: 16, right: 8, bottom: 24, left: 8 };
  const max = Math.max(...data.map((d) => d.value)) * 1.1 || 1;
  const iw = w - pad.left - pad.right;
  const ih = h - pad.top - pad.bottom;
  const x = (i: number) => pad.left + (i / (data.length - 1)) * iw;
  const y = (v: number) => pad.top + ih - (v / max) * ih;

  const line = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(d.value).toFixed(1)}`).join(" ");
  const area = `${line} L ${x(data.length - 1).toFixed(1)} ${pad.top + ih} L ${x(0).toFixed(1)} ${pad.top + ih} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Trend chart">
      <defs>
        <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line
          key={g}
          x1={pad.left}
          x2={w - pad.right}
          y1={pad.top + ih * g}
          y2={pad.top + ih * g}
          stroke="#2b2320"
          strokeOpacity="0.06"
        />
      ))}
      <path d={area} fill="url(#area-fill)" />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => (
        <circle key={i} cx={x(i)} cy={y(d.value)} r="2.5" fill={color} />
      ))}
      {data.map((d, i) =>
        i % Math.ceil(data.length / 7) === 0 || i === data.length - 1 ? (
          <text key={i} x={x(i)} y={h - 6} textAnchor="middle" fontSize="11" fill="#2b2320" fillOpacity="0.5">
            {d.label}
          </text>
        ) : null
      )}
    </svg>
  );
}

// --- Bar chart ---------------------------------------------------------
export function BarChart({
  data,
  height = 200,
  color = "#dd4f1f",
}: {
  data: Point[];
  height?: number;
  color?: string;
}) {
  const w = 640;
  const h = height;
  const pad = { top: 16, right: 8, bottom: 26, left: 8 };
  const max = Math.max(...data.map((d) => d.value)) * 1.1 || 1;
  const iw = w - pad.left - pad.right;
  const ih = h - pad.top - pad.bottom;
  const bw = (iw / data.length) * 0.62;
  const gap = iw / data.length;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Bar chart">
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={pad.left} x2={w - pad.right} y1={pad.top + ih * g} y2={pad.top + ih * g} stroke="#2b2320" strokeOpacity="0.06" />
      ))}
      {data.map((d, i) => {
        const bh = (d.value / max) * ih;
        const x = pad.left + i * gap + (gap - bw) / 2;
        const y = pad.top + ih - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} rx="4" fill={color} opacity={0.85} />
            <text x={x + bw / 2} y={h - 8} textAnchor="middle" fontSize="11" fill="#2b2320" fillOpacity="0.5">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// --- Donut chart -------------------------------------------------------
const DONUT_COLORS = ["#dd4f1f", "#e76f43", "#8fae7d", "#7fa8c9", "#cdae7e", "#a67fb0", "#7cc0a8", "#8783a6"];

export function Donut({
  data,
  size = 180,
}: {
  data: { name: string; value: number }[];
  size?: number;
}) {
  const total = data.reduce((n, d) => n + d.value, 0) || 1;
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Category breakdown">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {data.map((d, i) => {
            const frac = d.value / total;
            const dash = frac * c;
            const el = (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
                strokeWidth="16"
                strokeDasharray={`${dash} ${c - dash}`}
                strokeDashoffset={-offset}
              />
            );
            offset += dash;
            return el;
          })}
        </g>
      </svg>
      <ul className="space-y-1.5 text-sm">
        {data.slice(0, 6).map((d, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
            <span className="text-ink/70">{d.name}</span>
            <span className="ml-auto font-medium text-ink">{Math.round((d.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
