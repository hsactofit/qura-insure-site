import "server-only";
import type { Metadata } from "next";
import { isValidSlug, type Article } from "./content-store";
import { SITE_NAME, SITE_URL, BLOG_INDEX_PATH, articlePath } from "./config.server";
import { LOGO_URL, OG_IMAGE, ORGANIZATION_ID, SERVICE_PAGES, WEBSITE_ID, breadcrumbNode, jsonLdString } from "@/data/site";
import { BLOG_AUTHOR_SLUG, BLOG_REVIEWER_SLUG, findTeamMember, personNode, teamPath } from "@/data/team";
import { contentStore } from "./store.server";

export const getBlogSnapshot = () => contentStore.ensureFreshSnapshot();

/** Look up a route param in the fresh snapshot; null means a confirmed 404. */
export async function findArticle(slugParam: string): Promise<Article | null> {
  let slug = slugParam;
  if (slug.includes("%")) {
    try {
      slug = decodeURIComponent(slug);
    } catch {
      return null;
    }
  }
  if (!isValidSlug(slug)) return null;
  const snapshot = await getBlogSnapshot();
  return snapshot.bySlug.get(slug) ?? null;
}

export const articleUrl = (article: Article) => `${SITE_URL}${articlePath(article.slug)}`;

export function formatDate(value: string | null): string | null {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(value));
}

const ogString = (og: Record<string, unknown> | null, key: string) =>
  typeof og?.[key] === "string" && og[key] !== "" ? (og[key] as string) : undefined;

/** Legacy CMS spelling of the brand; always shown as SITE_NAME. */
const LEGACY_BRAND = /^\s*qura\s*insure\s*$/i;
const normalizeBrand = (name: string) => (LEGACY_BRAND.test(name) ? SITE_NAME : name);

const TITLE_SUFFIX = ` | ${SITE_NAME}`;
const MAX_TITLE_LENGTH = 60;
/** Append the brand suffix only when the full title stays within 60 characters. */
export const articleDocumentTitle = (title: string) =>
  title.length + TITLE_SUFFIX.length <= MAX_TITLE_LENGTH ? `${title}${TITLE_SUFFIX}` : title;

/** Byline data: a configured team author/reviewer, otherwise the organisation. */
export function articleByline(article: Article) {
  const author = BLOG_AUTHOR_SLUG ? findTeamMember(BLOG_AUTHOR_SLUG) : null;
  const reviewer = BLOG_REVIEWER_SLUG ? findTeamMember(BLOG_REVIEWER_SLUG) : null;
  return {
    authorName: author?.name ?? (article.authorName ? normalizeBrand(article.authorName) : SITE_NAME),
    authorHref: author ? teamPath(author.slug) : null,
    author,
    reviewer,
  };
}

/** Service pages relevant to an article (by title/taxonomy keywords); all of them if nothing matches. */
export function relatedServices(article: Article) {
  const text = [article.title, ...article.categories, ...article.tags, ...article.keywords].join(" ").toLowerCase();
  const rules: [RegExp, string][] = [
    [/\bterm\b|life (insurance|cover)|sum assured|nominee/, "/term-life-insurance"],
    [/health|mediclaim|floater|room[- ]rent|hospital|cashless|80d|pre-existing/, "/health-insurance"],
    [/group|corporate|employee|employer|gmc/, "/corporate-insurance"],
  ];
  const matched = SERVICE_PAGES.filter((s) => rules.some(([re, path]) => path === s.path && re.test(text)));
  return matched.length ? matched : [...SERVICE_PAGES];
}

/** External links listed under a "Sources"/"References" heading in the article body. */
export function articleSources(html: string): string[] {
  const match = /<h[2-4][^>]*>\s*(?:sources|references|further reading)[^<]*<\/h[2-4]>([\s\S]*?)(?=<h[1-4][^>]*>|$)/i.exec(html);
  if (!match) return [];
  const urls = [...match[1].matchAll(/<a\s[^>]*href="(https?:\/\/[^"]+)"/gi)].map((m) => m[1].replace(/&amp;/g, "&"));
  return [...new Set(urls)];
}

