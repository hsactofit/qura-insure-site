import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StaticPage from "@/components/Legal/StaticPage";
import { ORGANIZATION_ID, SERVICE_PAGES, SITE_URL, STATIC_PAGES_LAST_MODIFIED } from "@/data/site";
import type { ServiceContent } from "@/data/services";

export default function ServicePage({ service }: { service: ServiceContent }) {
  const url = `${SITE_URL}${service.path}`;
  const jsonLd = [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.name,
      serviceType: service.serviceType,
      description: service.definition,
      url,
      provider: { "@id": ORGANIZATION_ID },
      areaServed: { "@type": "Country", name: "India" },
      audience: { "@type": "Audience", geographicArea: { "@type": "Country", name: "India" } },
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];
  const related = SERVICE_PAGES.filter((s) => s.path !== service.path);

  return (
    <StaticPage
      path={service.path}
      eyebrow="Insurance advisory"
      title={service.h1}
      breadcrumbName={service.name}
      updated={STATIC_PAGES_LAST_MODIFIED}
      extraJsonLd={jsonLd}
      after={
        <div className="mt-12 rounded-[1.75rem] bg-primary p-8 text-white">
          <p className="text-2xl font-semibold">Talk to a Qura Insure advisor</p>
          <p className="mt-2 text-white/75 text-base">Free, no-obligation advice. You pay the same premium as buying directly from the insurer.</p>
          <Link href="/#contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 font-bold text-primary">
            Get a curated recommendation <ArrowRight size={18} />
          </Link>
        </div>
      }
    >
      <h2>What is {service.name.toLowerCase()}?</h2>
      <p>{service.definition}</p>

      {service.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
          {section.bullets && (
            <ul>
              {section.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          )}
        </section>
      ))}

      <h2>How Qura Insure advises you</h2>
      <ol>
        {service.process.map((step) => (
          <li key={step.title}><strong>{step.title}:</strong> {step.description}</li>
        ))}
      </ol>

      <h2>Frequently asked questions</h2>
      {service.faqs.map((faq) => (
        <section key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </section>
      ))}

      <h2>Related</h2>
      <ul>
        {related.map((s) => <li key={s.path}><Link href={s.path}>{s.name}</Link></li>)}
        <li><Link href="/blog">Insurance guides on the Qura Insure blog</Link></li>
      </ul>
    </StaticPage>
  );
}
