import Link from "next/link";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { Heading } from "@/components/shared/Heading";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <PageWrapper>
      <Heading level={1}>404</Heading>
      <EmptyState
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        action={
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:underline"
          >
            Return home
          </Link>
        }
      />
    </PageWrapper>
  );
}
