import { cn } from "@/lib/utils";

export interface LoadingSpinnerProps {
  className?: string;
  label?: string;
}

export function LoadingSpinner({
  className,
  label = "Loading",
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <span
        className={cn(
          "h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary"
        )}
      />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
