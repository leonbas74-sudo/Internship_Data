export type Variant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "muted";

export interface HealthCheckResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
