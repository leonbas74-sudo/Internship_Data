# FL-07 Build Log — Build the Agent

**Assignment:** FL-07 — Build the Agent
**Project:** ai-streaming-chat (Website Analyzer Agent)
**Track:** General AI Fluency, Week 5

## Goal
Get one complete, reliable end-to-end run of the agent's core job, using at least one real live tool.

## Core job (inferred from existing implementation)
No separate FL-06 spec file existed in the project, so the core job was inferred from the existing system prompt and tool: **the agent analyzes a website URL the user provides and reports back its title and description**, fetched live from the real page — not a generic chatbot.

## Initial project state
- Next.js 16 app using the Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/google`).
- Streaming chat UI in `app/page.tsx` using `useChat` + `DefaultChatTransport`.
- API route at `app/api/chat/route.ts`, already wired to call `streamText` with a system prompt and a tool.
- A real tool already implemented: `lib/ai/tools/fetch-website-meta.ts` — does a live `fetch()` of a given URL and regex-parses the `<title>` and meta description out of the HTML. This is a genuine live data connection, not mock data.
- `.env.local` already contained `GOOGLE_GENERATIVE_AI_API_KEY`.

## What was already working
- Frontend renders, sends POST requests to `/api/chat`, streams responses.
- Route correctly registered — earlier "404" investigation confirmed the route exists and only rejects direct browser GET requests with 405 (expected, since the route only implements `POST`). No actual 404 bug existed.
- Tool wiring in the route (`tools: { fetchWebsiteMeta }`) and system prompt instructing the model when to call it were already in place.

## What was missing / broken
- **Root cause bug found during inspection:** `lib/ai/model.ts` requested the model string `"gemini-3.5-flash"`, which does not exist. The file's own comment said `gemini-2.5-flash`, but the code didn't match. This meant every chat request would fail once it hit the model, breaking the "core job end to end" requirement.
- No build log or submission materials existed yet.

## Fix
Changed `lib/ai/model.ts`:
```
- export const model = google("gemini-3.5-flash");
+ export const model = google("gemini-2.5-flash");
```

## Testing performed
- Ran `npm install`, started `next dev`, confirmed the server boots and `/` returns HTTP 200.
- Sent a real POST to `/api/chat` with the message "Analyze https://example.com".
- Confirmed the request now correctly reaches Google's Gemini streaming endpoint with a valid, well-formed payload (model name resolved, system prompt attached, tool schema attached) — verified via server logs.
- In this development sandbox, outbound requests to `generativelanguage.googleapis.com` are blocked by the sandbox's own network allowlist (unrelated to the app), so a full live model response could not be captured here. This is a sandbox limitation, not an app bug — the request payload and routing were confirmed correct up to that point.
- **You must run the final end-to-end test yourself** on your own machine (instructions in `FL-07-SUBMISSION.md`), since your machine has normal internet access.

## Deviations from original scope
- No formal FL-06 spec file was found in the repo, so the core job was inferred rather than confirmed against a document. If a written FL-06 spec exists elsewhere, note that in your submission as the deviation: "core job inferred from existing implementation."
- No new tool was added — the existing `fetchWebsiteMeta` tool already satisfies FL-07's live tool/data connection requirement, so nothing was duplicated per your instructions to reuse existing work.

## What was cut / not done
- No deployment was performed (per your instructions, to avoid unnecessary credit/time use). The app currently only runs on localhost.
- No additional tools, UI changes, or animations were added.

## Limitations
- Metadata parsing uses regex on raw HTML rather than a proper HTML parser, so it may miss titles/descriptions on pages with unusual markup (e.g., client-rendered SPAs). Acceptable for the assignment's scope.

## Final status
**Core bug fixed. Flow is end-to-end correct in code.** Final live confirmation must be done by you locally (see submission doc) since this sandbox cannot reach Google's API.
