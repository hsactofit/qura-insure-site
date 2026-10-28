import "server-only";
import type { Metadata } from "next";
import { isValidSlug, type Article } from "./content-store";
import { SITE_NAME, SITE_URL, articlePath } from "./config.server";
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

export function articleMetadata(article: Article): Metadata {
  const og = article.openGraph;
  const title = article.metaTitle ?? article.title;
  const description = article.metaDescription ?? article.excerpt ?? undefined;
  const canonical = article.canonicalUrl ?? articleUrl(article);
  const image = ogString(og, "image") ?? ogString(og, "image_url") ?? article.featuredImageUrl ?? undefined;
  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    keywords: article.keywords.length ? article.keywords : undefined,
    alternates: { canonical },
    authors: article.authorName ? [{ name: article.authorName }] : undefined,
    openGraph: {
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      title: ogString(og, "title") ?? title,
      description: ogString(og, "description") ?? description,
      images: image ? [{ url: image, alt: article.featuredImageAlt ?? undefined }] : undefined,
      publishedTime: article.publishedAt ?? undefined,
      modifiedTime: article.modifiedAt ?? undefined,
      authors: article.authorName ? [article.authorName] : undefined,
      tags: article.tags.length ? article.tags : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: ogString(og, "title") ?? title,
      description: ogString(og, "description") ?? description,
      images: image ? [image] : undefined,
    },
  };
}

/** BlogPosting JSON-LD, escaped for safe embedding in a <script> tag. */
export function articleJsonLd(article: Article): string {
  const data = article.structuredData ?? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription ?? article.excerpt ?? undefined,
    image: article.featuredImageUrl ?? undefined,
    datePublished: article.publishedAt ?? undefined,
    dateModified: article.modifiedAt ?? article.publishedAt ?? undefined,
    author: article.authorName ? { "@type": "Person", name: article.authorName } : undefined,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": article.canonicalUrl ?? articleUrl(article) },
    keywords: article.keywords.length ? article.keywords.join(", ") : undefined,
  };
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
