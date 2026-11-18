/**
 * Single source of truth for business identity, contact and compliance details.
 * The footer, legal pages and JSON-LD all read from here.
 *
 * Fields set to null/empty are not rendered anywhere (footer, schema) until
 * they are filled from official records, so nothing unverified is published.
 */
import { IRDAI_REGISTRATION, isRegistrationComplete } from "@/data/content";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://qurainsure.com").replace(/\/+$/, "");
export const SITE_NAME = "Qura Insure";
export const SITE_SLOGAN = "Confidence, Curated.";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_URL = `${SITE_URL}/logos/Colour%20Primary%20Logo.svg`;

/** Date the homepage content was last materially changed (YYYY-MM-DD). Update when editing homepage copy. */
export const HOMEPAGE_LAST_MODIFIED = "2026-11-18";
/** Date the static pages (services, legal, team) were last materially changed. */
export const STATIC_PAGES_LAST_MODIFIED = "2026-11-18";

/** Default social preview image (1680x945, public/og.png). Repeat it in page-level openGraph/twitter overrides, which replace the layout's. */
export const OG_IMAGE = { url: "/og.png", width: 1680, height: 945, alt: "QURA INSURE — Confidence, Curated." };

export type PostalAddress = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: "IN";
};

export const BUSINESS: {
  /** Registered legal entity name as on the IRDAI certificate / MCA records. */
  legalName: string | null;
  address: PostalAddress | null;
  /** E.164 format, e.g. +91XXXXXXXXXX */
  telephone: string | null;
  email: string | null;
  grievanceOfficer: { name: string; email: string; telephone: string | null } | null;
  /** Only profiles that really exist (LinkedIn company page, etc.). */
  sameAs: string[];
} = {
  legalName: null,
  address: null,
  telephone: null,
  email: null,
  grievanceOfficer: null,
  sameAs: [],
};

export const formatAddress = (a: PostalAddress) =>
  `${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}, India`;

export const irdaiRegistration = () => (isRegistrationComplete() ? IRDAI_REGISTRATION : null);

export const SERVICE_PAGES = [
  { path: "/term-life-insurance", name: "Term Life Insurance" },
  { path: "/health-insurance", name: "Health Insurance" },
  { path: "/corporate-insurance", name: "Corporate Insurance" },
] as const;

export const LEGAL_PAGES = [
  { path: "/privacy-policy", name: "Privacy Policy" },
  { path: "/terms", name: "Terms of Use" },
  { path: "/disclaimer", name: "Disclaimer" },
] as const;

/** Serialises JSON-LD for safe embedding inside a <script> tag. */
export const jsonLdString = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");

/** Organization/InsuranceAgency node; optional fields only appear once filled in BUSINESS / IRDAI_REGISTRATION. */
export function organizationNode() {
  const reg = irdaiRegistration();
  const contactPoint = [
    BUSINESS.telephone || BUSINESS.email
      ? {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: BUSINESS.telephone ?? undefined,
          email: BUSINESS.email ?? undefined,
          areaServed: "IN",
        }
      : null,
    BUSINESS.grievanceOfficer
      ? {
          "@type": "ContactPoint",
          contactType: "grievance redressal",
          name: BUSINESS.grievanceOfficer.name,
          email: BUSINESS.grievanceOfficer.email,
          telephone: BUSINESS.grievanceOfficer.telephone ?? undefined,
          areaServed: "IN",
        }
      : null,
  ].filter(Boolean);
  return {
    "@type": ["InsuranceAgency", "Organization"],
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: BUSINESS.legalName ?? undefined,
    url: `${SITE_URL}/`,
    slogan: SITE_SLOGAN,
    logo: { "@type": "ImageObject", "@id": `${SITE_URL}/#logo`, url: LOGO_URL, caption: SITE_NAME },
    image: `${SITE_URL}/og.png`,
    description:
      "Qura Insure is an Indian insurance advisory that helps families and businesses compare and buy term life, health and corporate group insurance, with claims assistance after purchase.",
    identifier: reg
      ? { "@type": "PropertyValue", propertyID: "IRDAI Registration Number", value: reg.registrationNumber }
      : undefined,
    address: BUSINESS.address ? { "@type": "PostalAddress", ...BUSINESS.address } : undefined,
    telephone: BUSINESS.telephone ?? undefined,
    email: BUSINESS.email ?? undefined,
    contactPoint: contactPoint.length ? contactPoint : undefined,
    founder: { "@type": "Person", "@id": `${SITE_URL}/team/devendra-ghodnadikar#person`, name: "Devendra Ghodnadikar" },
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: ["Term life insurance", "Health insurance", "Group health insurance", "Insurance claims"],
    sameAs: BUSINESS.sameAs.length ? BUSINESS.sameAs : undefined,
  };
}

export function breadcrumbNode(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
