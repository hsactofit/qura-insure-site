import "server-only";
import { createContentStore, type ContentStore } from "./content-store";
import {
  FRESHNESS_INTERVAL_MS,
  PAGE_LIMIT,
  RANKMESH_CONTENT_KEY,
  RANKMESH_LOCALE,
  RANKMESH_POSTS_ENDPOINT,
  SYNC_DEADLINE_MS,
} from "./config.server";

// One snapshot per server process, shared by the proxy, pages, sitemap and
// callback even when Next.js bundles them separately.
const STORE_KEY = Symbol.for("qura.rankmesh-content.store.v1");
const globalStore = globalThis as typeof globalThis & { [STORE_KEY]?: ContentStore };

export const contentStore: ContentStore = (globalStore[STORE_KEY] ??= createContentStore({
  endpoint: RANKMESH_POSTS_ENDPOINT,
  contentKey: RANKMESH_CONTENT_KEY,
  locale: RANKMESH_LOCALE,
  pageLimit: PAGE_LIMIT,
  freshnessMs: FRESHNESS_INTERVAL_MS,
  deadlineMs: SYNC_DEADLINE_MS,
}));
