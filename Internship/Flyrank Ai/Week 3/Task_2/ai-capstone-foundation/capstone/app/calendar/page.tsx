import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Calendar" };

export default function CalendarPage() {
  return (
    <PlaceholderPage
      title="Calendar"
      description="Scheduling and calendar views will live here."
    />
  );
}
