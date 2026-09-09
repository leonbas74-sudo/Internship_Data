import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Tasks" };

export default function TasksPage() {
  return (
    <PlaceholderPage
      title="Tasks"
      description="Your task list and tracking tools will live here."
    />
  );
}
