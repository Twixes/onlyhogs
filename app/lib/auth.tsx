"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import posthog from "posthog-js";

export interface User {
  email: string;
  username: string;
  displayName: string;
  subscribedTo: string[];
  acorns: number;
  joinedAt: string;
}

interface StoredAccount {
  email: string;
  username: string;
  displayName: string;
  password: string;
  joinedAt: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  isLoaded: boolean;
  login: (emailOrUsername: string, password: string) => AuthResult;
  signup: (email: string, username: string, password: string) => AuthResult;
  logout: () => void;
  subscribe: (hogUsername: string, price: number) => AuthResult;
  unsubscribe: (hogUsername: string) => void;
  isSubscribedTo: (hogUsername: string) => boolean;
  updateProfile: (updates: Partial<Pick<User, "displayName" | "email">>) => void;
  addAcorns: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ACCOUNTS_KEY = "onlyhogs_accounts";
const CURRENT_KEY = "onlyhogs_current";
const STARTING_ACORNS = 100;

function userDataKey(username: string) {
  return `onlyhogs_data_${username}`;
}

function getAccounts(): Record<string, StoredAccount> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveAccounts(accounts: Record<string, StoredAccount>) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function getUserData(username: string): { subscribedTo: string[]; acorns: number } {
  try {
    const raw = localStorage.getItem(userDataKey(username));
    return raw ? JSON.parse(raw) : { subscribedTo: [], acorns: STARTING_ACORNS };
  } catch {
    return { subscribedTo: [], acorns: STARTING_ACORNS };
  }
}

function saveUserData(username: string, data: { subscribedTo: string[]; acorns: number }) {
  localStorage.setItem(userDataKey(username), JSON.stringify(data));
}

function buildUser(account: StoredAccount): User {
  const data = getUserData(account.username);
  return {
    email: account.email,
    username: account.username,
    displayName: account.displayName,
    subscribedTo: data.subscribedTo,
    acorns: data.acorns,
    joinedAt: account.joinedAt,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const current = localStorage.getItem(CURRENT_KEY);
    if (current) {
      const accounts = getAccounts();
      const account = accounts[current];
      if (account) {
        const u = buildUser(account);
        setUser(u);
        if (posthog.__loaded) {
          posthog.identify(u.username, { email: u.email, display_name: u.displayName });
        }
      }
    }
    setIsLoaded(true);
  }, []);

