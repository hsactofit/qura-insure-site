import { describe, expect, it, vi } from "vitest";
import { ContentUnavailableError, createContentStore, type ContentStoreOptions } from "../content-store";
import { handleSyncCallback } from "../callback";

const ENDPOINT = "https://rankmesh.test/content/v1/sites/test-site/posts";
const DUMMY_KEY = "rmc_test_dummy_content_key";
const DUMMY_TOKEN = "dummy-sync-token-0123456789-abcdefghijklmnop";

type Post = Record<string, unknown>;

const post = (n: number, extra: Post = {}): Post => ({
  published_content_id: `pc_${n}`,
  slug: `post-${n}`,
  locale: "en",
  title: `Post ${n}`,
  excerpt: null,
  content_markdown: `Body ${n}`,
  content_html: `<p>Body ${n}</p>`,
  featured_image_url: null,
  featured_image_alt: null,
  author: null,
  categories: [],
  tags: [],
  published_at: new Date(Date.UTC(2026, 0, 1) + n * 60_000).toISOString(),
  modified_at: null,
  ...extra,
});

/** Fake RankMesh list endpoint backed by a mutable collection. */
function fakeRankMesh(initial: Post[] = []) {
  const api = {
    posts: initial,
    calls: [] as URL[],
    failOnCursor: null as string | null,
    status: 200,
    gate: null as Promise<void> | null,
  };
  const fetchImpl = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = new URL(String(input));
    api.calls.push(url);
    expect(new Headers(init?.headers).get("X-RankMesh-Content-Key")).toBe(DUMMY_KEY);
    const snapshotOfPosts = api.posts; // read at request time
    if (api.gate) await api.gate;
    if (api.status !== 200) return new Response("{}", { status: api.status });
    const cursor = url.searchParams.get("cursor");
    if (cursor !== null && cursor === api.failOnCursor) return new Response("boom", { status: 500 });
    const limit = Number(url.searchParams.get("limit") ?? 20);
    const offset = cursor ? Number(cursor) : 0;
    const data = snapshotOfPosts.slice(offset, offset + limit);
    const hasMore = offset + limit < snapshotOfPosts.length;
    return Response.json({
      data,
      pagination: { next_cursor: hasMore ? String(offset + limit) : null, has_more: hasMore, limit },
      meta: { site_key: "test-site", generated_at: new Date().toISOString(), api_version: "v1" },
    });
  });
  return { api, fetchImpl };
}

function makeStore(fetchImpl: typeof fetch, clock = { t: 1_000_000 }, extra: Partial<ContentStoreOptions> = {}) {
  return createContentStore({
    endpoint: ENDPOINT,
    contentKey: DUMMY_KEY,
    locale: "en",
    pageLimit: 100,
    freshnessMs: 60_000,
    deadlineMs: 12_000,
    fetchImpl,
    now: () => clock.t,
    random: () => 0,
    log: () => {},
    ...extra,
  });
}

const range = (n: number) => Array.from({ length: n }, (_, i) => post(i + 1));

