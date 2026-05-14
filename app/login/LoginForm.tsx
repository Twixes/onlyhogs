"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "../lib/auth";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const result = login(identity, password);
    if (result.success) {
      router.push("/feed");
    } else {
      setError(result.error!);
    }
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-[var(--surface)] p-6 shadow-sm dark:border-white/10">
      <h1 className="text-2xl font-extrabold tracking-tight">Log in</h1>
      <p className="mt-1 text-sm text-foreground/60">
        Welcome back. Your hogs have missed you.
      </p>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Field
          label="Email or @username"
          type="text"
          placeholder="spikeysteve"
          value={identity}
          onChange={setIdentity}
        />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
        />
        <div className="flex items-center justify-between text-xs">
          <label className="inline-flex items-center gap-2 text-foreground/70">
            <input
              type="checkbox"
              className="accent-[var(--brand)]"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember this hedge
          </label>
          <a href="#" className="font-semibold text-[var(--brand)] hover:underline">
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
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
