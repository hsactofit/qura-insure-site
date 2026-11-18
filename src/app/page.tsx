import type { Metadata } from "next";
import QuraLanding from "@/components/QuraLanding/QuraLanding";
import { FAQS } from "@/data/content";
import { ORGANIZATION_ID, SERVICE_PAGES, SITE_NAME, SITE_URL, WEBSITE_ID, jsonLdString, organizationNode, OG_IMAGE } from "@/data/site";

const TITLE = "Term Life & Health Insurance Advisors in India | Qura Insure";
const DESCRIPTION =
  "Compare term life, health and corporate insurance with Qura Insure's IRDAI-certified advisors. No advisory fee, same premium as buying direct, and claims support.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.png"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...organizationNode(),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Insurance advisory services",
        itemListElement: SERVICE_PAGES.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", "@id": `${SITE_URL}${service.path}#service`, name: service.name, url: `${SITE_URL}${service.path}` },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "en-IN",
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      inLanguage: "en-IN",
    },
    {
      // Mirrors the visible, server-rendered FAQ on the page.
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <QuraLanding />
    </>
  );
}
