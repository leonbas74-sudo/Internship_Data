import { PageWrapper } from "@/components/shared/PageWrapper";
import { Section } from "@/components/shared/Section";
import { Heading } from "@/components/shared/Heading";
import { Card, CardContent } from "@/components/ui/Card";

export interface PlaceholderPageProps {
  title: string;
  description: string;
}

/**
 * Standard shape for foundation-phase placeholder pages:
 * title, short description, and a card container. No business logic.
 */
export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <PageWrapper>
      <Section>
        <Heading level={1}>{title}</Heading>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      </Section>
      <Card>
        <CardContent className="pt-5 sm:pt-6">
          <p className="text-sm text-muted-foreground">
            This section is scaffolded for Phase 2 feature work. No
            application logic has been implemented yet.
          </p>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
