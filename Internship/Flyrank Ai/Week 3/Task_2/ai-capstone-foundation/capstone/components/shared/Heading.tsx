import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
}

const levelStyles: Record<HeadingLevel, string> = {
  1: "text-3xl sm:text-4xl font-bold tracking-tight",
  2: "text-2xl sm:text-3xl font-semibold tracking-tight",
  3: "text-xl sm:text-2xl font-semibold",
  4: "text-lg font-semibold",
};

/**
 * Renders the correct semantic heading tag while keeping visual
 * size configurable independently, preserving document heading order.
 */
export function Heading({
  level = 1,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag className={cn(levelStyles[level], className)} {...props}>
      {children}
    </Tag>
  );
}
