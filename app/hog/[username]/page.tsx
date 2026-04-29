import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HogAvatar } from "../../components/HogAvatar";
import { LockedTile } from "../../components/LockedTile";
import { getCategory, getHog, hogs } from "../../lib/hogs";

type Params = { username: string };

export function generateStaticParams(): Params[] {
  return hogs.map((h) => ({ username: h.username }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { username } = await params;
  const hog = getHog(username);
  if (!hog) return { title: "Hog not found — OnlyHogs" };
  return {
    title: `${hog.displayName} (@${hog.username}) — OnlyHogs`,
    description: hog.tagline,
  };
}

export default async function HogProfile({
  params,
}: {
  params: Promise<Params>;
}) {
  const { username } = await params;
  const hog = getHog(username);
  if (!hog) notFound();

  const categoryObjs = hog.categories
    .map((c) => getCategory(c))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const hue =
    [...hog.username].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 0) % 360;
  const coverBg = `linear-gradient(120deg, hsl(${hue} 80% 70%), hsl(${
    (hue + 50) % 360
  } 75% 55%), hsl(${(hue + 110) % 360} 70% 60%))`;

  return (
    <div>
      {/* Cover */}
      <div
        className="relative h-48 w-full sm:h-64"
        style={{ background: coverBg }}
      >
        <div className="absolute inset-0 bg-black/10" aria-hidden />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header card */}
        <div className="-mt-14 flex flex-col gap-5 rounded-2xl border border-black/5 bg-[var(--surface)] p-5 shadow-sm sm:flex-row sm:items-center dark:border-white/10">
          <HogAvatar
            username={hog.username}
            imageSrc={hog.imageSrc}
            size={112}
            className="shrink-0"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {hog.displayName}
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand)]/15 px-2 py-0.5 text-xs font-semibold text-[var(--brand)]">
                <VerifiedDot />
                Verified hog
              </span>
            </div>
            <div className="mt-1 text-sm text-foreground/60">@{hog.username}</div>
            <p className="mt-3 max-w-2xl text-sm text-foreground/80">{hog.bio}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categoryObjs.map((c) => (
                <Link
                  key={c.slug}
                  href={`/browse#${c.slug}`}
                  className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-foreground/70 hover:border-[var(--brand)] hover:text-[var(--brand)] dark:border-white/15"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="sm:text-right">
            <div className="font-mono text-xs uppercase tracking-wider text-foreground/50">
              Subscribe
            </div>
            <div className="font-mono text-2xl font-extrabold">
              £{hog.pricePerMonth.toFixed(2)}
              <span className="text-sm font-semibold text-foreground/60">/mo</span>
            </div>
            <button
              type="button"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-[var(--brand-ink)] shadow-sm hover:opacity-95"
            >
              Subscribe now
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-black/5 bg-[var(--surface-muted)] p-4 text-center dark:border-white/10">
          <Stat label="followers" value={hog.followers} />
          <Stat label="posts" value={hog.posts.toString()} />
          <Stat label="likes" value={hog.likes} />
        </div>

        {/* Locked content grid */}
        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Exclusive posts
              </h2>
              <p className="mt-1 text-sm text-foreground/60">
                Subscribe to unlock {hog.posts} posts from {hog.displayName}.
              </p>
            </div>
            <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-foreground/70 dark:bg-white/10">
              {hog.posts} posts
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <LockedTile
                key={i}
                seed={`${hog.username}-${i}`}
                aspect={i % 3 === 0 ? "tall" : "square"}
                label={i === 0 ? "NEW today" : "Subscribers only"}
              />
            ))}
          </div>
        </section>

        <section className="mt-12 mb-16 rounded-2xl border border-black/5 bg-[var(--surface)] p-5 text-sm text-foreground/70 dark:border-white/10">
          <span className="font-semibold text-foreground">Based in:</span>{" "}
          {hog.location}. Member since 2024. {hog.tagline}.
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-xl font-extrabold text-foreground">
        {value}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-foreground/55">
        {label}
      </div>
    </div>
  );
}

function VerifiedDot() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width={10}
      height={10}
      fill="currentColor"
    >
      <circle cx="8" cy="8" r="6" />
    </svg>
  );
}
