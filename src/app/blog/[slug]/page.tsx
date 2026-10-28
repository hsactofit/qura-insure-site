import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BlogImage from "@/components/Blog/BlogImage";
import { BLOG_INDEX_PATH } from "@/lib/rankmesh/config.server";
import { articleJsonLd, articleMetadata, findArticle, formatDate } from "@/lib/rankmesh/blog.server";

// Looked up per request in the in-memory RankMesh snapshot; no per-article files or prerendering.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const article = await findArticle((await params).slug);
  if (!article) return { title: "Article not found", robots: { index: false } };
  return articleMetadata(article);
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const article = await findArticle((await params).slug);
  if (!article) notFound();

  const published = formatDate(article.publishedAt);
  const modified = article.modifiedAt && formatDate(article.modifiedAt) !== published ? formatDate(article.modifiedAt) : null;
  const taxonomy = [...article.categories, ...article.tags.filter(t => !article.categories.includes(t))];

  return (
    <article className="relative pt-32 md:pt-40 pb-24 bg-bg-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd(article) }} />
      <div className="container mx-auto px-6 max-w-3xl">
        <Link href={BLOG_INDEX_PATH} className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} /> All articles
        </Link>

        <header className="mb-10">
          {article.categories.length > 0 && (
            <p className="text-sm font-bold uppercase tracking-[.16em] text-secondary mb-4">{article.categories.join(" · ")}</p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-.05em] text-primary leading-[1.05] mb-6 text-balance">
            {article.title}
          </h1>
          {article.excerpt && <p className="text-lg md:text-xl text-text-muted font-medium leading-relaxed mb-6">{article.excerpt}</p>}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
            {article.authorName && <span className="font-semibold text-primary">By {article.authorName}</span>}
            {published && <time dateTime={article.publishedAt!}>Published {published}</time>}
            {modified && <time dateTime={article.modifiedAt!}>Updated {modified}</time>}
          </div>
        </header>
      </div>

      {article.featuredImageUrl && (
        <div className="container mx-auto px-6 max-w-5xl mb-12">
          <div className="aspect-[16/9] rounded-[2rem] overflow-hidden border border-border-subtle bg-surface-sage shadow-[0_24px_70px_rgba(11,36,66,.07)]">
            <BlogImage src={article.featuredImageUrl} alt={article.featuredImageAlt ?? ""} priority />
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 max-w-3xl">
        {/* Body HTML is sanitized (no scripts or event handlers) when the snapshot is built. */}
        <div className="rm-prose" dangerouslySetInnerHTML={{ __html: article.html }} />

        {taxonomy.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border-subtle" aria-label="Topics">
            {taxonomy.map(t => (
              <li key={t} className="px-4 py-1.5 rounded-full bg-surface-sage text-sm font-medium text-primary">{t}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
