"use client";

import Link from "next/link";
import { useAuth } from "../lib/auth";
import { getHog, hogs } from "../lib/hogs";
import { getPostsForHog } from "../lib/posts";
import { HogAvatar } from "../components/HogAvatar";
import { PostCard } from "../components/PostCard";

export default function FeedContent() {
  const { user, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-foreground/10" />
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-foreground/10" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center sm:px-6">
        <span className="text-5xl">🦔</span>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight">
          Log in to see your feed
        </h1>
        <p className="mt-2 text-sm text-foreground/60">
          Subscribe to hogs and their latest posts will appear here.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/login"
            className="rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-ink)] shadow-sm hover:opacity-95"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold hover:border-[var(--brand)] dark:border-white/15"
          >
            Sign up
          </Link>
        </div>
      </div>
    );
  }

  // Gather posts from subscribed creators
  const feedPosts = user.subscribedTo
    .flatMap((username) => {
      const hog = getHog(username);
      if (!hog) return [];
      return getPostsForHog(username).map((post) => ({ post, hog }));
    })
    .sort((a, b) => b.post.date.localeCompare(a.post.date));

  const suggestedHogs = hogs
    .filter((h) => !user.subscribedTo.includes(h.username))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Welcome header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Your feed
          </h1>
          <p className="mt-1 text-sm text-foreground/60">
            Welcome back, @{user.username}. You have{" "}
            <span className="font-semibold text-foreground">🌰 {user.acorns}</span>{" "}
            acorns.
          </p>
        </div>
        <Link
          href="/settings"
          className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:border-[var(--brand)] dark:border-white/15"
        >
          Settings
        </Link>
      </div>

      {/* Subscribed count */}
      {user.subscribedTo.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {user.subscribedTo.map((username) => {
            const hog = getHog(username);
            if (!hog) return null;
            return (
              <Link
                key={username}
                href={`/hog/${username}`}
                className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-[var(--surface)] px-3 py-1.5 text-xs font-medium hover:border-[var(--brand)] dark:border-white/10"
              >
                <HogAvatar username={username} imageSrc={hog.imageSrc} size={20} />
                @{username}
              </Link>
            );
          })}
        </div>
      )}

      {/* Feed posts */}
      {feedPosts.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {feedPosts.map(({ post, hog }) => (
            <div key={post.id}>
              <Link
                href={`/hog/${hog.username}`}
                className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-foreground/80 hover:text-[var(--brand)]"
              >
                <HogAvatar username={hog.username} imageSrc={hog.imageSrc} size={24} />
                {hog.displayName}
                <span className="font-normal text-foreground/50">@{hog.username}</span>
              </Link>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-black/10 bg-[var(--surface-muted)] p-8 text-center dark:border-white/10">
          <span className="text-4xl">🌰</span>
          <h2 className="mt-3 text-lg font-bold">Your feed is empty</h2>
          <p className="mt-1 text-sm text-foreground/60">
            Subscribe to some hogs and their posts will show up here.
          </p>
          <Link
            href="/browse"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-ink)] shadow-sm hover:opacity-95"
          >
            Browse hogs
          </Link>
        </div>
      )}

      {/* Suggestions */}
      {suggestedHogs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold tracking-tight">Hogs you might like</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {suggestedHogs.map((hog) => (
              <Link
                key={hog.username}
                href={`/hog/${hog.username}`}
                className="flex items-center gap-3 rounded-2xl border border-black/5 bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10"
              >
                <HogAvatar username={hog.username} imageSrc={hog.imageSrc} size={48} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{hog.displayName}</div>
                  <div className="truncate text-xs text-foreground/60">{hog.tagline}</div>
                </div>
                <span className="shrink-0 font-mono text-xs font-bold text-[var(--brand)]">
                  {Math.ceil(hog.pricePerMonth)} 🌰
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
