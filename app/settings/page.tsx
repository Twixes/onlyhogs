import type { Metadata } from "next";
import SettingsContent from "./SettingsContent";

export const metadata: Metadata = {
  title: "Settings — OnlyHogs",
};

export default function SettingsPage() {
  return <SettingsContent />;
}
