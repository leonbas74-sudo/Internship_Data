import { google } from "@ai-sdk/google";

/**
 * Central place to configure which Gemini model powers the chat.
 * Imported by the API route so the model is defined in exactly one place.
 *
 * "gemini-2.5-flash" is available on the Google AI Studio free tier and
 * supports streaming out of the box.
 */
export const model = google("gemini-3.5-flash");
