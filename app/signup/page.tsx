import Link from "next/link";

export const metadata = {
  title: "Sign up — OnlyHogs",
};

export default function SignupPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-black/5 bg-[var(--surface)] p-6 shadow-sm dark:border-white/10">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-foreground/60">
          It takes about 30 seconds. Fewer if you&rsquo;re a fast hog.
        </p>
        <form className="mt-6 space-y-4">
          <Field label="Email" type="email" placeholder="you@hedgerow.co.uk" />
          <Field label="Choose a username" type="text" placeholder="@newhog" />
          <Field label="Password" type="password" placeholder="at least 8 spikes" />
          <label className="flex items-start gap-2 text-xs text-foreground/70">
            <input type="checkbox" className="mt-0.5 accent-[var(--brand)]" />
            <span>
              I am at least 18 hedge-years old and I agree to the{" "}
              <a href="#" className="font-semibold text-[var(--brand)] hover:underline">
                Terms of Snervice
              </a>
              .
            </span>
          </label>
          <button
            type="button"
            className="w-full rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-[var(--brand-ink)] shadow-sm hover:opacity-95"
          >
            Create account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-foreground/60">
          Already subscribing?{" "}
          <Link href="/login" className="font-semibold text-[var(--brand)] hover:underline">
            Log in
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
