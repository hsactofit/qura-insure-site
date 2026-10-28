"use client";

import Link from "next/link";

export default function BlogError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="pt-32 md:pt-40 pb-24 bg-bg-main">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="section-shell p-10 md:p-14 text-center">
          <h1 className="text-3xl font-extrabold text-primary mb-4">Our blog is taking a short break</h1>
          <p className="text-text-muted mb-8">We couldn&apos;t load our articles just now. Please try again in a minute.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className="px-6 py-3 bg-primary text-white hover:bg-dark text-sm font-semibold rounded-full transition-colors">
              Try again
            </button>
            <Link href="/" className="px-6 py-3 bg-accent text-primary hover:bg-accent-hover text-sm font-semibold rounded-full transition-colors">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
