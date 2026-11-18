import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/rankmesh/config.server";

/**
 * AI crawler policy. AI search/answer crawlers (GPTBot, OAI-SearchBot,
 * ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, ...) are allowed
 * via the "*" group. Training-only crawlers are also allowed until the client
 * decides otherwise: set BLOCK_TRAINING_ONLY_CRAWLERS to true to disallow them.
 */
const BLOCK_TRAINING_ONLY_CRAWLERS = false;
const TRAINING_ONLY_CRAWLERS = ["CCBot", "Bytespider"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...(BLOCK_TRAINING_ONLY_CRAWLERS ? TRAINING_ONLY_CRAWLERS.map((userAgent) => ({ userAgent, disallow: "/" })) : []),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
