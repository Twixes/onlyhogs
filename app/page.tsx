import Image from "next/image";
import Link from "next/link";
import { CategoryPill } from "./components/CategoryPill";
import { CreatorCard } from "./components/CreatorCard";
import { categories, hogs } from "./lib/hogs";

export default function Home() {
  const featured = hogs.slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 60% at 85% 20%, color-mix(in oklab, var(--brand) 35%, transparent), transparent), radial-gradient(70% 70% at 10% 90%, color-mix(in oklab, var(--brand) 25%, transparent), transparent)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex items-center rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
              New hogs added daily
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Sign up to see exclusive content from your favourite{" "}
              <span className="text-[var(--brand)]">hogs</span>.
            </h1>
            <p className="mt-4 max-w-md text-lg text-foreground/70">
              Unlimited snuffles. Premium spikes. No fleas. Thousands of
              verified hedgehogs, posting just for you.
            </p>
            <form className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="your.email@hedgerow.co.uk"
                className="flex-1 rounded-full border border-black/10 bg-[var(--surface)] px-4 py-3 text-sm shadow-sm placeholder:text-foreground/40 focus:border-[var(--brand)] focus:outline-none dark:border-white/15"
              />
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-[var(--brand-ink)] shadow-sm transition hover:opacity-95"
              >
                Sign up for free
              </Link>
            </form>
            <p className="mt-3 text-xs text-foreground/50">
              By signing up you agree to our Terms of Snervice. 18+ hogs only.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {featured.slice(0, 6).map((h, i) => (
                <div
                  key={h.username}
                  className={`relative overflow-hidden rounded-2xl shadow-sm ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                  style={{
                    background: `linear-gradient(135deg, hsl(${(i * 53) % 360} 80% 75%), hsl(${
                      (i * 53 + 60) % 360
                    } 75% 58%))`,
                    aspectRatio: "1/1",
                  }}
                >
                  {h.imageSrc ? (
                    <Image
                      src={h.imageSrc}
                      alt={h.displayName}
                      fill
                      sizes="(max-width: 768px) 33vw, 200px"
                      className="object-contain p-2"
                    />
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 flex items-end p-3">
                    <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
                      @{h.username}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-black/5 bg-[var(--surface)] dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Explore categories
              </h2>
              <p className="mt-1 text-sm text-foreground/60">
                From toe beans to mud baths. Pick your flavour of hog.
              </p>
            </div>
            <Link
              href="/browse"
              className="text-sm font-semibold text-[var(--brand)] hover:underline"
            >
              See all &rarr;
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <CategoryPill key={c.slug} slug={c.slug} name={c.name} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured creators */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Featured hogs
              </h2>
              <p className="mt-1 text-sm text-foreground/60">
                Hand-picked by our editorial hedgehog.
              </p>
            </div>
            <Link
              href="/browse"
              className="text-sm font-semibold text-[var(--brand)] hover:underline"
            >
              Browse everyone &rarr;
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((h) => (
              <CreatorCard key={h.username} hog={h} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-black/5 bg-[var(--surface-muted)] dark:border-white/10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6">
          {[
            { k: "4.2M", v: "active hogs" },
            { k: "18.9M", v: "snuffles recorded" },
            { k: "312k", v: "mud baths taken" },
            { k: "£0.00", v: "on fleas" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="font-mono text-3xl font-extrabold text-[var(--brand)]">
                {s.k}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-foreground/60">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to get prickly?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-foreground/70">
            Join thousands of fans supporting hedgehog creators directly. One
            subscription, infinite snoots.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-[var(--brand-ink)] shadow-sm hover:opacity-95"
            >
              Create your account
            </Link>
            <Link
              href="/browse"
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-[var(--surface)] px-6 py-3 text-sm font-semibold hover:border-[var(--brand)] dark:border-white/15"
            >
              Browse hogs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
