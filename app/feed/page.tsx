import type { Metadata } from "next";
import FeedContent from "./FeedContent";

export const metadata: Metadata = {
  title: "Your Feed — OnlyHogs",
};

export default function FeedPage() {
  return <FeedContent />;
}
