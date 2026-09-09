"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

/**
 * Client Component: active-route highlighting depends on the current
 * pathname, which is only available via the usePathname hook.
 */
export function DesktopNavLinks() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-1 sm:flex">
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