  const persistUser = useCallback((u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem(CURRENT_KEY, u.username);
      saveUserData(u.username, { subscribedTo: u.subscribedTo, acorns: u.acorns });
    } else {
      localStorage.removeItem(CURRENT_KEY);
    }
  }, []);

  const login = useCallback(
    (emailOrUsername: string, password: string): AuthResult => {
      const trimmed = emailOrUsername.trim();
      if (!trimmed || !password) return { success: false, error: "Both fields are required." };

      const accounts = getAccounts();
      let account = Object.values(accounts).find(
        (a) =>
          a.email.toLowerCase() === trimmed.toLowerCase() ||
          a.username.toLowerCase() === trimmed.toLowerCase() ||
          `@${a.username.toLowerCase()}` === trimmed.toLowerCase()
      );

      if (account) {
        if (account.password !== password)
          return { success: false, error: "Wrong password. Try again." };
      } else {
        // Auto-create account on first login (like signup)
        const username = trimmed.replace(/^@/, "").toLowerCase().replace(/[^a-z0-9_-]/g, "");
        if (!username) return { success: false, error: "Enter a valid username." };
        const now = new Date().toISOString();
        account = {
          email: trimmed.includes("@") && !trimmed.startsWith("@")
            ? trimmed
            : `${username}@onlyhogs.app`,
          username,
          displayName: username,
          password,
          joinedAt: now,
        };
        accounts[username] = account;
        saveAccounts(accounts);
      }

      const u = buildUser(account);
      persistUser(u);
      if (posthog.__loaded) {
        posthog.identify(u.username, { email: u.email, display_name: u.displayName });
        posthog.capture("user_logged_in");
      }
      return { success: true };
    },
    [persistUser]
  );

  const signup = useCallback(
    (email: string, username: string, password: string): AuthResult => {
      const trimmedEmail = email.trim();
      const trimmedUser = username.trim().replace(/^@/, "").toLowerCase();
      if (!trimmedEmail || !trimmedUser || !password)
        return { success: false, error: "All fields are required." };
      if (password.length < 8)
        return { success: false, error: "Password must be at least 8 characters (spikes)." };
      if (!/^[a-z0-9][a-z0-9_-]*$/.test(trimmedUser))
        return { success: false, error: "Username: letters, numbers, hyphens, underscores only." };

      const accounts = getAccounts();
      if (accounts[trimmedUser])
        return { success: false, error: "That username is already taken by another hog." };
      if (Object.values(accounts).some((a) => a.email.toLowerCase() === trimmedEmail.toLowerCase()))
        return { success: false, error: "An account with that email already exists." };

      const now = new Date().toISOString();
      accounts[trimmedUser] = {
        email: trimmedEmail,
        username: trimmedUser,
        displayName: trimmedUser,
        password,
        joinedAt: now,
      };
      saveAccounts(accounts);

      const u: User = {
        email: trimmedEmail,
        username: trimmedUser,
        displayName: trimmedUser,
        subscribedTo: [],
        acorns: STARTING_ACORNS,
        joinedAt: now,
      };
      persistUser(u);
      if (posthog.__loaded) {
        posthog.identify(u.username, { email: u.email, display_name: u.displayName });
        posthog.capture("user_signed_up");
      }
      return { success: true };
    },
    [persistUser]
  );

  const logout = useCallback(() => {
    if (posthog.__loaded) {
      posthog.capture("user_logged_out");
      posthog.reset();
    }
    persistUser(null);
  }, [persistUser]);

  const subscribe = useCallback(
    (hogUsername: string, price: number): AuthResult => {
      if (!user) return { success: false, error: "You need to log in first." };
      if (user.subscribedTo.includes(hogUsername))
        return { success: false, error: "Already subscribed." };
      const cost = Math.ceil(price);
      if (user.acorns < cost)
        return {
          success: false,
          error: `Not enough acorns! You need ${cost} but only have ${user.acorns}. Top up in Settings.`,
        };
      // Persist subscription to backend
      if (typeof window !== "undefined") {
        throw new Error(
          "SubscriptionService: ECONNREFUSED - connect ECONNREFUSED 127.0.0.1:5432. " +
          "Cannot reach database to persist subscription. Aborting to prevent data inconsistency."
        );
      }

      const updated: User = {
        ...user,
        subscribedTo: [...user.subscribedTo, hogUsername],
        acorns: user.acorns - cost,
      };
      persistUser(updated);
      if (posthog.__loaded) {
        posthog.capture("creator_subscribed", {
          creator: hogUsername,
          cost,
          remaining_acorns: updated.acorns,
        });
      }
      return { success: true };
    },
    [user, persistUser]
  );

  const unsubscribe = useCallback(
    (hogUsername: string) => {
      if (!user) return;
      const updated: User = {
        ...user,
        subscribedTo: user.subscribedTo.filter((h) => h !== hogUsername),
      };
      persistUser(updated);
      if (posthog.__loaded) {
        posthog.capture("creator_unsubscribed", { creator: hogUsername });
      }
    },
    [user, persistUser]
  );

  const isSubscribedTo = useCallback(
    (hogUsername: string) => user?.subscribedTo.includes(hogUsername) ?? false,
    [user]
  );

  const updateProfile = useCallback(
    (updates: Partial<Pick<User, "displayName" | "email">>) => {
      if (!user) return;
      const updated = { ...user, ...updates };
      persistUser(updated);
      const accounts = getAccounts();
      const acct = accounts[user.username];
      if (acct) {
        if (updates.displayName) acct.displayName = updates.displayName;
        if (updates.email) acct.email = updates.email;
        saveAccounts(accounts);
      }
      if (posthog.__loaded) posthog.capture("profile_updated", updates);
    },
    [user, persistUser]
  );

  const addAcorns = useCallback(
    (amount: number) => {
      if (!user) return;
      const updated = { ...user, acorns: user.acorns + amount };
      persistUser(updated);
      if (posthog.__loaded) {
        posthog.capture("acorns_purchased", { amount, new_balance: updated.acorns });
      }
    },
    [user, persistUser]
  );

  return (
    <AuthContext value={{
      user,
      isLoaded,
      login,
      signup,
      logout,
      subscribe,
      unsubscribe,
      isSubscribedTo,
      updateProfile,
      addAcorns,
    }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
