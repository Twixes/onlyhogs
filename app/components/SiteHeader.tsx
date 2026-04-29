import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/5 bg-[var(--surface)]/85 backdrop-blur dark:border-white/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <LogoMark />
          <span className="text-lg font-extrabold tracking-tight">
            Only<span className="text-[var(--brand)]">Hogs</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/browse"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground"
          >
            Browse
          </Link>
          <Link
            href="/login"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-[var(--brand)] px-4 py-1.5 text-sm font-semibold text-[var(--brand-ink)] shadow-sm transition hover:opacity-95"
          >
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span
      className="inline-flex h-8 w-8 items-center justify-center rounded-full"
      style={{
        background:
          "linear-gradient(135deg, var(--brand), hsl(from var(--brand) calc(h + 30) s l))",
      }}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" width={22} height={22}>
        <ellipse cx="17" cy="20" rx="11" ry="8" fill="#fff" opacity="0.95" />
        <g fill="#3a1d2b">
          {Array.from({ length: 7 }).map((_, i) => {
            const t = i / 6;
            const cx = 8 + t * 18;
            const cy = 20 - Math.sin(t * Math.PI) * 8;
            const angle = (t - 0.5) * 120;
            return (
              <polygon
                key={i}
                points={`${cx - 1.1},${cy} ${cx + 1.1},${cy} ${cx},${cy - 4}`}
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
            );
          })}
        </g>
        <circle cx="8" cy="22" r="1.3" fill="#3a1d2b" />
        <circle cx="13" cy="19" r="0.8" fill="#3a1d2b" />
      </svg>
    </span>
  );
}
