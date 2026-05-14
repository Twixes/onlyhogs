"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "../lib/auth";
import { getHog } from "../lib/hogs";
import { HogAvatar } from "../components/HogAvatar";

const ACORN_PACKAGES = [
  { amount: 10, name: "A Light Snack", emoji: "🌰" },
  { amount: 25, name: "Hedgehog Handful", emoji: "🌰🌰" },
  { amount: 50, name: "Bucket of Goodness", emoji: "🪣" },
  { amount: 100, name: "The Full Hoard", emoji: "🐿️" },
  { amount: 500, name: "Dragon's Stash", emoji: "🐉" },
];

export default function SettingsContent() {
  const { user, isLoaded, updateProfile, addAcorns, unsubscribe, logout } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [nameInitialized, setNameInitialized] = useState(false);
  const [saved, setSaved] = useState(false);
  const [purchasedPackage, setPurchasedPackage] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Initialize display name from user when loaded
  if (isLoaded && user && !nameInitialized) {
    setDisplayName(user.displayName);
    setNameInitialized(true);
  }

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-foreground/10" />
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-foreground/10" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center sm:px-6">
        <span className="text-5xl">⚙️</span>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight">
          Log in to access settings
        </h1>
        <Link
          href="/login"
          className="mt-6 rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-ink)] shadow-sm hover:opacity-95"
        >
          Log in
        </Link>
      </div>
    );
  }

  function handleSaveProfile(e: FormEvent) {
    e.preventDefault();
    updateProfile({ displayName: displayName.trim() || user!.username });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleBuyAcorns(pkg: (typeof ACORN_PACKAGES)[number]) {
    addAcorns(pkg.amount);
    setPurchasedPackage(pkg.name);
    setTimeout(() => setPurchasedPackage(null), 2000);
  }

  function handleDeleteAccount() {
    // Clear all user data from localStorage
    localStorage.removeItem(`onlyhogs_data_${user!.username}`);
    const accounts = JSON.parse(localStorage.getItem("onlyhogs_accounts") || "{}");
    delete accounts[user!.username];
    localStorage.setItem("onlyhogs_accounts", JSON.stringify(accounts));
    logout();
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        Settings
      </h1>
      <p className="mt-1 text-sm text-foreground/60">
        Manage your hedge. Your rules.
      </p>

      {/* Profile section */}
      <section className="mt-8 rounded-2xl border border-black/5 bg-[var(--surface)] p-5 dark:border-white/10">
        <h2 className="text-lg font-bold">Profile</h2>
        <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
              Display name
            </span>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-lg border border-black/10 bg-[var(--surface)] px-3 py-2 text-sm shadow-sm focus:border-[var(--brand)] focus:outline-none dark:border-white/15"
            />
          </label>
          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
              Username
            </span>
            <div className="rounded-lg border border-black/5 bg-[var(--surface-muted)] px-3 py-2 text-sm text-foreground/60 dark:border-white/5">
              @{user.username}
              <span className="ml-2 text-xs">(can&apos;t be changed — it&apos;s who you are)</span>
            </div>
          </div>
          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
              Email
            </span>
            <div className="rounded-lg border border-black/5 bg-[var(--surface-muted)] px-3 py-2 text-sm text-foreground/60 dark:border-white/5">
              {user.email}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-[var(--brand-ink)] shadow-sm hover:opacity-95"
            >
              Save changes
            </button>
            {saved && (
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Saved!
              </span>
            )}
          </div>
        </form>
      </section>

      {/* Acorn balance */}
      <section className="mt-6 rounded-2xl border border-black/5 bg-[var(--surface)] p-5 dark:border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Acorn Balance</h2>
          <div className="flex items-center gap-2 rounded-full bg-[var(--brand)]/10 px-4 py-2">
            <span>🌰</span>
            <span className="font-mono text-xl font-extrabold text-[var(--brand)]">
              {user.acorns}
            </span>
          </div>
        </div>
        <p className="mt-2 text-sm text-foreground/60">
          Acorns are how you subscribe to your favourite hogs. Top up anytime — it&apos;s free because this is a fake app and money isn&apos;t real here.
        </p>

        {purchasedPackage && (
          <div className="mt-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
            &quot;{purchasedPackage}&quot; added to your balance!
          </div>
        )}

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {ACORN_PACKAGES.map((pkg) => (
            <button
              key={pkg.name}
              type="button"
              onClick={() => handleBuyAcorns(pkg)}
              className="flex items-center gap-3 rounded-xl border border-black/5 bg-[var(--surface-muted)] p-3 text-left transition hover:border-[var(--brand)] dark:border-white/10"
            >
              <span className="text-2xl">{pkg.emoji}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold">{pkg.name}</div>
                <div className="text-xs text-foreground/60">{pkg.amount} acorns</div>
              </div>
              <span className="rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-semibold text-[var(--brand-ink)]">
                Free
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Active subscriptions */}
      <section className="mt-6 rounded-2xl border border-black/5 bg-[var(--surface)] p-5 dark:border-white/10">
        <h2 className="text-lg font-bold">Active subscriptions</h2>
        {user.subscribedTo.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-black/10 p-6 text-center dark:border-white/10">
            <p className="text-sm text-foreground/60">
              No active subscriptions yet.
            </p>
            <Link
              href="/browse"
              className="mt-3 inline-flex items-center rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-[var(--brand-ink)] hover:opacity-95"
            >
              Browse hogs
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {user.subscribedTo.map((username) => {
              const hog = getHog(username);
              if (!hog) return null;
              return (
                <div
                  key={username}
                  className="flex items-center gap-3 rounded-xl border border-black/5 bg-[var(--surface-muted)] p-3 dark:border-white/10"
                >
                  <HogAvatar username={username} imageSrc={hog.imageSrc} size={40} />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/hog/${username}`}
                      className="text-sm font-semibold hover:text-[var(--brand)]"
                    >
                      {hog.displayName}
                    </Link>
                    <div className="text-xs text-foreground/60">
                      {Math.ceil(hog.pricePerMonth)} 🌰/mo
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => unsubscribe(username)}
                    className="rounded-full border border-foreground/20 px-3 py-1.5 text-xs font-medium text-foreground/60 hover:border-red-400 hover:text-red-500"
                  >
                    Unsubscribe
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Danger zone */}
      <section className="mt-6 rounded-2xl border border-red-200 bg-red-50/50 p-5 dark:border-red-900 dark:bg-red-950/20">
        <h2 className="text-lg font-bold text-red-700 dark:text-red-400">
          Danger zone
        </h2>
        <p className="mt-1 text-sm text-red-600/70 dark:text-red-400/70">
          These actions cannot be undone. Proceed with caution, little hog.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
          >
            Log out
          </button>
          {showDeleteConfirm ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-red-600 dark:text-red-400">Are you sure?</span>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Yes, delete everything
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium dark:border-white/15"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Delete account
            </button>
          )}
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-foreground/40">
        Member since {new Date(user.joinedAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}.
        Thank you for being a hog supporter.
      </p>
    </div>
  );
}
