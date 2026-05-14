"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "../lib/auth";

export default function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!agreed) {
      setError("You must agree to the Terms of Snervice.");
      return;
    }
    const result = signup(email, username, password);
    if (result.success) {
      router.push("/feed");
    } else {
      setError(result.error!);
    }
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-[var(--surface)] p-6 shadow-sm dark:border-white/10">
      <h1 className="text-2xl font-extrabold tracking-tight">
        Create your account
      </h1>
      <p className="mt-1 text-sm text-foreground/60">
        It takes about 30 seconds. Fewer if you&rsquo;re a fast hog.
      </p>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Field
          label="Email"
          type="email"
          placeholder="you@hedgerow.co.uk"
          value={email}
          onChange={setEmail}
        />
        <Field
          label="Choose a username"
          type="text"
          placeholder="@newhog"
          value={username}
          onChange={setUsername}
        />
        <Field
          label="Password"
          type="password"
          placeholder="at least 8 spikes"
          value={password}
          onChange={setPassword}
        />
        <label className="flex items-start gap-2 text-xs text-foreground/70">
          <input
            type="checkbox"
            className="mt-0.5 accent-[var(--brand)]"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            I am at least 18 hedge-years old and I agree to the{" "}
            <a href="#" className="font-semibold text-[var(--brand)] hover:underline">
              Terms of Snervice
            </a>
            .
          </span>
        </label>
        <button
          type="submit"
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

      <div className="mt-4 rounded-lg border border-[var(--brand)]/20 bg-[var(--brand)]/5 px-4 py-3 text-center text-xs text-foreground/60">
        🌰 You&apos;ll get <strong className="text-foreground">100 free acorns</strong> to
        subscribe to your first creators!
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-black/10 bg-[var(--surface)] px-3 py-2 text-sm shadow-sm placeholder:text-foreground/40 focus:border-[var(--brand)] focus:outline-none dark:border-white/15"
      />
    </label>
  );
}
