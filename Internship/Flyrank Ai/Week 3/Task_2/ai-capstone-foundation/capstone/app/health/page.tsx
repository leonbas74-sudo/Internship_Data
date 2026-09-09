import type { Metadata } from "next";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { Section } from "@/components/shared/Section";
import { Heading } from "@/components/shared/Heading";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ErrorState } from "@/components/ui/ErrorState";
import { formatTimestamp } from "@/lib/utils";
import type { HealthCheckResponse } from "@/types";

export const metadata: Metadata = { title: "Health Check" };

// Always fetch fresh data so this page proves server-side rendering
// on every request rather than serving a cached build-time result.
export const dynamic = "force-dynamic";

async function getHealthCheckData(): Promise<HealthCheckResponse> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos/1",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export default async function HealthPage() {
  const requestedAt = new Date();

  let data: HealthCheckResponse | null = null;
  let error: string | null = null;

  try {
    data = await getHealthCheckData();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error occurred.";
  }

  return (
    <PageWrapper>
      <Section>
        <div className="flex flex-wrap items-center gap-3">
          <Heading level={1}>Health Check</Heading>
          {error ? (
            <Badge variant="danger">Connection failed</Badge>
          ) : (
            <Badge variant="success">Connection successful</Badge>
          )}
        </div>
        <p className="max-w-2xl text-muted-foreground">
          This page is rendered on the server for every request and confirms
          connectivity to an external API.
        </p>
      </Section>

      <Card>
        <CardHeader>
          <CardTitle>Server-side rendering confirmation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Rendered at
              </dt>
              <dd className="font-mono text-sm">
                {formatTimestamp(requestedAt)}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Endpoint
              </dt>
              <dd className="break-all font-mono text-sm">
                https://jsonplaceholder.typicode.com/todos/1
              </dd>
            </div>
          </dl>

          {error ? (
            <ErrorState
              title="Unable to reach the API"
              description={error}
            />
          ) : (
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                JSON response
              </p>
              <pre className="overflow-x-auto rounded-md bg-muted p-4 text-xs">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
