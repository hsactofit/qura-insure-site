import "server-only";

/**
 * RankMesh Content integration settings. SERVER-ONLY.
 *
 * The two credentials below are embedded by design (the host cannot set
 * environment variables). They must never be imported from a "use client"
 * module, passed as props, returned from a route, or logged. The
 * `server-only` import above makes the build fail if a client bundle
 * reaches this file.
 */

/** Outbound: client server -> RankMesh (header X-RankMesh-Content-Key). */
export const RANKMESH_CONTENT_KEY =
  "rmc_live_a51bd949b5ac_d76cb8eee8dc162081e5c32cac4eb1562a86731c119278fabca0d9f1ad4d257c";

/** Inbound: RankMesh -> client server (header X-RankMesh-Sync-Token). */
export const RANKMESH_SYNC_TOKEN =
  "spevxP3uUEVsT2b-soLTotWzFlp1TqGLdvO0I8G2zfmFZvTpnQwH-I48Xuyz_Gx5";

export const RANKMESH_POSTS_ENDPOINT =
  "https://rankmeshapi.krickbiz.digital/content/v1/sites/LdNVdZWIwCDfFfnj2gtyJcW8/posts";

export const RANKMESH_LOCALE = "en";

export const RANKMESH_PROJECT_ID = "1ccb3eed-610c-40e3-9a7a-6a546a82bf49";
export const RANKMESH_BEACON_URL = `https://rankmeshapi.krickbiz.digital/projects/${RANKMESH_PROJECT_ID}/analytics/beacon.js`;
export const RANKMESH_BOT_TRACK_URL = "https://rankmeshapi.krickbiz.digital/track/bot";

/** User-agent substrings of AI crawlers reported to RankMesh. */
export const AI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User",
  "ClaudeBot", "Claude-User", "anthropic-ai", "Google-Extended", "Applebot-Extended",
  "Amazonbot", "Bytespider", "meta-externalagent", "cohere-ai", "YouBot",
];

/** Production origin used for canonical URLs and the sitemap (never the request Host). */
export const SITE_URL = "https://qurainsure.com";
export const SITE_NAME = "Qura Insure";

export const BLOG_INDEX_PATH = "/blog";
export const articlePath = (slug: string) => `/blog/${encodeURIComponent(slug)}`;

/** A request older than this triggers a bounded refresh before serving. */
export const FRESHNESS_INTERVAL_MS = 60_000;
/** Whole-sync deadline (all pages). RankMesh's callback client times out at 15s. */
export const SYNC_DEADLINE_MS = 12_000;
/** Page size requested from the Content API (API maximum). */
export const PAGE_LIMIT = 100;
