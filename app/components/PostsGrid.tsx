"use client";

import { useAuth } from "../lib/auth";
import { getPostsForHog, type Post } from "../lib/posts";
import { LockedTile } from "./LockedTile";
import { PostCard } from "./PostCard";

export function PostsGrid({
  hogUsername,
  hogDisplayName,
  totalPosts,
}: {
  hogUsername: string;
  hogDisplayName: string;
  totalPosts: number;
}) {
  const { isSubscribedTo, isLoaded } = useAuth();
  const subscribed = isSubscribedTo(hogUsername);
  const posts = getPostsForHog(hogUsername);

  if (!isLoaded) {
    return (
      <section className="mt-10">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-foreground/10" />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-2xl bg-foreground/10" />
          ))}
        </div>
      </section>
    );
  }

  if (subscribed && posts.length > 0) {
    const freePosts = posts.filter((p) => !p.isExclusive);
    const exclusivePosts = posts.filter((p) => p.isExclusive);

    return (
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              {hogDisplayName}&apos;s posts
            </h2>
            <p className="mt-1 text-sm text-foreground/60">
              You&apos;re subscribed — enjoy all {posts.length} posts.
            </p>
          </div>
          <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400">
            Subscribed
          </span>
        </div>

        {exclusivePosts.length > 0 && (
          <>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground/50">
              Exclusive content
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {exclusivePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}

        {freePosts.length > 0 && (
          <>
            <h3 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wider text-foreground/50">
              Free posts
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {freePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </section>
    );
  }

  // Not subscribed — show locked tiles + any free posts
  const freePosts = posts.filter((p) => !p.isExclusive);

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Exclusive posts
          </h2>
          <p className="mt-1 text-sm text-foreground/60">
            Subscribe to unlock {totalPosts} posts from {hogDisplayName}.
          </p>
        </div>
        <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-foreground/70 dark:bg-white/10">
          {totalPosts} posts
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <LockedTile
            key={i}
            seed={`${hogUsername}-${i}`}
            aspect={i % 3 === 0 ? "tall" : "square"}
            label={i === 0 ? "NEW today" : "Subscribers only"}
          />
        ))}
      </div>

      {freePosts.length > 0 && (
        <>
          <h3 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wider text-foreground/50">
            Free preview
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {freePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
