import type { Metadata } from "next";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { Section } from "@/components/shared/Section";
import { Heading } from "@/components/shared/Heading";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "New Task" };

/**
 * Layout demonstration only — no submission logic is wired up yet.
 */
export default function NewTaskPage() {
  return (
    <PageWrapper>
      <Section>
        <Heading level={1}>New Task</Heading>
        <p className="max-w-2xl text-muted-foreground">
          Form layout placeholder for creating a task. Not yet connected to
          any data or submission logic.
        </p>
      </Section>
      <Card>
        <CardContent className="flex flex-col gap-4 pt-5 sm:pt-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-title" className="text-sm font-medium">
              Title
            </label>
            <input
              id="task-title"
              name="title"
              type="text"
              disabled
              placeholder="Task title"
              className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground disabled:opacity-60"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="task-description"
              name="description"
              disabled
              rows={4}
              placeholder="Add more detail"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground disabled:opacity-60"
            />
          </div>
          <div>
            <Button disabled type="button">
              Create task
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
