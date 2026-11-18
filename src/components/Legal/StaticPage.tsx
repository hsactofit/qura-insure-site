import Link from "next/link";
import { breadcrumbNode, jsonLdString, ORGANIZATION_ID, SITE_URL, WEBSITE_ID } from "@/data/site";

/** Server-rendered shell for static content pages (legal, services, team). */
export default function StaticPage({
  path,
  eyebrow,
  title,
  breadcrumbName = title,
  intro,
  updated,
  extraJsonLd = [],
  children,
  after,
}: {
  path: string;
  eyebrow: string;
  title: string;
  /** Short name for the breadcrumb trail; defaults to the title. */
  breadcrumbName?: string;
  intro?: string;
  /** ISO date (YYYY-MM-DD) shown as "Last updated". */
  updated?: string;
  extraJsonLd?: Record<string, unknown>[];
  children: React.ReactNode;
  /** Rendered after the prose body, outside the prose styles. */
  after?: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${path}#webpage`,
        url: `${SITE_URL}${path}`,
        name: title,
        description: intro,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        dateModified: updated,
        inLanguage: "en-IN",
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: breadcrumbName, path },
      ]),
      ...extraJsonLd,
    ],
  };
  const updatedLabel = updated
    ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(updated))
    : null;

  return (
    <article className="relative pt-32 md:pt-40 pb-24 bg-bg-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <div className="container mx-auto px-6 max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-primary">{breadcrumbName}</li>
          </ol>
        </nav>
        <header className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-secondary mb-4">{eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-.04em] text-primary leading-[1.08] mb-6 text-balance">{title}</h1>
          {intro && <p className="text-lg md:text-xl text-text-muted font-medium leading-relaxed">{intro}</p>}
          {updatedLabel && <p className="mt-4 text-sm text-text-muted">Last updated: <time dateTime={updated}>{updatedLabel}</time></p>}
        </header>
        <div className="rm-prose">{children}</div>
        {after}
      </div>
    </article>
  );
}
