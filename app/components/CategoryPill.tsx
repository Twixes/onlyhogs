import Link from "next/link";

type Props = {
  slug: string;
  name: string;
  active?: boolean;
};

export function CategoryPill({ slug, name, active = false }: Props) {
  return (
    <Link
      href={`/browse#${slug}`}
      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
        active
          ? "border-transparent bg-[var(--brand)] text-[var(--brand-ink)]"
          : "border-black/10 bg-white/70 text-foreground hover:border-[var(--brand)] hover:text-[var(--brand)] dark:border-white/15 dark:bg-white/5 dark:hover:border-[var(--brand)]"
      }`}
    >
      {name}
    </Link>
  );
}
