type ClassValue = string | number | boolean | null | undefined;

/**
 * Merges class names, filtering out falsy values.
 * Kept dependency-free for a minimal foundation footprint.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats an ISO timestamp into a readable string.
 */
export function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(date);
}
