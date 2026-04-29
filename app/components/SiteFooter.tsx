import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-[var(--surface-muted)] dark:border-white/10">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-4 sm:px-6">
        <div className="sm:col-span-2">
          <div className="text-lg font-extrabold tracking-tight">
            Only<span className="text-[var(--brand)]">Hogs</span>
          </div>
          <p className="mt-2 max-w-sm text-sm text-foreground/70">
            Exclusive hedgehog content from creators you love. Snuffles, spikes,
            and very suspicious mud. 18+ hogs only.
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
            Company
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#" className="hover:text-[var(--brand)]">About</a></li>
            <li><a href="#" className="hover:text-[var(--brand)]">Careers at the Hedge</a></li>
            <li><a href="#" className="hover:text-[var(--brand)]">Press Kit</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
            Legal
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#" className="hover:text-[var(--brand)]">Terms of Snervice</a></li>
            <li><a href="#" className="hover:text-[var(--brand)]">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[var(--brand)]">Cookie Preferences (Biscuit Only)</a></li>
            <li><a href="#" className="hover:text-[var(--brand)]">Contact Prickly Support</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/5 py-4 text-center text-xs text-foreground/50 dark:border-white/10">
        &copy; {new Date().getFullYear()} OnlyHogs. No real hedgehogs were
        monetised in the making of this demo. <Link href="/" className="underline">home</Link>
      </div>
    </footer>
  );
}
