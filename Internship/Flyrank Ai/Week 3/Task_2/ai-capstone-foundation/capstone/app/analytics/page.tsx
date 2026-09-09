import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <PlaceholderPage
      title="Analytics"
      description="Charts and reporting will live here."
    />
  );
}
