import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";

export function PageWrapper({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex-1 py-10 sm:py-12 lg:py-16">
      <Container className={cn("flex flex-col gap-8", className)} {...props}>
        {children}
      </Container>
    </div>
  );
}
