import Link from "next/link";
import { HogAvatar } from "./HogAvatar";
import { LockedTile } from "./LockedTile";
import { getCategory, type Hog } from "../lib/hogs";

type Props = {
  hog: Hog;
};

export function CreatorCard({ hog }: Props) {
  const primaryCategory = hog.categories[0] ? getCategory(hog.categories[0]) : undefined;

  return (
    <Link
      href={`/hog/${hog.username}`}
      className="group block overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
    >
      <div className="relative">
        <LockedTile aspect="wide" seed={hog.username} label="Subscribers only" />
        <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          {primaryCategory?.name ?? "Featured"}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-[var(--brand)] px-2.5 py-1 font-mono text-[11px] font-semibold text-[var(--brand-ink)] shadow">
          £{hog.pricePerMonth.toFixed(2)}/mo
        </span>
      </div>
      <div className="flex items-center gap-3 p-4">
        <HogAvatar username={hog.username} imageSrc={hog.imageSrc} size={48} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-foreground">
            {hog.displayName}
          </div>
          <div className="truncate text-xs text-foreground/60">@{hog.username}</div>
        </div>
        <span className="rounded-full border border-[var(--brand)] px-3 py-1 text-xs font-semibold text-[var(--brand)] transition group-hover:bg-[var(--brand)] group-hover:text-[var(--brand-ink)]">
          Subscribe
        </span>
      </div>
    </Link>
  );
}
