This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Blog (RankMesh Content)

Blog articles are published in RankMesh and served from server memory. There
are no article files and no database, and publishing needs no rebuild.

| Route | Purpose |
| --- | --- |
| `/blog` | Index, newest first (12 per page, `?page=N`) |
| `/blog/{slug}` | Article, rendered on the server from the snapshot (sanitized `content_html`, Markdown fallback) |
| `/sitemap.xml` | Home, `/blog` and every article in the snapshot; listed in `/robots.txt` |
| `POST /api/rankmesh-content/sync` | RankMesh callback: forces a full refresh |

**Memory lifecycle** (`src/lib/rankmesh/`):

- `config.server.ts` holds the endpoint, locale, site URL and both credentials.
  It is server-only: never import it from client components.
- `store.server.ts` keeps one snapshot per server process (on `globalThis`),
  shared by the proxy, the pages, the sitemap and the callback.
  `content-store.ts` has the logic.
- Each sync fetches **every** page of the published list (`limit=100`,
  following `next_cursor`) into a temporary collection. It validates the
  collection, then swaps it in atomically. If any page fails, the previous
  snapshot is kept. Each sync has a 12 s total deadline, a few jittered retries
  for transient errors, and backoff after failures (5 min after an auth
  failure; `Retry-After` is honoured).
- `src/instrumentation.ts` warms the cache on server start. `src/proxy.ts`
  calls `ensureFreshSnapshot()` for `/blog*`, so every instance hydrates itself
  after a restart or cold start. If no snapshot has ever loaded and RankMesh is
  down, it returns a 503 with `Retry-After`.
- **Freshness interval: 60 s** (`FRESHNESS_INTERVAL_MS`). The first request
  after that refreshes before it renders. This also repairs missed callbacks
  and updates other instances, because memory is per process or instance.
  Instances converge eventually; a refresh is not instant everywhere.
- During a RankMesh outage the last good snapshot is served. That includes
  articles that have since been removed. Content can stay stale until RankMesh
  is reachable again.

**Callback:** `POST /api/rankmesh-content/sync` with header
`X-RankMesh-Sync-Token` (compared in constant time) and body `{}`.
Responses:

- `200 {"status":"synced","article_count":N}`, sent only after the new snapshot
  is live.
- `401` for a missing or wrong token. No fetch is made.
- `413` for a body over 1 KB.
- `502`, `503` or `504` when the refresh fails. The previous snapshot is kept.

A callback that arrives during a sync gets a follow-up full sync.

**Caching:** the blog pages, sitemap and callback are dynamic and sent with
`no-store`, so CDN or framework caches never serve old article HTML or 404s.

**Hosting:** this needs a Next.js server runtime: `next build` + `next start`,
or a host that runs Next.js server functions and the proxy. A static export
(`output: "export"`) cannot run it.

**Tests:** `npm test` runs Vitest with a mocked RankMesh API and dummy
credentials. Also run `npm run build` and `npx eslint src/lib src/app`.
