"use client";

import Link from "next/link";
import { useAuth } from "../lib/auth";

export function HeaderNav() {
  const { user, isLoaded, logout } = useAuth();

  if (!isLoaded) {
    return (
      <nav className="flex items-center gap-2 sm:gap-4">
        <div className="h-8 w-32 animate-pulse rounded-full bg-foreground/10" />
      </nav>
    );
  }

  if (user) {
    return (
      <nav className="flex items-center gap-1 sm:gap-3">
        <Link
          href="/browse"
          className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground"
        >
          Browse
        </Link>
        <Link
          href="/feed"
          className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground"
        >
          Feed
        </Link>
        <Link
          href="/settings"
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-muted)] px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground"
        >
          <span aria-label="acorns">🌰</span>
          <span className="font-mono text-xs font-bold">{user.acorns}</span>
        </Link>
        <Link
          href="/settings"
          className="rounded-full px-3 py-1.5 text-sm font-semibold text-foreground/80 hover:text-foreground"
        >
          @{user.username}
        </Link>
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium text-foreground/60 hover:border-[var(--brand)] hover:text-[var(--brand)] dark:border-white/15"
        >
          Log out
        </button>
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-2 sm:gap-4">
      <Link
        href="/browse"
        className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground"
      >
        Browse
      </Link>
      <Link
        href="/login"
        className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="rounded-full bg-[var(--brand)] px-4 py-1.5 text-sm font-semibold text-[var(--brand-ink)] shadow-sm transition hover:opacity-95"
      >
        Sign up
      </Link>
    </nav>
  );
}
