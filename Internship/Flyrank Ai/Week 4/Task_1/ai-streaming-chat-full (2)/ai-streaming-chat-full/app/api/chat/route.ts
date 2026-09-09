import {
  convertToModelMessages,
  streamText,
  stepCountIs,
  type UIMessage,
} from "ai";

import { model } from "@/lib/ai/model";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { fetchWebsiteMeta } from "@/lib/ai/tools/fetch-website-meta";
import { webSearch } from "@/lib/ai/tools/web-search";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "Server is missing GOOGLE_GENERATIVE_AI_API_KEY. Add it to .env.local and restart the dev server.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  if (!process.env.TAVILY_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "Server is missing TAVILY_API_KEY. Add it to .env.local and restart the dev server.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  let messages: UIMessage[];

  try {
    ({ messages } = await req.json());
  } catch {
    return new Response(
      JSON.stringify({
        error: "Invalid request body.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model,
    instructions: SYSTEM_PROMPT,
    messages: modelMessages,

    tools: {
      fetchWebsiteMeta,
      webSearch,
    },

    // Allows the agent to perform multiple tool calls
    // in one request, such as:
    // webSearch → fetchWebsiteMeta → final answer
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse({
    onError: (error) => {
      console.error("Chat stream error:", error);

      return "Something went wrong while generating a response. Please try again.";
    },
  });
}