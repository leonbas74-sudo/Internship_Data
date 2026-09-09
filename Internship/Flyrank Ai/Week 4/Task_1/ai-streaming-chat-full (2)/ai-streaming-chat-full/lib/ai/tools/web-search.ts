import { tool } from "ai";
import { z } from "zod";

export const webSearch = tool({
  description:
    "Search the web for relevant information. Use this tool when the user asks a research question, wants recent information, or needs you to find relevant webpages.",

  inputSchema: z.object({
    query: z
      .string()
      .min(1)
      .describe("The search query to use for finding relevant webpages."),
  }),

  execute: async ({ query }) => {
    const apiKey = process.env.TAVILY_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        query,
        results: [],
        error:
          "TAVILY_API_KEY is missing. Add it to .env.local and restart the development server.",
      };
    }

    try {
      const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          query,
          search_depth: "basic",
          max_results: 5,
          include_answer: false,
          include_raw_content: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();

        return {
          success: false,
          query,
          results: [],
          error: `Tavily search failed (${response.status}): ${errorText}`,
        };
      }

      const data = await response.json();

      const results = Array.isArray(data.results)
        ? data.results.slice(0, 5).map((result: any) => ({
            title: result.title ?? "Untitled",
            url: result.url ?? "",
            snippet: result.content ?? "",
          }))
        : [];

      return {
        success: true,
        query,
        results,
      };
    } catch (error) {
      console.error("Web search error:", error);

      return {
        success: false,
        query,
        results: [],
        error:
          error instanceof Error
            ? error.message
            : "An unknown error occurred during web search.",
      };
    }
  },
});