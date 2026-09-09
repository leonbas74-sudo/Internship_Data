import { tool } from "ai";
import { z } from "zod";

export const fetchWebsiteMeta = tool({
  description:
    "Fetch a public webpage and extract its title, meta description, and readable text content for analysis.",

  inputSchema: z.object({
    url: z
      .string()
      .url()
      .describe("The complete public webpage URL to analyze."),
  }),

  execute: async ({ url }) => {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36",
        },
      });

      if (!response.ok) {
        throw new Error(`Website returned status ${response.status}`);
      }

      const html = await response.text();

      // Extract the page title
      const titleMatch = html.match(
        /<title[^>]*>([\s\S]*?)<\/title>/i
      );

      // Extract the meta description
      const descriptionMatch = html.match(
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
      );

      const title =
        titleMatch?.[1]?.trim() || "No title found";

      const description =
        descriptionMatch?.[1]?.trim() || "No description found";

      // Remove scripts, styles, and HTML tags
      const content = html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 12000);

      return {
        success: true,
        url,
        title,
        description,
        content,
      };
    } catch (error) {
      return {
        success: false,
        url,
        title: null,
        description: null,
        content: null,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch website content.",
      };
    }
  },
});