export function articleMetadata(article: Article): Metadata {
  const og = article.openGraph;
  const title = article.metaTitle ?? article.title;
  const description = article.metaDescription ?? article.excerpt ?? undefined;
  const canonical = article.canonicalUrl ?? articleUrl(article);
  const image = ogString(og, "image") ?? ogString(og, "image_url") ?? article.featuredImageUrl ?? undefined;
  return {
    title: { absolute: articleDocumentTitle(title) },
    description,
    keywords: article.keywords.length ? article.keywords : undefined,
    alternates: { canonical },
    authors: [{ name: articleByline(article).authorName, url: articleByline(article).authorHref ? `${SITE_URL}${articleByline(article).authorHref}` : undefined }],
    openGraph: {
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      title: ogString(og, "title") ?? title,
      description: ogString(og, "description") ?? description,
      images: image ? [{ url: image, alt: article.featuredImageAlt ?? undefined }] : [OG_IMAGE],
      publishedTime: article.publishedAt ?? undefined,
      modifiedTime: article.modifiedAt ?? undefined,
      authors: [articleByline(article).authorName],
      tags: article.tags.length ? article.tags : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: ogString(og, "title") ?? title,
      description: ogString(og, "description") ?? description,
      images: image ? [image] : [OG_IMAGE.url],
    },
  };
}

type JsonObject = Record<string, unknown>;
const isPostingNode = (node: unknown): node is JsonObject => {
  if (!node || typeof node !== "object") return false;
  const type = (node as JsonObject)["@type"];
  const types = Array.isArray(type) ? type : [type];
  return types.some((t) => t === "BlogPosting" || t === "Article" || t === "NewsArticle");
};

/** Rewrites legacy brand spellings in name fields anywhere in the CMS-supplied JSON-LD. */
function fixBrandNames(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(fixBrandNames);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, k === "name" && typeof v === "string" ? normalizeBrand(v) : fixBrandNames(v)]),
    );
  }
  return value;
}

/** BlogPosting + BreadcrumbList JSON-LD, escaped for safe embedding in a <script> tag. */
export function articleJsonLd(article: Article): string {
  const url = article.canonicalUrl ?? articleUrl(article);
  const { author, reviewer } = articleByline(article);
  const sources = articleSources(article.html);

  const supplied = article.structuredData ? (fixBrandNames(article.structuredData) as JsonObject) : null;
  const suppliedGraph: unknown[] = supplied
    ? Array.isArray(supplied["@graph"]) ? (supplied["@graph"] as unknown[]) : [supplied]
    : [];
  const base = (suppliedGraph.find(isPostingNode) as JsonObject | undefined) ?? {};
  const others = suppliedGraph.filter((n) => n !== base && !(n && typeof n === "object" && (n as JsonObject)["@type"] === "BreadcrumbList"));
  const { "@context": _ctx, ...baseNode } = base;
  void _ctx;

  const posting: JsonObject = {
    headline: article.title,
    description: article.metaDescription ?? article.excerpt ?? undefined,
    image: article.featuredImageUrl ?? undefined,
    datePublished: article.publishedAt ?? undefined,
    keywords: article.keywords.length ? article.keywords.join(", ") : undefined,
    ...baseNode,
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    dateModified: article.modifiedAt ?? article.publishedAt ?? (baseNode.dateModified as string | undefined) ?? undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": `${SITE_URL}${BLOG_INDEX_PATH}#blog` },
    inLanguage: "en-IN",
    author: author ? personNode(author) : { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME, url: `${SITE_URL}/` },
    reviewedBy: reviewer ? personNode(reviewer) : undefined,
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    about: article.categories.length ? article.categories.map((name) => ({ "@type": "Thing", name })) : baseNode.about,
    citation: sources.length ? sources.map((u) => ({ "@type": "CreativeWork", url: u })) : baseNode.citation,
  };

  return jsonLdString({
    "@context": "https://schema.org",
    "@graph": [
      posting,
      ...others,
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Blog", path: BLOG_INDEX_PATH },
        { name: article.title, path: articlePath(article.slug) },
      ]),
    ],
  });
}

/** Blog + BreadcrumbList JSON-LD for the blog index. */
export function blogIndexJsonLd(articles: readonly Article[], canonical: string, description: string): string {
  return jsonLdString({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}${BLOG_INDEX_PATH}#blog`,
        url: canonical,
        name: `${SITE_NAME} Blog`,
        description,
        inLanguage: "en-IN",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        blogPost: articles.map((a) => ({
          "@type": "BlogPosting",
          "@id": `${a.canonicalUrl ?? articleUrl(a)}#article`,
          headline: a.title,
          url: a.canonicalUrl ?? articleUrl(a),
          datePublished: a.publishedAt ?? undefined,
          dateModified: a.modifiedAt ?? a.publishedAt ?? undefined,
        })),
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Blog", path: BLOG_INDEX_PATH },
      ]),
    ],
  });
}
