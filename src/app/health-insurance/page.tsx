import type { Metadata } from "next";
import { OG_IMAGE } from "@/data/site";
import ServicePage from "@/components/Service/ServicePage";
import { findService } from "@/data/services";

const service = findService("/health-insurance");

export const metadata: Metadata = {
  title: service.title,
  description: service.metaDescription,
  alternates: { canonical: service.path },
  openGraph: { url: service.path, title: `${service.title} | Qura Insure`, description: service.metaDescription, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: `${service.title} | Qura Insure`, description: service.metaDescription, images: ["/og.png"] },
};

export default function Page() {
  return <ServicePage service={service} />;
}
