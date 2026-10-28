/**
 * In-memory RankMesh Content snapshot (one per server process).
 *
 * Pure module: no framework imports and no credentials, so it can be unit
 * tested with a mocked fetch. The process-wide instance lives in
 * `store.server.ts`.
 */
import { renderArticleHtml } from "./html";

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  /** Sanitized article body HTML (content_html, or rendered content_markdown). */
  html: string;
  featuredImageUrl: string | null;
  featuredImageAlt: string | null;
  authorName: string | null;
  categories: string[];
  tags: string[];
  keywords: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  openGraph: Record<string, unknown> | null;
  structuredData: Record<string, unknown> | null;
  publishedAt: string | null;
  modifiedAt: string | null;
};

export type Snapshot = {
  /** Newest published first. */
  readonly articles: readonly Article[];
  readonly bySlug: ReadonlyMap<string, Article>;
};

export type SyncErrorKind = "auth" | "rate_limited" | "http" | "network" | "timeout" | "invalid";

export class SyncError extends Error {
  constructor(
    readonly kind: SyncErrorKind,
    message: string,
    readonly status?: number,
    readonly retryAfterMs?: number,
  ) {
    super(message);
    this.name = "SyncError";
  }
}

/** No successful snapshot exists yet and RankMesh could not be reached. */
export class ContentUnavailableError extends Error {
  constructor(readonly retryAfterSeconds: number) {
    super("Blog content is temporarily unavailable");
    this.name = "ContentUnavailableError";
  }
}

/** Bundle-safe check: Next.js may load this module more than once per process. */
export const isContentUnavailable = (error: unknown): error is ContentUnavailableError =>
  error instanceof Error && error.name === "ContentUnavailableError";

export type ContentStoreOptions = {
  endpoint: string;
  contentKey: string;
  locale: string | null;
  pageLimit: number;
  freshnessMs: number;
  deadlineMs: number;
  fetchImpl?: typeof fetch;
  now?: () => number;
  random?: () => number;
  log?: (message: string) => void;
};

export type SyncResult = { articleCount: number };

