import type { Metadata } from "next";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { Section } from "@/components/shared/Section";
import { Heading } from "@/components/shared/Heading";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Task Detail" };

interface TaskDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TaskDetailPage({
  params,
}: TaskDetailPageProps) {
  const { id } = await params;

  return (
    <PageWrapper>
      <Section>
        <div className="flex flex-wrap items-center gap-3">
          <Heading level={1}>Task Detail</Heading>
          <Badge variant="muted">ID: {id}</Badge>
        </div>
        <p className="max-w-2xl text-muted-foreground">
          Detail view placeholder for a single task. Route params are wired
          up; task data is not.
        </p>
      </Section>
      <Card>
        <CardContent className="pt-5 sm:pt-6">
          <p className="text-sm text-muted-foreground">
            No task data has been fetched. This page only demonstrates the
            dynamic route structure.
          </p>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
