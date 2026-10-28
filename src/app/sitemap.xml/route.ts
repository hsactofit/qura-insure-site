import { isContentUnavailable } from "@/lib/rankmesh/content-store";
import { BLOG_INDEX_PATH, SITE_URL, articlePath } from "@/lib/rankmesh/config.server";
import { contentStore } from "@/lib/rankmesh/store.server";

export const dynamic = "force-dynamic";

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

const isoDate = (value: string | null) => (value ? new Date(value).toISOString() : null);

export async function GET() {
  let snapshot;
  try {
    snapshot = await contentStore.ensureFreshSnapshot();
  } catch (error) {
    if (!isContentUnavailable(error)) throw error;
    return new Response("Sitemap temporarily unavailable", {
      status: 503,
      headers: { "Retry-After": String(error.retryAfterSeconds), "Cache-Control": "no-store" },
    });
  }

  const entries: { loc: string; lastmod: string | null }[] = [
    { loc: `${SITE_URL}/`, lastmod: null },
    { loc: `${SITE_URL}${BLOG_INDEX_PATH}`, lastmod: isoDate(snapshot.articles[0]?.modifiedAt ?? snapshot.articles[0]?.publishedAt ?? null) },
    ...snapshot.articles.map(article => ({
      loc: `${SITE_URL}${articlePath(article.slug)}`,
      lastmod: isoDate(article.modifiedAt ?? article.publishedAt),
    })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(e => `  <url><loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`).join("\n")}
</urlset>
`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "no-store, max-age=0" },
  });
}
