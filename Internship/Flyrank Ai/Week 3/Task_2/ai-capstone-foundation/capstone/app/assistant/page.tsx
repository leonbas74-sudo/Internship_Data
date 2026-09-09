import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Assistant" };

export default function AssistantPage() {
  return (
    <PlaceholderPage
      title="Assistant"
      description="The AI assistant interface will live here."
    />
  );
}