const MAX_PAGES = 500;
const MAX_ATTEMPTS_PER_PAGE = 3;
const AUTH_BACKOFF_MS = 5 * 60_000;
const MAX_BACKOFF_MS = 5 * 60_000;
const SLUG_RE = /^[^\s/?#%\\]{1,300}$/;

export const isValidSlug = (slug: string) => SLUG_RE.test(slug) && slug !== "." && slug !== "..";

const EMPTY: Snapshot = { articles: [], bySlug: new Map() };

export function createContentStore(options: ContentStoreOptions) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const now = options.now ?? Date.now;
  const random = options.random ?? Math.random;
  const log = options.log ?? ((m: string) => console.warn(m));

  const state = {
    initialized: false,
    snapshot: EMPTY,
    lastSuccessfulSyncAt: 0,
    /** The one sync running in this process. */
    current: null as Promise<SyncResult> | null,
    /** A single coalesced sync queued to start after `current` (callbacks). */
    pending: null as Promise<SyncResult> | null,
    consecutiveFailures: 0,
    nextRetryAt: 0,
    rateLimitedUntil: 0,
  };

  const sleep = (ms: number, signal: AbortSignal) =>
    new Promise<void>((resolve, reject) => {
      const onAbort = () => {
        clearTimeout(timer);
        reject(new SyncError("timeout", "sync deadline exceeded"));
      };
      const timer = setTimeout(() => {
        signal.removeEventListener("abort", onAbort);
        resolve();
      }, ms);
      signal.addEventListener("abort", onAbort, { once: true });
    });

  async function fetchPage(url: URL, signal: AbortSignal, deadlineAt: number): Promise<unknown> {
    let lastError: SyncError = new SyncError("network", "request failed");
    for (let attempt = 0; attempt < MAX_ATTEMPTS_PER_PAGE; attempt++) {
      let res: Response | null = null;
      try {
        res = await fetchImpl(url, {
          method: "GET",
          headers: { "X-RankMesh-Content-Key": options.contentKey, Accept: "application/json" },
          cache: "no-store",
          redirect: "error",
          signal,
        });
      } catch {
        if (signal.aborted) throw new SyncError("timeout", "sync deadline exceeded");
        lastError = new SyncError("network", "network error");
      }
      if (res) {
        if (res.ok) {
          try {
            return await res.json();
          } catch {
            if (signal.aborted) throw new SyncError("timeout", "sync deadline exceeded");
            throw new SyncError("invalid", "response was not valid JSON", res.status);
          }
        }
        void res.body?.cancel().catch(() => {});
        if (res.status === 401 || res.status === 403) {
          throw new SyncError("auth", "content key rejected", res.status);
        }
        if (res.status === 429) {
          lastError = new SyncError("rate_limited", "rate limited", 429, parseRetryAfter(res.headers.get("retry-after"), now()));
        } else if (res.status === 408 || res.status >= 500) {
          lastError = new SyncError("http", "upstream error", res.status);
        } else {
          throw new SyncError("http", "unexpected upstream status", res.status);
        }
      }
      if (attempt === MAX_ATTEMPTS_PER_PAGE - 1) break;
      const delay = lastError.kind === "rate_limited"
        ? lastError.retryAfterMs ?? 1000
        : 250 * 2 ** attempt * (0.5 + random());
      if (now() + delay >= deadlineAt) break;
      await sleep(delay, signal);
    }
    throw lastError;
  }

  async function fetchAllRecords(signal: AbortSignal, deadlineAt: number): Promise<unknown[]> {
    const records: unknown[] = [];
    const seenCursors = new Set<string>();
    let cursor: string | null = null;
    for (let page = 0; ; page++) {
      if (page >= MAX_PAGES) throw new SyncError("invalid", "too many pages");
      const url = new URL(options.endpoint);
      url.searchParams.set("limit", String(options.pageLimit));
      if (options.locale) url.searchParams.set("locale", options.locale);
      if (cursor !== null) url.searchParams.set("cursor", cursor);

      const body = await fetchPage(url, signal, deadlineAt);
      if (!isObject(body) || !Array.isArray(body.data) || !isObject(body.pagination)) {
        throw new SyncError("invalid", "malformed page");
      }
      const { has_more: hasMore, next_cursor: nextCursor } = body.pagination;
      if (typeof hasMore !== "boolean") throw new SyncError("invalid", "malformed pagination");
      records.push(...body.data);
      if (!hasMore) return records;
      if (typeof nextCursor !== "string" || nextCursor === "") {
        throw new SyncError("invalid", "missing continuation cursor");
      }
      if (seenCursors.has(nextCursor)) throw new SyncError("invalid", "repeated continuation cursor");
      seenCursors.add(nextCursor);
      cursor = nextCursor;
    }
  }

  async function runSync(deadlineAt: number): Promise<SyncResult> {
    const startedAt = now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Math.max(0, deadlineAt - startedAt));
    (timer as { unref?: () => void }).unref?.();
    try {
      const records = await fetchAllRecords(controller.signal, deadlineAt);
      const snapshot = buildSnapshot(records, options.locale);
      // Atomic swap, only after every page was fetched and validated.
      state.snapshot = snapshot;
      state.initialized = true;
      state.lastSuccessfulSyncAt = startedAt;
      state.consecutiveFailures = 0;
      state.nextRetryAt = 0;
      return { articleCount: snapshot.articles.length };
    } catch (error) {
      const err = error instanceof SyncError ? error : new SyncError("invalid", "unexpected sync error");
      state.consecutiveFailures++;
      const backoff = err.kind === "auth"
        ? AUTH_BACKOFF_MS
        : Math.min(MAX_BACKOFF_MS, 2000 * 2 ** (state.consecutiveFailures - 1)) * (0.8 + 0.4 * random());
      state.nextRetryAt = now() + Math.max(backoff, err.retryAfterMs ?? 0);
      if (err.kind === "rate_limited") state.rateLimitedUntil = now() + (err.retryAfterMs ?? 30_000);
      log(`[rankmesh-content] sync failed: kind=${err.kind}${err.status ? ` status=${err.status}` : ""} ` +
        `reason="${err.message}" failures=${state.consecutiveFailures} ` +
        `keeping=${state.initialized ? `${state.snapshot.articles.length} cached articles` : "no snapshot"}`);
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }

  function startSync(deadlineAt = now() + options.deadlineMs): Promise<SyncResult> {
    const promise = runSync(deadlineAt);
    state.current = promise;
    promise.then(
      () => { if (state.current === promise) state.current = null; },
      () => { if (state.current === promise) state.current = null; },
    );
    return promise;
  }

  /** Join the sync that is queued or running, or start one. */
  function joinOrStart(): Promise<SyncResult> {
    return state.pending ?? state.current ?? startSync();
  }

  /**
   * Used by every blog-serving path. Returns the active snapshot, refreshing
   * first (bounded) when it is older than the freshness interval.
   */
  async function ensureFreshSnapshot(): Promise<Snapshot> {
    if (state.initialized && now() - state.lastSuccessfulSyncAt < options.freshnessMs) {
      return state.snapshot;
    }
    if (!state.pending && !state.current && now() < state.nextRetryAt) {
      if (state.initialized) return state.snapshot;
      throw new ContentUnavailableError(retryAfterSeconds());
    }
    try {
      await joinOrStart();
    } catch {
      if (state.initialized) return state.snapshot; // stale but valid; failure already logged
      throw new ContentUnavailableError(retryAfterSeconds());
    }
    return state.snapshot;
  }

  /**
   * Callback path: guarantees a full fetch that starts after this call, even
   * when an older sync is in flight. Concurrent callbacks share one follow-up.
   */
  function forceSync(): Promise<SyncResult> {
    const deadlineAt = now() + options.deadlineMs;
    if (now() < state.rateLimitedUntil) {
      return Promise.reject(new SyncError("rate_limited", "rate limited", 429));
    }
    if (state.pending) return state.pending;
    if (!state.current) return startSync(deadlineAt);
    const pending: Promise<SyncResult> = state.current.then(noop, noop).then(() => {
      // Hand over synchronously so no other caller can start a parallel sync.
      state.pending = null;
      if (now() >= deadlineAt) return Promise.reject(new SyncError("timeout", "sync deadline exceeded"));
      return startSync(deadlineAt);
    });
    state.pending = pending;
    return pending;
  }

  function retryAfterSeconds() {
    return Math.min(300, Math.max(5, Math.ceil((state.nextRetryAt - now()) / 1000)));
  }

  return {
    ensureFreshSnapshot,
    forceSync,
    /** Introspection for tests and diagnostics (no article bodies). */
    status: () => ({
      initialized: state.initialized,
      articleCount: state.snapshot.articles.length,
      lastSuccessfulSyncAt: state.lastSuccessfulSyncAt,
      syncing: Boolean(state.current || state.pending),
      nextRetryAt: state.nextRetryAt,
    }),
  };
}

