import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <section className="pt-32 md:pt-40 pb-24 bg-bg-main">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="section-shell p-10 md:p-14 text-center">
          <h1 className="text-3xl font-extrabold text-primary mb-4">Article not found</h1>
          <p className="text-text-muted mb-8">This article may have been moved or removed.</p>
          <Link href="/blog" className="inline-block px-6 py-3 bg-primary text-white hover:bg-dark text-sm font-semibold rounded-full transition-colors">
            Browse all articles
          </Link>
        </div>
      </div>
    </section>
  );
}
