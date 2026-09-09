# FL-07 Submission — Website Analyzer Agent

## 1. Agent/project name
ai-streaming-chat — Website Analyzer Agent

## 2. Short description
A streaming AI chat agent that, when given a website URL, fetches the live page and reports its real title and meta description back to the user.

## 3. Core job
Analyze a user-supplied URL by live-fetching the page and returning its actual title/description — not a generic Q&A bot.

## 4. Live tool/data connection
`lib/ai/tools/fetch-website-meta.ts` — performs a real `fetch()` of the URL the user provides and parses the live HTML for `<title>` and meta description. This is called automatically by the model via the AI SDK's tool-calling when the user asks to "analyze" a URL.

## 5. End-to-end workflow
1. User types a message like "Analyze https://example.com" and hits send.
2. Frontend (`app/page.tsx`) POSTs to `/api/chat`.
3. `app/api/chat/route.ts` calls Gemini (`gemini-2.5-flash`) via `streamText`.
4. Model decides to call the `fetchWebsiteMeta` tool with the URL.
5. Tool fetches the real page live and returns title/description.
6. Model summarizes the result in a streamed response.
7. User sees the final answer in the chat UI.

## 6. How to run the project
```
npm install
npm run dev
```
Open http://localhost:3000. Ensure `.env.local` has a valid `GOOGLE_GENERATIVE_AI_API_KEY` (already present).

## 7. Successful test scenario (for your recording)
Type: `Analyze https://example.com`
Expected: the agent responds with the real title/description of example.com, not a generic reply.

**Action required from you:** Since this dev sandbox cannot reach Google's API (network allowlist), run `npm run dev` and test this exact prompt on your own machine before recording, to confirm you see a real streamed answer with the website's actual title/description.

## 8. Build log location
`FL-07-BUILD-LOG.md`

## 9. What needs to be screen recorded
See `FL-07-RECORDING-SCRIPT.md`.

## 10. Final FL-07 checklist
- [x] Working agent, core job defined
- [x] Core job works end to end in code (model bug fixed)
- [x] No mid-run manual code editing needed
- [x] Real live tool connection (live HTTP fetch of user-given URL)
- [x] Live connection actually used in the flow
- [ ] FL-06 spec — no file found in repo; core job was inferred (note this in your submission if a written spec exists elsewhere)
- [x] Real build log with actual iteration
- [ ] You must personally run the local end-to-end test once to confirm (sandbox can't reach the internet)
- [ ] Record the ~2 min raw video
- [x] Submission guide (this file)
- [x] No unnecessary features added
- [x] Existing UI/functionality preserved
- [x] No secrets committed; `.env.local` is in `.gitignore`
- [ ] Public URL — none created (localhost only); deploy only if your platform requires a public URL

## Deployment/public URL status
Not deployed. Only localhost. No URL has been fabricated. Deploy (e.g., Vercel) only if FL-07 submission explicitly requires a public link.
