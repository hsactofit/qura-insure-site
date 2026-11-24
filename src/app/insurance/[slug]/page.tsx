import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Ambulance, ArrowRight, Briefcase, Building2, Calculator, Car, Check, ChevronDown, HeartPulse, House, LockKeyhole, Plane, ShieldCheck, X } from "lucide-react";
import QuraCornerBrackets from "@/components/Common/QuraCornerBrackets";
import { INSURANCE_PRODUCTS, getInsuranceProduct } from "@/data/insurance";

const ICONS = { ShieldCheck, HeartPulse, Building2, Car, House, Plane, Briefcase, LockKeyhole, Ambulance };

export const dynamicParams = false;

export function generateStaticParams() {
  return INSURANCE_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insurance/[slug]">): Promise<Metadata> {
  const product = getInsuranceProduct((await params).slug);
  if (!product) return {};
  const title = `${product.name} | Qura Insure`;
  return {
    title: { absolute: title },
    description: product.metaDescription,
    alternates: { canonical: `/insurance/${product.slug}` },
    openGraph: { type: "website", url: `/insurance/${product.slug}`, title, description: product.metaDescription },
  };
}

export default async function InsuranceProductPage({ params }: PageProps<"/insurance/[slug]">) {
  const product = getInsuranceProduct((await params).slug);
  if (!product) notFound();
  const others = INSURANCE_PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <div className="bg-bg-main text-primary">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.04] tracking-[-.045em]">
              {product.headline} <span className="font-brand-emphasis text-secondary">{product.headlineEmphasis}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">{product.intro}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/#contact" className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-dark">
                Talk to an advisor <ArrowRight size={19} className="transition group-hover:translate-x-1" />
              </Link>
              {product.sizing.toolCta && (
                <Link href="/tools/coverage-check" className="inline-flex items-center gap-2 rounded-full bg-cta px-7 py-4 font-bold text-primary transition hover:-translate-y-1 hover:bg-cta-hover">
                  <Calculator size={18} /> Check your coverage
                </Link>
              )}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_34px_90px_rgba(17,37,65,.18)]">
            <Image src={product.image.src} alt={product.image.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            <QuraCornerBrackets color="lime" size="md" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-14 text-white md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
          {product.stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-cta pl-5">
              <div className="text-4xl font-semibold tracking-[-.04em] text-cta md:text-5xl">{stat.value}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{stat.label}</p>
              <p className="mt-2 text-xs text-white/50">Source: {stat.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Covered / not covered */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading eyebrow="What's included" title="What your policy covers" />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {product.covered.map((item) => (
                <div key={item.title} className="rounded-3xl border border-primary/10 bg-white p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-sage"><Check size={18} /></span>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-text-muted">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-primary/10 bg-white p-7">
              <h3 className="text-lg font-semibold">Watch out for</h3>
              <ul className="mt-5 space-y-4">
                {product.notCovered.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-text-muted">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary"><X size={12} /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sizing */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-white md:p-14">
            <QuraCornerBrackets color="lime" size="lg" />
            <div className="relative grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
              <div>
                <span className="text-sm font-bold uppercase tracking-[.2em] text-cta">{product.slug === "corporate" || product.slug === "business" ? "Our process" : "Sizing your cover"}</span>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.03em] md:text-5xl">{product.sizing.title}</h2>
                {product.sizing.toolCta && (
                  <Link href="/tools/coverage-check" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-cta px-7 py-4 font-bold text-primary transition hover:-translate-y-1 hover:bg-cta-hover">
                    Use the coverage calculator <ArrowRight size={19} className="transition group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
              <ol className="space-y-5">
                {product.sizing.points.map((point, i) => (
                  <li key={point} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-cta">{String(i + 1).padStart(2, "0")}</span>
                    <p className="pt-1.5 leading-relaxed text-white/85">{point}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Key terms */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading eyebrow="Know the fine print" title="Key terms, in plain English" />
          <dl className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {product.keyTerms.map((item) => (
              <div key={item.term} className="border-t border-primary/10 pt-5">
                <dt className="font-semibold">{item.term}</dt>
                <dd className="mt-2 leading-relaxed text-text-muted">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Add-ons + tax */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={product.slug === "corporate" || product.slug === "business" ? "Enhancements" : product.slug === "term-life" ? "Riders & add-ons" : "Add-ons"} title="Strengthen your cover" />
            <div className="mt-10 space-y-4">
              {product.addOns.map((item) => (
                <div key={item.title} className="rounded-2xl border border-primary/10 bg-white p-5">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Tax & GST" title="Tax benefits" />
            <div className="mt-10 space-y-4">
              {product.tax.map((item) => (
                <div key={item.title} className="rounded-2xl bg-surface-sage p-5">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-text-muted">{item.text}</p>
                </div>
              ))}
              <p className="text-sm leading-relaxed text-text-muted">
                {product.slug === "term-life" || product.slug === "health" ? "Deductions under Sections 80C and 80D apply only under the old tax regime. " : ""}Tax rules change, so please confirm with a tax adviser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading eyebrow="Before you buy" title="Our checklist" />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {product.checklist.map((item) => (
              <li key={item} className="flex gap-4 rounded-2xl border border-primary/10 p-5 leading-relaxed">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cta"><Check size={15} /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading eyebrow="Questions" title="Frequently asked" />
          <div className="space-y-3">
            {product.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-primary/10 bg-white p-5 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 leading-relaxed text-text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Explore + CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            {others.map((p) => {
              const OtherIcon = ICONS[p.icon];
              return (
                <Link key={p.slug} href={`/insurance/${p.slug}`} className="group flex items-center gap-5 rounded-3xl border border-primary/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface-sage group-hover:bg-cta"><OtherIcon size={22} /></span>
                  <span className="flex-1">
                    <span className="block text-xs font-bold uppercase tracking-[.18em] text-text-muted">{p.eyebrow}</span>
                    <span className="mt-1 block text-lg font-semibold">{p.name}</span>
                  </span>
                  <ArrowRight size={20} className="transition group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>

          <div className="mt-10 rounded-[2rem] bg-surface-sage p-8 md:p-12">
            <h2 className="text-3xl font-semibold tracking-[-.03em] md:text-4xl">Not sure what fits? <span className="font-brand-emphasis">Ask us.</span></h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-text-muted">A Qura advisor will explain your options, the trade-offs and the fine print, with no spam and no pressure.</p>
            <Link href="/#contact" className="group mt-7 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-dark">
              Talk to a Qura expert <ArrowRight size={19} className="transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 text-sm leading-relaxed text-text-muted">
            <p className="font-semibold text-primary">Sources</p>
            <ul className="mt-2 space-y-1">
              {product.sources.map((s) => (
                <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">{s.name}</a></li>
              ))}
            </ul>
            <p className="mt-4">This page is general information, not advice. Cover, exclusions and terms depend on the insurer and the policy wording. Read the policy documents before you buy.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <span className="text-sm font-bold uppercase tracking-[.2em] text-secondary">{eyebrow}</span>
      <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.03em] md:text-5xl">{title}</h2>
    </div>
  );
}
