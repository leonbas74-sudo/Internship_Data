import { Container } from "@/components/shared/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="flex flex-col items-center justify-between gap-3 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>&copy; {year} AI Capstone. All rights reserved.</p>
        <p>Built with Next.js 15 &amp; React 19.</p>
      </Container>
    </footer>
  );
}