describe("RankMesh content store", () => {
  it("hydrates on cold start and again after a simulated process restart", async () => {
    const { api, fetchImpl } = fakeRankMesh([post(1)]);
    const first = makeStore(fetchImpl as typeof fetch);
    expect(first.status().initialized).toBe(false);
    expect((await first.ensureFreshSnapshot()).bySlug.get("post-1")?.title).toBe("Post 1");

    const restarted = makeStore(fetchImpl as typeof fetch); // new process: empty memory
    expect(restarted.status().initialized).toBe(false);
    expect((await restarted.ensureFreshSnapshot()).articles).toHaveLength(1);
    expect(api.calls).toHaveLength(2);
    expect(api.calls[0].searchParams.get("locale")).toBe("en");
    expect(api.calls[0].searchParams.get("limit")).toBe("100");
  });

  it("follows every page of a collection larger than 100 and sorts newest first", async () => {
    const { api, fetchImpl } = fakeRankMesh(range(250));
    const store = makeStore(fetchImpl as typeof fetch);
    const snap = await store.ensureFreshSnapshot();
    expect(api.calls).toHaveLength(3);
    expect(api.calls[2].searchParams.get("cursor")).toBe("200");
    expect(api.calls[2].searchParams.get("locale")).toBe("en");
    expect(snap.articles).toHaveLength(250);
    expect(snap.bySlug.get("post-250")?.html).toBe("<p>Body 250</p>");
    expect(snap.articles[0].slug).toBe("post-250");
  });

  it("serves repeated fresh reads from memory and refreshes once stale", async () => {
    const clock = { t: 1_000_000 };
    const { api, fetchImpl } = fakeRankMesh([post(1)]);
    const store = makeStore(fetchImpl as typeof fetch, clock);
    await store.ensureFreshSnapshot();
    for (let i = 0; i < 5; i++) await store.ensureFreshSnapshot();
    expect(api.calls).toHaveLength(1);
    // Unknown slugs in a fresh snapshot do not trigger syncs either.
    expect((await store.ensureFreshSnapshot()).bySlug.get("nope")).toBeUndefined();
    expect(api.calls).toHaveLength(1);

    // This instance missed a callback; its next stale request refreshes.
    api.posts = [post(1), post(2)];
    clock.t += 60_001;
    expect((await store.ensureFreshSnapshot()).bySlug.has("post-2")).toBe(true);
    expect(api.calls).toHaveLength(2);
  });

  it("coalesces concurrent cold requests into one fetch sequence", async () => {
    const { api, fetchImpl } = fakeRankMesh(range(150));
    const store = makeStore(fetchImpl as typeof fetch);
    const results = await Promise.all(Array.from({ length: 10 }, () => store.ensureFreshSnapshot()));
    expect(api.calls).toHaveLength(2);
    expect(new Set(results).size).toBe(1);
  });

  it("treats a successful empty collection as initialized and clears the old snapshot", async () => {
    const { api, fetchImpl } = fakeRankMesh([post(1)]);
    const store = makeStore(fetchImpl as typeof fetch);
    await store.ensureFreshSnapshot();
    api.posts = [];
    await store.forceSync();
    const snap = await store.ensureFreshSnapshot();
    expect(snap.articles).toHaveLength(0);
    expect(store.status().initialized).toBe(true);
    expect(api.calls).toHaveLength(2);
  });

  it("keeps the previous snapshot when a later page fails", async () => {
    const clock = { t: 1_000_000 };
    const { api, fetchImpl } = fakeRankMesh(range(150));
    const store = makeStore(fetchImpl as typeof fetch, clock);
    await store.ensureFreshSnapshot();
    const before = store.status().lastSuccessfulSyncAt;
    api.posts = range(220);
    api.failOnCursor = "200";
    await expect(store.forceSync()).rejects.toMatchObject({ kind: "http" });
    const snap = await store.ensureFreshSnapshot();
    expect(snap.articles).toHaveLength(150);
    expect(store.status().lastSuccessfulSyncAt).toBe(before);
  });

  it("rejects missing or repeated cursors and conflicting slugs as incomplete", async () => {
    const pages = [
      { data: [post(1)], pagination: { has_more: true, next_cursor: null } },
      { data: [post(1)], pagination: { has_more: true, next_cursor: "a" } },
    ];
    for (const page of pages) {
      const store = makeStore((async () => Response.json(page)) as typeof fetch);
      await expect(store.forceSync()).rejects.toMatchObject({ kind: "invalid" });
      expect(store.status().initialized).toBe(false);
    }
    const dup = makeStore((async () => Response.json({
      data: [post(1), post(2, { slug: "post-1" })],
      pagination: { has_more: false, next_cursor: null },
    })) as typeof fetch);
    await expect(dup.forceSync()).rejects.toMatchObject({ kind: "invalid" });

    const repeat = makeStore((async () => Response.json({
      data: [post(1), post(1)],
      pagination: { has_more: false, next_cursor: null },
    })) as typeof fetch);
    expect(await repeat.forceSync()).toEqual({ articleCount: 1 });
  });

  it("publishes, updates and removes articles through forced syncs", async () => {
    const { api, fetchImpl } = fakeRankMesh([post(1)]);
    const store = makeStore(fetchImpl as typeof fetch);
    await store.ensureFreshSnapshot();

    api.posts = [post(1), post(2)];
    expect(await store.forceSync()).toEqual({ articleCount: 2 });
    expect((await store.ensureFreshSnapshot()).bySlug.has("post-2")).toBe(true);

    api.posts = [post(1), post(2, { content_html: "<p>Edited</p>", featured_image_url: "https://img.test/new.jpg" })];
    await store.forceSync();
    const edited = (await store.ensureFreshSnapshot()).bySlug.get("post-2")!;
    expect(edited.html).toBe("<p>Edited</p>");
    expect(edited.featuredImageUrl).toBe("https://img.test/new.jpg");

    api.posts = [post(2)];
    await store.forceSync();
    const snap = await store.ensureFreshSnapshot();
    expect(snap.bySlug.has("post-1")).toBe(false);
    expect(snap.articles.map(a => a.slug)).toEqual(["post-2"]);
  });

  it("gives a callback that arrives during an older sync a newer fetch", async () => {
    const { api, fetchImpl } = fakeRankMesh([post(1)]);
    const store = makeStore(fetchImpl as typeof fetch);
    let release!: () => void;
    api.gate = new Promise(r => { release = r; });
    const cold = store.ensureFreshSnapshot(); // starts and reads the old collection
    await vi.waitFor(() => expect(api.calls).toHaveLength(1));

    api.posts = [post(1), post(2)]; // published, then callback
    const callbackA = store.forceSync();
    const callbackB = store.forceSync();
    api.gate = null;
    release();

    expect((await cold).bySlug.has("post-2")).toBe(false);
    expect(await callbackA).toEqual({ articleCount: 2 });
    expect(await callbackB).toEqual({ articleCount: 2 });
    expect(api.calls).toHaveLength(2); // one coalesced follow-up
    expect((await store.ensureFreshSnapshot()).bySlug.has("post-2")).toBe(true);
  });

  it("returns ContentUnavailable on cold failure, backs off, then recovers", async () => {
    const clock = { t: 1_000_000 };
    const { api, fetchImpl } = fakeRankMesh([post(1)]);
    api.status = 503;
    const store = makeStore(fetchImpl as typeof fetch, clock);
    await expect(store.ensureFreshSnapshot()).rejects.toBeInstanceOf(ContentUnavailableError);
    const callsAfterFailure = api.calls.length;
    await expect(store.ensureFreshSnapshot()).rejects.toBeInstanceOf(ContentUnavailableError);
    expect(api.calls.length).toBe(callsAfterFailure); // backoff: no request storm
    api.status = 200;
    clock.t += 10_000;
    expect((await store.ensureFreshSnapshot()).articles).toHaveLength(1);
  });

  it("does not retry auth failures within a sync", async () => {
    const { api, fetchImpl } = fakeRankMesh([post(1)]);
    api.status = 401;
    const store = makeStore(fetchImpl as typeof fetch);
    await expect(store.forceSync()).rejects.toMatchObject({ kind: "auth" });
    expect(api.calls).toHaveLength(1);
  });

  it("aborts a sync at the total deadline and keeps old content", async () => {
    const hanging = vi.fn((_: unknown, init?: RequestInit) => new Promise<Response>((_, reject) => {
      init?.signal?.addEventListener("abort", () => reject(new Error("aborted")));
    }));
    const store = makeStore(hanging as unknown as typeof fetch, { t: 0 }, { now: Date.now, deadlineMs: 50 });
    await expect(store.forceSync()).rejects.toMatchObject({ kind: "timeout" });
  });

  it("sanitizes article HTML and renders the markdown fallback", async () => {
    const { fetchImpl } = fakeRankMesh([
      post(1, { content_html: '<p onclick="x()">Hi<script>alert(1)</script><a href="javascript:x">l</a></p><table><tr><td>1</td></tr></table>' }),
      post(2, { content_html: null, content_markdown: "## Heading\n\n- item\n\n```\ncode\n```" }),
    ]);
    const snap = await makeStore(fetchImpl as typeof fetch).ensureFreshSnapshot();
    const html1 = snap.bySlug.get("post-1")!.html;
    expect(html1).not.toMatch(/script|onclick|javascript:/);
    expect(html1).toContain("<td>1</td>");
    const html2 = snap.bySlug.get("post-2")!.html;
    expect(html2).toContain("<h2>Heading</h2>");
    expect(html2).toContain("<li>item</li>");
    expect(html2).toContain("<pre><code>code");
  });
});

