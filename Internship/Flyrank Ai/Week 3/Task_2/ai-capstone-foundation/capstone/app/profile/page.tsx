import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <PlaceholderPage
      title="Profile"
      description="Your personal profile information will live here."
    />
  );
}
