"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../lib/auth";

export function SubscribeButton({
  hogUsername,
  hogDisplayName,
  price,
}: {
  hogUsername: string;
  hogDisplayName: string;
  price: number;
}) {
  const { user, isLoaded, subscribe, unsubscribe, isSubscribedTo } = useAuth();
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const subscribed = isSubscribedTo(hogUsername);
  const cost = Math.ceil(price);

  if (!isLoaded) {
    return (
      <div className="sm:text-right">
        <div className="h-20 w-36 animate-pulse rounded-xl bg-foreground/10" />
      </div>
    );
  }

  function handleSubscribe() {
    try {
      const result = subscribe(hogUsername, price);
      if (result.success) {
        setMessage({ text: `Subscribed to ${hogDisplayName}!`, isError: false });
      } else {
        setMessage({ text: result.error!, isError: true });
      }
    } catch (err) {
      setMessage({ text: String((err as Error).message || err), isError: true });
    }
  }

  function handleUnsubscribe() {
    unsubscribe(hogUsername);
    setMessage({ text: "Unsubscribed.", isError: false });
  }

  return (
    <div className="sm:text-right">
      <div className="font-mono text-xs uppercase tracking-wider text-foreground/50">
        Subscribe
      </div>
      <div className="font-mono text-2xl font-extrabold">
        {cost}
        <span className="ml-0.5 text-sm font-semibold text-foreground/60">🌰/mo</span>
      </div>

      {!user ? (
        <Link
          href="/login"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-[var(--brand-ink)] shadow-sm hover:opacity-95"
        >
          Log in to subscribe
        </Link>
      ) : subscribed ? (
        <button
          type="button"
          onClick={handleUnsubscribe}
          className="mt-2 inline-flex items-center justify-center rounded-full border border-foreground/20 px-5 py-2 text-sm font-semibold text-foreground/70 hover:border-red-400 hover:text-red-500"
        >
          Unsubscribe
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSubscribe}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-[var(--brand-ink)] shadow-sm hover:opacity-95"
        >
          Subscribe now
        </button>
      )}

      {message && (
        <p
          className={`mt-2 text-xs font-medium ${
            message.isError ? "text-red-500" : "text-green-600 dark:text-green-400"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
