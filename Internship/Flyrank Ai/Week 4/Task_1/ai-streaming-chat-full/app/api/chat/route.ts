import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";

import { model } from "@/lib/ai/model";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { fetchWebsiteMeta } from "@/lib/ai/tools/fetch-website-meta";

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
    },
  });

  return result.toUIMessageStreamResponse({
    onError: (error) => {
      console.error("Chat stream error:", error);

      return "Something went wrong while generating a response. Please try again.";
    },
  });
}
