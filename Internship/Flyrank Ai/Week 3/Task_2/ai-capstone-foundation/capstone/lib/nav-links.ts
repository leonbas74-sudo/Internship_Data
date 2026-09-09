export interface NavLink {
  href: string;
  label: string;
}

/**
 * Single source of truth for primary navigation.
 * Both the desktop and mobile nav read from this list.
 */
export const NAV_LINKS: NavLink[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/analytics", label: "Analytics" },
  { href: "/calendar", label: "Calendar" },
  { href: "/assistant", label: "Assistant" },
  { href: "/settings", label: "Settings" },
  { href: "/profile", label: "Profile" },
  { href: "/health", label: "Health" },
];