export type ContentStore = ReturnType<typeof createContentStore>;

const noop = () => {};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const str = (v: unknown) => (typeof v === "string" && v.trim() !== "" ? v : null);
const strList = (v: unknown) => (Array.isArray(v) ? v.map(item => (isObject(item) ? str(item.name) : str(item))).filter((s): s is string => s !== null) : []);
const obj = (v: unknown) => (isObject(v) && Object.keys(v).length > 0 ? v : null);

function parseRetryAfter(header: string | null, nowMs: number): number | undefined {
  if (!header) return undefined;
  const seconds = Number(header);
  if (Number.isFinite(seconds) && seconds >= 0) return Math.min(seconds * 1000, MAX_BACKOFF_MS);
  const date = Date.parse(header);
  return Number.isNaN(date) ? undefined : Math.min(Math.max(0, date - nowMs), MAX_BACKOFF_MS);
}

function toArticle(raw: unknown): Article {
  if (!isObject(raw)) throw new SyncError("invalid", "article is not an object");
  const id = str(raw.published_content_id);
  const slug = typeof raw.slug === "string" ? raw.slug : null;
  const title = str(raw.title);
  if (!id || !slug || !isValidSlug(slug) || !title) {
    throw new SyncError("invalid", "article is missing identity fields");
  }
  const html = typeof raw.content_html === "string" ? raw.content_html : null;
  const markdown = typeof raw.content_markdown === "string" ? raw.content_markdown : null;
  if (html === null && markdown === null) throw new SyncError("invalid", "article has no body");
  const author = isObject(raw.author) ? str(raw.author.name) : str(raw.author);
  return {
    id,
    slug,
    title,
    excerpt: str(raw.excerpt),
    html: renderArticleHtml(html, markdown),
    featuredImageUrl: httpUrl(raw.featured_image_url),
    featuredImageAlt: str(raw.featured_image_alt),
    authorName: author,
    categories: strList(raw.categories),
    tags: strList(raw.tags),
    keywords: strList(raw.target_keywords),
    metaTitle: str(raw.meta_title),
    metaDescription: str(raw.meta_description),
    canonicalUrl: httpUrl(raw.canonical_url),
    openGraph: obj(raw.open_graph),
    structuredData: obj(raw.structured_data),
    publishedAt: validDate(raw.published_at),
    modifiedAt: validDate(raw.modified_at),
  };
}

function httpUrl(v: unknown): string | null {
  const s = str(v);
  if (!s) return null;
  try {
    const url = new URL(s);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function validDate(v: unknown): string | null {
  const s = str(v);
  return s && !Number.isNaN(Date.parse(s)) ? s : null;
}

/** Validate a fetched collection and build the lookup map and ordered index. */
export function buildSnapshot(records: unknown[], locale: string | null): Snapshot {
  const byId = new Map<string, { raw: string; article: Article }>();
  for (const record of records) {
    if (locale && isObject(record) && typeof record.locale === "string" && record.locale !== locale) continue;
    const serialized = JSON.stringify(record);
    const id = isObject(record) ? record.published_content_id : undefined;
    const existing = typeof id === "string" ? byId.get(id) : undefined;
    if (existing) {
      if (existing.raw === serialized) continue; // identical repeat across pages
      throw new SyncError("invalid", "conflicting records for one published_content_id");
    }
    const article = toArticle(record);
    byId.set(article.id, { raw: serialized, article });
  }

  const bySlug = new Map<string, Article>();
  for (const { article } of byId.values()) {
    if (bySlug.has(article.slug)) throw new SyncError("invalid", "two articles share one slug");
    bySlug.set(article.slug, article);
  }

  const time = (a: Article) => (a.publishedAt ? Date.parse(a.publishedAt) : -Infinity);
  const articles = [...bySlug.values()].sort((a, b) => time(b) - time(a) || (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  return Object.freeze({ articles: Object.freeze(articles), bySlug });
}
