import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import BlogImage from "@/components/Blog/BlogImage";
import { BLOG_INDEX_PATH, SITE_NAME, SITE_URL, articlePath } from "@/lib/rankmesh/config.server";
import { formatDate, getBlogSnapshot } from "@/lib/rankmesh/blog.server";

// Rendered per request from the in-memory RankMesh snapshot; never prerendered.
export const dynamic = "force-dynamic";

const PAGE_SIZE = 12;
const DESCRIPTION = "Plain-English guides to term life, health and corporate insurance from the Qura Insure team.";

export async function generateMetadata({ searchParams }: PageProps<"/blog">): Promise<Metadata> {
  const page = parsePage((await searchParams).page);
  const canonical = `${SITE_URL}${BLOG_INDEX_PATH}${page > 1 ? `?page=${page}` : ""}`;
  return {
    title: { absolute: `Blog | ${SITE_NAME}` },
    description: DESCRIPTION,
    alternates: { canonical },
    openGraph: { type: "website", url: canonical, title: `Blog | ${SITE_NAME}`, description: DESCRIPTION },
  };
}

function parsePage(value: string | string[] | undefined) {
  const n = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(n) && n > 1 ? n : 1;
}

export default async function BlogIndexPage({ searchParams }: PageProps<"/blog">) {
  const { articles } = await getBlogSnapshot();
  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const page = Math.min(parsePage((await searchParams).page), totalPages);
  const visible = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="relative pt-32 md:pt-40 pb-24 bg-bg-main">
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.15] mix-blend-multiply pointer-events-none" />
      <div className="container mx-auto px-6 max-w-7xl relative">
        <header className="max-w-3xl mb-14">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-secondary mb-4">Qura Insure Blog</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-[-.05em] text-primary leading-[1.02] mb-6 text-balance">
            Insurance, <span className="font-editorial text-secondary">explained</span> simply.
          </h1>
          <p className="text-lg md:text-xl text-text-muted font-medium leading-relaxed">{DESCRIPTION}</p>
        </header>

        {articles.length === 0 ? (
          <div className="section-shell p-10 md:p-14 text-center max-w-2xl">
            <h2 className="text-2xl font-bold text-primary mb-3">No articles yet</h2>
            <p className="text-text-muted">We&apos;re working on our first guides. Check back soon.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {visible.map((article, i) => {
              const href = articlePath(article.slug);
              const date = formatDate(article.publishedAt);
              return (
                <li key={article.id}>
                  <article className="group relative h-full flex flex-col rounded-[1.75rem] border border-border-subtle bg-white/80 shadow-[0_24px_70px_rgba(11,36,66,.07)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(11,36,66,.12)] focus-within:ring-2 focus-within:ring-accent">
                    <div className="aspect-[16/9] bg-surface-sage overflow-hidden">
                      {article.featuredImageUrl && (
                        <BlogImage
                          src={article.featuredImageUrl}
                          alt={article.featuredImageAlt ?? ""}
                          priority={page === 1 && i < 3}
                          className="transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-6 md:p-7">
                      {date && (
                        <time dateTime={article.publishedAt!} className="text-xs font-bold uppercase tracking-[.14em] text-secondary mb-3">
                          {date}
                        </time>
                      )}
                      <h2 className="text-xl font-bold text-primary leading-snug mb-3">
                        <Link href={href} className="after:absolute after:inset-0 focus:outline-none">
                          {article.title}
                        </Link>
                      </h2>
                      {article.excerpt && <p className="text-text-muted leading-relaxed mb-6 line-clamp-3">{article.excerpt}</p>}
                      <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary" aria-hidden="true">
                        Read article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        {totalPages > 1 && (
          <nav aria-label="Blog pages" className="flex items-center justify-center gap-4 mt-14">
            {page > 1 ? (
              <Link href={page === 2 ? BLOG_INDEX_PATH : `${BLOG_INDEX_PATH}?page=${page - 1}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border-subtle bg-white text-sm font-semibold text-primary hover:bg-surface-sage transition-colors">
                <ArrowLeft size={16} /> Newer
              </Link>
            ) : <span />}
            <span className="text-sm text-text-muted">Page {page} of {totalPages}</span>
            {page < totalPages ? (
              <Link href={`${BLOG_INDEX_PATH}?page=${page + 1}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:bg-dark transition-colors">
                Older <ArrowRight size={16} />
              </Link>
            ) : <span />}
          </nav>
        )}
      </div>
    </section>
  );
}
