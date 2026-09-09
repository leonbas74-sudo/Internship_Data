import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { DesktopNavLinks } from "@/components/layout/DesktopNavLinks";
import { MobileNav } from "@/components/layout/MobileNav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur">
      <Container>
        <nav
          aria-label="Primary"
          className="relative flex h-16 items-center justify-between"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold tracking-tight"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground"
            >
              AI
            </span>
            AI Capstone
          </Link>

          <DesktopNavLinks />
          <MobileNav />
        </nav>
      </Container>
    </header>
  );
}
