type Props = {
  label?: string;
  aspect?: "square" | "tall" | "wide";
  seed?: string;
  className?: string;
};

function hashHue(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

export function LockedTile({
  label = "Locked",
  aspect = "square",
  seed = "hog",
  className = "",
}: Props) {
  const hue = hashHue(seed);
  const bg = `linear-gradient(140deg, hsl(${hue} 65% 72%), hsl(${(hue + 60) % 360} 70% 52%))`;
  const aspectClass =
    aspect === "tall" ? "aspect-[3/4]" : aspect === "wide" ? "aspect-[16/9]" : "aspect-square";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${aspectClass} ${className}`}
      style={{ background: bg }}
    >
      <div className="absolute inset-0 backdrop-blur-md" aria-hidden />
      <div className="absolute inset-0 bg-black/20" aria-hidden />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          width={28}
          height={28}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <span className="text-sm font-medium opacity-90">{label}</span>
      </div>
    </div>
  );
}
