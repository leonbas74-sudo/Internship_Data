import Link from "next/link";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { Section } from "@/components/shared/Section";
import { Heading } from "@/components/shared/Heading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { NAV_LINKS } from "@/lib/nav-links";

export default function HomePage() {
  return (
    <PageWrapper>
      <Section>
        <Heading level={1}>AI Capstone — Foundation</Heading>
        <p className="max-w-2xl text-muted-foreground">
          This is Phase 1 of the AI Capstone project: a production-ready
          skeleton with routing, layout, design tokens, and shared
          components already in place. Feature work happens in Phase 2.
        </p>
        <div>
          <Link
            href="/health"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            View health check
          </Link>
        </div>
      </Section>

      <Section>
        <Heading level={2}>Sections</Heading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NAV_LINKS.map((link) => (
            <Card key={link.href}>
              <CardHeader>
                <CardTitle>{link.label}</CardTitle>
                <CardDescription>Placeholder route</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Go to {link.label.toLowerCase()} →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </PageWrapper>
  );
}