describe("sync callback", () => {
  const call = (headers: Record<string, string>, body = "{}") =>
    new Request("https://qurainsure.test/api/rankmesh-content/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", ...headers },
      body,
    });

  it("rejects missing or wrong tokens without any upstream fetch", async () => {
    const { api, fetchImpl } = fakeRankMesh([post(1)]);
    const store = makeStore(fetchImpl as typeof fetch);
    const forceSync = vi.fn(store.forceSync);
    for (const headers of [{} as Record<string, string>, { "X-RankMesh-Sync-Token": "wrong" }, { "X-RankMesh-Sync-Token": DUMMY_TOKEN + "x" }]) {
      const res = await handleSyncCallback(call(headers), { token: DUMMY_TOKEN, forceSync });
      expect(res.status).toBe(401);
      expect(await res.text()).not.toContain(DUMMY_TOKEN);
    }
    expect(forceSync).not.toHaveBeenCalled();
    expect(api.calls).toHaveLength(0);
    expect(store.status().initialized).toBe(false);
  });

  it("returns 200 with the article count only after the swap", async () => {
    const { api, fetchImpl } = fakeRankMesh(range(3));
    const store = makeStore(fetchImpl as typeof fetch);
    const res = await handleSyncCallback(call({ "X-RankMesh-Sync-Token": DUMMY_TOKEN }), { token: DUMMY_TOKEN, forceSync: store.forceSync });
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(await res.json()).toEqual({ status: "synced", article_count: 3 });
    expect(store.status()).toMatchObject({ initialized: true, articleCount: 3 });
    expect(api.calls).toHaveLength(1);
  });

  it("returns non-2xx on refresh failure and keeps the previous snapshot", async () => {
    const { api, fetchImpl } = fakeRankMesh(range(3));
    const store = makeStore(fetchImpl as typeof fetch);
    await store.ensureFreshSnapshot();
    api.status = 500;
    const res = await handleSyncCallback(call({ "X-RankMesh-Sync-Token": DUMMY_TOKEN }), { token: DUMMY_TOKEN, forceSync: store.forceSync });
    expect(res.status).toBeGreaterThanOrEqual(500);
    const body = await res.json();
    expect(body.status).toBe("error");
    expect(JSON.stringify(body)).not.toContain(DUMMY_KEY);
    expect(store.status().articleCount).toBe(3);
  });

  it("rejects oversized bodies", async () => {
    const forceSync = vi.fn();
    const res = await handleSyncCallback(call({ "X-RankMesh-Sync-Token": DUMMY_TOKEN }, "x".repeat(5000)), { token: DUMMY_TOKEN, forceSync });
    expect(res.status).toBe(413);
    expect(forceSync).not.toHaveBeenCalled();
  });
});
