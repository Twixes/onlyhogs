import { CategoryPill } from "../components/CategoryPill";
import { CreatorCard } from "../components/CreatorCard";
import { categories, hogsByCategory } from "../lib/hogs";

export const metadata = {
  title: "Browse hogs — OnlyHogs",
  description:
    "Discover verified hedgehog creators across paw pics, mud baths, wheel work, and more.",
};

export default function BrowsePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Discover hogs
        </h1>
        <p className="mt-2 max-w-xl text-foreground/70">
          Browse by category. Every creator on OnlyHogs is a fully verified,
          ethically sourced, consenting hedgehog.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((c) => (
            <CategoryPill key={c.slug} slug={c.slug} name={c.name} />
          ))}
        </div>
      </header>

      <div className="space-y-14">
        {categories.map((c) => {
          const items = hogsByCategory(c.slug);
          if (items.length === 0) return null;
          return (
            <section key={c.slug} id={c.slug} className="scroll-mt-20">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {c.name}
                  </h2>
                  <p className="mt-1 text-sm text-foreground/60">{c.blurb}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                  {items.length} {items.length === 1 ? "hog" : "hogs"}
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((h) => (
                  <CreatorCard key={h.username} hog={h} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
