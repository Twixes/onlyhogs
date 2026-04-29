import Link from "next/link";

export const metadata = {
  title: "Log in — OnlyHogs",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-black/5 bg-[var(--surface)] p-6 shadow-sm dark:border-white/10">
        <h1 className="text-2xl font-extrabold tracking-tight">Log in</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Welcome back. Your hogs have missed you.
        </p>
        <form className="mt-6 space-y-4">
          <Field label="Email or @username" type="text" placeholder="spikeysteve" />
          <Field label="Password" type="password" placeholder="••••••••" />
          <div className="flex items-center justify-between text-xs">
            <label className="inline-flex items-center gap-2 text-foreground/70">
              <input type="checkbox" className="accent-[var(--brand)]" />
              Remember this hedge
            </label>
            <a href="#" className="font-semibold text-[var(--brand)] hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="button"
            className="w-full rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-[var(--brand-ink)] shadow-sm hover:opacity-95"
          >
            Log in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-foreground/60">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-[var(--brand)] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-black/10 bg-[var(--surface)] px-3 py-2 text-sm shadow-sm placeholder:text-foreground/40 focus:border-[var(--brand)] focus:outline-none dark:border-white/15"
      />
    </label>
  );
}
