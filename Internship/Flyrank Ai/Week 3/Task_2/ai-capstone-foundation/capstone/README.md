# AI Capstone — Phase 1 Foundation

Production-ready application skeleton for the FE-04 capstone assignment. This is **Phase 1 (Foundation) only** — routing, layout, design tokens, shared components, and a health check page. No application/business logic is implemented.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS with CSS-variable-based design tokens
- ESLint (flat config)

## Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # run ESLint
```

## Project Structure

```
app/                  Routes (App Router)
  layout.tsx           Root layout (nav, footer, metadata)
  page.tsx              Home page
  globals.css           Tailwind + design tokens
  health/                Server-rendered health check
  dashboard/ tasks/ analytics/ calendar/
  assistant/ settings/ profile/    Placeholder routes
  not-found.tsx           404 page
components/
  layout/                Navbar, MobileNav, Footer
  ui/                     Button, Card, Badge, LoadingSpinner, EmptyState, ErrorState
  shared/                 Container, PageWrapper, Section, Heading, PlaceholderPage
lib/                    Utilities and nav config
types/                  Shared TypeScript types
```

## Design Tokens

All color, radius, and container tokens are defined as CSS variables in `app/globals.css` and mapped into `tailwind.config.ts`. Dark mode is supported via the `.dark` class and can be wired to a theme toggle in a later phase.

## Health Check

`/health` is a Server Component that fetches `https://jsonplaceholder.typicode.com/todos/1` on every request (`dynamic = "force-dynamic"`), and displays the JSON response, a server-rendered timestamp, and a connection status badge. Fetch failures are caught and rendered with the `ErrorState` component instead of crashing the page.

## Environment Variables

See `.env.example` for the expected variables. Copy it to `.env.local` for local development — `.env.local` is git-ignored and never committed.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, click **New Project** and import the repository.
3. Vercel auto-detects Next.js — no build command changes are needed.
4. Add any environment variables from `.env.example` under **Project Settings → Environment Variables**.
5. Click **Deploy**.

## FE-04 Requirement Checklist

- [x] App Router
- [x] Root Layout
- [x] Placeholder Pages
- [x] Responsive Navigation (desktop + mobile)
- [x] Footer
- [x] Tailwind Configured
- [x] Design Tokens (color, typography, spacing, radius, containers)
- [x] Shared Components (Button, Card, Container, PageWrapper, Section, Heading, Badge, LoadingSpinner, EmptyState, ErrorState)
- [x] Health Check Page (server-rendered, error-handled)
- [x] Responsive at 375 / 768 / 1024 / 1280px
- [x] Accessibility (semantic HTML, skip link, ARIA on mobile nav, visible focus states, heading hierarchy)
- [x] Environment Variables (`.env.example`, `.env.local` git-ignored)
- [x] Production Folder Structure
- [x] Verified: `next build` and `eslint` both pass with zero errors
