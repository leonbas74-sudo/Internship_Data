import { z } from "zod";

export const fetchWebsiteMeta = {
  description:
    "Fetch the title and description metadata from a public website URL.",

  inputSchema: z.object({
    url: z
      .string()
      .url()
      .describe("The complete public website URL to analyze."),
  }),

  execute: async ({ url }: { url: string }) => {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });

      if (!response.ok) {
        throw new Error(`Website returned status ${response.status}`);
      }

      const html = await response.text();

      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);

      const descriptionMatch = html.match(
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
      );

      const title = titleMatch?.[1]?.trim() || "No title found";

      const description =
        descriptionMatch?.[1]?.trim() || "No description found";

      return {
        success: true,
        url,
        title,
        description,
      };
    } catch (error) {
      return {
        success: false,
        url,
        title: null,
        description: null,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch website metadata.",
      };
    }
  },
};