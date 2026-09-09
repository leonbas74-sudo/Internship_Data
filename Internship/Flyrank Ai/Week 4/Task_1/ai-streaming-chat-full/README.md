# Leon.Ai - AI Streaming Chat

A streaming AI chat application built with Next.js, AI SDK, Google Gemini, and Zod.

## FE-07: Tool Results and Structured Output

This project demonstrates a server-side AI tool that fetches website metadata and renders the structured result as a UI component.

## Server-Side Tool

### Tool Name

`fetchWebsiteMeta`

### Purpose

The `fetchWebsiteMeta` tool analyzes a website URL and retrieves basic metadata including:

- Website URL
- Page title
- Page description

The AI automatically uses this tool when the user asks to analyze or inspect website metadata.

## Tool Schema

The tool accepts one required input:

```typescript
{
  url: string;
}